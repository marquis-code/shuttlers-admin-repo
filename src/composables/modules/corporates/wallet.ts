import moment from 'moment'
import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import {
  useCorporateIdDetails,
  useCorporateWalletDetails
} from '@/composables/modules/corporates/id'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
import { useAlert } from '@/composables/core/notification'
import { usePagination } from '@/composables/utils/table'
import { useCompaniesModal } from '@/composables/core/modals'
import { insertScriptTag } from '@/composables/utils/system'
import { useDownloadReport, exportAsCsv } from '@/composables/utils/csv'

const { loading: downloading, download } = useDownloadReport()
const walletActivationForm = {
  bvn: ref(''),
  provider: ref('')
}
const wallets = ref([])
const ledgerAccountId = ref()
const walletIndex = ref(0)
const currentWallet = computed(() => {
  if (wallets.value.length) return wallets.value[walletIndex.value]
})

export const useCorporateWallet = () => {
  const loading = ref(false)
  const id = useRoute().params.id
  const getCorporateWalletInfo = async () => {
    const { selectedCorporate, loading, getCorporateById } = useCorporateIdDetails()
    loading.value = true
    const res = (await corporates_api.$_get_corporate_wallet_info(
      Number(id)
    )) as CustomAxiosResponse
    if (res.type !== 'ERROR') {
      wallets.value = res.data.data ?? []
    }
    loading.value = false
  }

  return {
    getCorporateWalletInfo,
    loading,
    wallets,
    ledgerAccountId,
    walletIndex,
    currentWallet
  }
}

const loadingWalletHistory = ref(false)
const coprorateWalletHistory = ref([])
export const useCorporateWalletHistory = () => {
  const { moveTo, metaObject, next, prev, setFunction } = usePagination()
  const staff_ids = ref([]) as Ref<number[]>
  const filterData = {
    'filters[type]': ref('') as any,
    'filters[user_ids]': computed(() => staff_ids.value.length ? staff_ids.value : ''),
    'filters[start_date]': ref('') as any,
    'filters[end_date]': ref('') as any
  }
  const getCorporateWalletHistory = async () => {
    const { selectedCorporate } = useCorporateIdDetails()
    loadingWalletHistory.value = true
    if (!selectedCorporate.value?.wallet?.id) {
      const companyId = useRoute().params.id as string
      const resp = await corporates_api.$_get_corporate_by_id(companyId) as CustomAxiosResponse
      if (resp.type !== 'ERROR') {
        selectedCorporate.value = resp.data
      }
    }
    const res =
      (await corporates_api.$_get_corporate_wallet_transaction_history(
        Number(selectedCorporate.value?.wallet?.id),
        metaObject,
        filterData
      )) as CustomAxiosResponse
    if (res.type !== 'ERROR') {
      coprorateWalletHistory.value = res?.data?.data
      metaObject.total.value = res?.data?.metadata.total_pages
    }
    loadingWalletHistory.value = false
  }

  setFunction(getCorporateWalletHistory)

  watch(
    [
      filterData['filters[type]'],
      filterData['filters[user_ids]'],
      filterData['filters[start_date]'],
      filterData['filters[end_date]']
    ],
    (val) => {
      getCorporateWalletHistory()
    }
  )

  const getAmountFigure = (amount: string) => {
    const newStr = amount.substring(4)
    const x = newStr.replace(/,/g, '')
    return Number(x) || 0
  }

  const downloadWalletHistory = async () => {
    const { selectedCorporate } = useCorporateIdDetails()
    downloading.value = true
    const name = ref(`${selectedCorporate.value?.corporate_name}-all-${filterData['filters[type]'].value}-wallet-transaction`)
    const res = await corporates_api.$_download_corporate_wallet_transaction_history(Number(selectedCorporate.value?.wallet?.id), filterData) as CustomAxiosResponse
    if (res && res?.type !== 'ERROR') {
    const datas = res.data.data
    const newArr:any[] = []
    for (let i = 0; i < datas.length; i++) {
      const data = datas[i]
      const y = {
        Date: moment(data?.created_at).format('lll'),
        Description: data?.description || 'N/A',
        Type: data?.direction || 'N/A',
        Currency: 'NGN',
        Amount: getAmountFigure(data?.amount_formatted) || 0,
        Balance_before: getAmountFigure(data?.available_balance_before_formatted) || 0,
        Status: data.status === 'posted' ? 'Successful' : data?.status
      }
      newArr.push(y)
    }
    if (filterData['filters[start_date]'].value && filterData['filters[end_date]'].value) name.value = `${name.value}-from-${filterData['filters[start_date]'].value}-to-${filterData['filters[end_date]'].value}`
    // exportAsCsv(newArr, name.value)
    download(newArr, name.value)
      }
      downloading.value = false
  }

  const onFilterUpdate = (data: any) => {
    switch (data.type) {
      case 'dateRange':
        filterData['filters[start_date]'].value = data.value[0] ? data.value[0] : ''
        filterData['filters[end_date]'].value = data.value[1] ? data.value[1] : ''
        break
    }
  }

  return {
    getCorporateWalletHistory,
    loadingWalletHistory,
    coprorateWalletHistory,
    next,
    prev,
    moveTo,
    onFilterUpdate,
    filterData,
    ...metaObject,
    staff_ids,
    downloadWalletHistory
  }
}

