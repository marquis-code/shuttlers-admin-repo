import { partners_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { useGetPartnerAccount } from '@/composables/modules/partners/id'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
import { usePartnerModal } from '@/composables/core/modals'
const { getPartnerAccount } = useGetPartnerAccount()
const loading = ref(false)

const payload = {
  accountNumber: ref(''),
  accountName: ref(''),
  bankCode: ref(''),
  bankName: ref(''),
  partnerId: ref('')
}

export const useAddBankAccount = () => {
    const sid = useRoute().params.accountSid as string
  const addBankAccount = async () => {
    loading.value = true
    const res = (await partners_api.$_add_bank_account(
        convertObjWithRefToObj(payload)
    )) as CustomAxiosResponse

    if (res.type !== 'ERROR') {
      useAlert().openAlert({
        type: 'SUCCESS',
        msg: 'Account added successfully'
      })
      usePartnerModal().closeAddBankAccount()
      getPartnerAccount(sid)
    }
    loading.value = false
  }

  const setAccountCreationPayload = (data: any) => {
    payload.accountNumber.value = data.accountNumber
    payload.accountName.value = data.accountName
    payload.bankCode.value = data.bankCode
    payload.bankName.value = data.bankName
    payload.partnerId.value = data.partnerId
  }

  return { addBankAccount, loading, payload, setAccountCreationPayload }
}
