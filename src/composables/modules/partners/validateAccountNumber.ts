// $_validate_account_number

import { partners_api, CustomAxiosResponse } from '@/api_factory/modules'
const loading = ref(false)
const accName = ref('')

export const useValidateAccountNumber = () => {
  const validateAccountNumber = async (bank_code, account_number) => {
    loading.value = true
    const res = (await partners_api.$_validate_account_number(bank_code, account_number)) as CustomAxiosResponse
    if (res.type !== 'ERROR') {
        accName.value = res?.data?.account_name
    }
    loading.value = false
  }

  return { validateAccountNumber, loading, accName }
}