export const useCorporateWalletActivation = () => {
  const loading = ref(false)
  const activateCorporateWallet = async () => {
    const { selectedCorporate } = useCorporateIdDetails()
    loading.value = true
    const res = (await corporates_api.$_activate_corporate_wallet(
      Number(selectedCorporate.value?.wallet.id),
      convertObjWithRefToObj(walletActivationForm)
    )) as CustomAxiosResponse
    if (res.type !== 'ERROR') {
      useAlert().openAlert({
        type: 'SUCCESS',
        msg: 'Wallet has been successfully activated'
      })
    }
    loading.value = false
  }

  const populateWalletActivationForm = (data) => {
    walletActivationForm.bvn.value = data.bvn
    walletActivationForm.provider.value = data.provider
  }

  return { populateWalletActivationForm, activateCorporateWallet, loading }
}

export const useFlutterWave = () => {
  const { selectedCorporate } = useCorporateIdDetails()
  insertScriptTag('https://checkout.flutterwave.com/v3.js')
  const amount = ref('')
  const desc = ref('')
  const loading = ref(false)
  const makePayment = async () => {
    loading.value = true
    const company = selectedCorporate.value
    const payload = {
      provider: 'flutterwave',
      reference: `shuttlers_${new Date().getTime()}`
    }
    const res = (await corporates_api.$_payment_funding_reference(
      Number(selectedCorporate.value?.wallet.ledger_account_id),
      payload
    )) as CustomAxiosResponse
    if (res.type !== 'ERROR' && res.data.reference) {
      loading.value = false
      // @ts-ignore
      const flutterModal = window.FlutterwaveCheckout({
        amount: Number(amount.value),
        callback: () => {
          flutterModal.close()
          useAlert().openAlert({
            type: 'SUCCESS',
            msg: 'Payment is successful'
          })
          useCompaniesModal().closeFundWallet()
          useCorporateWalletHistory().getCorporateWalletHistory()
          useCorporateWalletDetails().getCorporateWalletObject(selectedCorporate.value?.wallet?.id)
        },
        country: 'NG',
        currency: 'NGN',
        customer: {
          email: company.email,
          phone_number: company.corporate_phone,
          name: `${company.fname} ${company.lname}`
        },
        customizations: {
          title: company.corporate_name,
          description: desc.value,
          logo: company.avatar ? company.avatar : ''
        },
        meta: {
          ledger_account_reference:
            selectedCorporate.value?.wallet.ledger_account_id
        },
        onclose(): void {
          useAlert().openAlert({
            type: 'SUCCESS',
            msg: 'Payment has been cancelled.'
          })
          useCompaniesModal().closeFundWallet()
        },
        payment_options: 'card, banktransfer, ussd',
        public_key: import.meta.env.VITE_FLW_PUBLIC_KEY,
        // redirect_url: `${process.env.VITE_FLW_PUBLIC_KEY}${company.id}/active/wallet`,
        tx_ref: res.data.reference
      })
    } else {
      useAlert().openAlert({ type: 'Alert', msg: 'An error occured' })
    }
  }

  return { makePayment, amount, desc, loading }
}

const corporateOverDraftUpdateForm = {
  supports_over_draw: ref(),
  max_over_draw_value: ref()
}

export const useCorporateOverdreftUpdate = () => {
  const updating = ref(false)
  const updateCorporateWalletOverdraft = async () => {
    const { selectedCorporate } = useCorporateIdDetails()
    updating.value = true
    const res = (await corporates_api.$_update_corporate_overdraft(
      Number(selectedCorporate.value.wallet.id),
      convertObjWithRefToObj(corporateOverDraftUpdateForm)
    )) as CustomAxiosResponse
    if (res.type !== 'ERROR') {
      useAlert().openAlert({
        type: 'SUCCESS',
        msg: 'Wallet Overdraft was successfully updated'
      })
    }
    updating.value = false
  }

  const populateOverdraftForm = (data: any) => {
    corporateOverDraftUpdateForm.max_over_draw_value.value =
      data.max_over_draw_value
    corporateOverDraftUpdateForm.supports_over_draw.value =
      data.supports_over_draw
  }

  return {
    updateCorporateWalletOverdraft,
    updating,
    populateOverdraftForm
  }
}
