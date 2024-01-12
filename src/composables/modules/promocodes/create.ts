import { referrals_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'

export const useCreatePromoCode = () => {
  const loading = ref(false)
  const { $_create_referral_code } = referrals_api

  const createPromoCode = async (requestData) => {
    loading.value = true

    const res = (await $_create_referral_code(requestData)) as CustomAxiosResponse

    if (res.type !== 'ERROR') {
      useAlert().openAlert({
        type: 'SUCCESS',
        msg: 'Promo code was created successfully.'
      })
      useRouter().push('/promotion')
    }
    loading.value = false
  }

  return { createPromoCode, loading }
}
