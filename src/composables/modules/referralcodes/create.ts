import { referrals_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'

// const requestPayload = {
//   customer_benefit: {
//     reward_amount: null as any,
//     reward_kind: null as any,
//     customer_constraint: null as any
//   },
//   name: '' as any,
//   owners: [],
//   description: '' as any,
//   customer_constraint: 'none' as any,
//   owner_type: 'customer' as any,
//   owner_id: 1 as any,
//   ownerRewardKind: 'wallet_credit' as any,
//   ownerRewardAmount: 0 as any,
//   max_number_of_uses: 0 as any,
//   reward_amount: null as any,
//   reward_kind: 'wallet_credit' as any,
//   owner_reward_amount: null as any,
//   owner_reward_kind: '' as any,
//   should_owner_benefit: null as any,
//   notify_all: false as any,
//   owner_benefit: {
//     reward_amount: 0 as any,
//     reward_kind: 'none' as any
//   },
//   promo_code_prefix: '' as any
// }
// const owners = []
export const useCreateReferralCode = () => {
  const loading = ref(false)
  const { $_create_referral_code } = referrals_api

  const createReferralCode = async (payload) => {
    loading.value = true

    const res = (await $_create_referral_code(
      payload
    )) as CustomAxiosResponse

    if (res.type !== 'ERROR') {
      useAlert().openAlert({
        type: 'SUCCESS',
        msg: 'Referral code was created successfully.'
      })
      useRouter().push('/referral')
    }
    loading.value = false
  }

  // const setPayload = (data) => {
  //   requestPayload.customer_benefit.customer_constraint = data.customer_constraint
  //   requestPayload.customer_benefit.reward_kind = data.reward_kind
  //   requestPayload.customer_benefit.reward_amount = data.reward_amount
  //   requestPayload.name = data.name
  //   requestPayload.owners = data.owners
  //   requestPayload.description = data.description
  //   requestPayload.customer_constraint = data.customer_constraint
  //   requestPayload.owner_type = data.owner_type
  //   requestPayload.owner_id = data.owner_id
  //   requestPayload.ownerRewardKind = data.ownerRewardKind
  //   requestPayload.ownerRewardAmount = data.ownerRewardAmount
  //  requestPayload.max_number_of_uses = data.max_number_of_uses
  //   requestPayload.reward_amount = data.reward_amount
  //   requestPayload.reward_kind = data.reward_kind
  //   requestPayload.owner_reward_amount = data.owner_reward_amount
  //   requestPayload.owner_reward_kind = data.owner_reward_kind
  //   requestPayload.should_owner_benefit = data.should_owner_benefit
  //   requestPayload.notify_all = data.notify_all
  //   requestPayload.owner_benefit.reward_amount = data.reward_amount
  //   requestPayload.owner_benefit.reward_kind = data.reward_kind
  //   requestPayload.promo_code_prefix = data.promo_code_prefix
  // }

  return { createReferralCode, loading }
}
