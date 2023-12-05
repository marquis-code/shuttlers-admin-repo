import { useFlutterwave } from 'flutterwave-vue3'
import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useCorporateIdDetails } from '@/composables/modules/corporates/id'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
import { useAlert } from '@/composables/core/notification'
import { usePagination } from '@/composables/utils/table'
const { selectedCorporate, loading, getCorporateById } = useCorporateIdDetails()

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
	const getCorporateWalletInfo = async () => {
    loading.value = true
        const res = (await corporates_api.$_get_corporate_wallet_info(Number(selectedCorporate.value.id))) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            wallets.value = res.data.data ?? []
        }
        loading.value = false
    }

    return {
 getCorporateWalletInfo, loading, wallets, ledgerAccountId,
      walletIndex,
      currentWallet
}
}

export const useCorporateWalletHistory = () => {
  const { moveTo, metaObject, next, prev, setFunction } = usePagination()
  const loading = ref(false)
  const coprorateWalletHistory = ref([])
	const getCorporateWalletHistory = async () => {
        const res = (await corporates_api.$_get_corporate_wallet_transaction_history(Number(selectedCorporate.value?.wallet?.id), metaObject)) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            coprorateWalletHistory.value = res?.data?.data
            metaObject.total.value = res?.data?.total_pages
        }
        loading.value = false
    }

    return { getCorporateWalletHistory, loading, coprorateWalletHistory, next, prev, moveTo, ...metaObject }
}

export const useCorporateWalletActivation = () => {
  const loading = ref(false)
	const activateCorporateWallet = async () => {
    loading.value = true
        const res = (await corporates_api.$_activate_corporate_wallet(Number(selectedCorporate.value?.wallet.id), convertObjWithRefToObj(walletActivationForm))) as CustomAxiosResponse
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
    const res = (await corporates_api.$_payment_funding_reference(Number(selectedCorporate.value?.wallet.ledger_account_id), payload)) as CustomAxiosResponse
    if (res.type !== 'ERROR' && res.data.reference) {
      loading.value = false
      useFlutterwave({
        amount: Number(amount.value),
        callback(data: any): void {
          //  TODO: handle callbacks
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

        },
        payment_options: 'card, banktransfer, ussd',
        public_key: import.meta.env.VUE_APP_FLW_PUBLIC_KEY,
        redirect_url: `${process.env.VUE_APP_FLW_REDIRECT_URL}${company.id}/active/wallet`,
        tx_ref: res.data.reference
      })
      // window.FlutterwaveCheckout({
      //   public_key: import.meta.env.VUE_APP_FLW_PUBLIC_KEY,
      //   tx_ref: res.data.reference,
      //   amount: Number(amount.value),
      //   currency: 'NGN',
      //   payment_options: 'card, banktransfer, ussd',
      //   redirect_url: `${process.env.VUE_APP_FLW_REDIRECT_URL}${company.id}/active/wallet`,
      //   meta: {
      //     ledger_account_reference:
      //     selectedCorporate.value?.wallet.ledger_account_id
      //   },
      //   customer: {
      //     email: company.email,
      //     phone_number: company.corporate_phone,
      //     name: `${company.fname} ${company.lname}`
      //   },
      //   customizations: {
      //     title: company.corporate_name,
      //     description: desc.value,
      //     logo: company.avatar ? company.avatar : ''
      //   }
      // })
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
    updating.value = true
        const res = (await corporates_api.$_update_corporate_overdraft(Number(selectedCorporate.value.wallet.id), convertObjWithRefToObj(corporateOverDraftUpdateForm))) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
          useAlert().openAlert({
            type: 'SUCCESS',
            msg: 'Wallet Overdraf was successfully updated'
          })
        }
        updating.value = false
    }

    const populateOverdraftForm = (data: any) => {
      corporateOverDraftUpdateForm.max_over_draw_value.value = data.max_over_draw_value
      corporateOverDraftUpdateForm.supports_over_draw.value = data.supports_over_draw
    }

    return {
      updateCorporateWalletOverdraft, updating, populateOverdraftForm
}
}
