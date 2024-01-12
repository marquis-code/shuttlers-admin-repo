<template>
	<form class="space-y-6" @submit.prevent="handleCreateReferralCode">
		<div class="">
			<label for="" class="">Name of Campaign</label>
			<input
				v-model.trim="newPromoCode.name"
				type="text"
				class="input-field"
				placeholder=""
			>
		</div>
		<div class="">
			<label for="" class="">Promo code prefix</label>
			<input
				v-model.trim="newPromoCode.promo_code_prefix"
				type="text"
				class="input-field"
				placeholder="Enter a custom prefix (optional)"
			>
		</div>
		<div class="">
			<label for="" class=""
			>Description of referral code Campaign</label
			>
			<textarea
				v-model.trim="newPromoCode.description"
				class="input-field resize-none"
				rows="2"
			/>
		</div>

		<div class="">
			<label for="" class=""
			>How many times should the Referral Code generated for this campaign be
				used?</label
			>
			<div>
				<div>
					<label for="" class=""
					><input
							id="selected_period"
							name="promo_code_usages"
							type="radio"
							:checked="newPromoCode.max_number_of_uses > 0"
						>
						<div class=" ml-2">
							<div class="flex items-center gap-x-2">
								<input
									v-model.number="newPromoCode.max_number_of_uses"
									type="number"
									min="0"
									class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900"
									placeholder="e.g 2"
								>
								<div class="">
									<span class="text-lg">times</span>
								</div>
							</div>
						</div>
					</label>
				</div>
				<div>
					<label for="promo_code_usages_unlimited" class=""
					><input
						id="promo_code_usages_unlimited"
						v-model.number="newPromoCode.max_number_of_uses"
						type="radio"
						name="promo_code_usages"
						value="0"
					>
						Unlimited
					</label>
				</div>
			</div>
		</div>

		<div class="">
			<label for="" class=""
			>How do you want to reward the customers that use this referral
				code?</label
			>
			<select
				v-model="newPromoCode.reward_kind"
				name="reward_kind"
				class="input-field"
			>
				<option v-for="(itm, idx) in customer_reward_plans" :key="idx" :value="itm.value">
					{{ itm.text }}
				</option>
			</select>
		</div>

		<div class="">
			<label for="" class="">{{ rewardAmountLabel }}</label>
			<div class="flex items-center">
				<div class="bg-gray-100 rounded-tl-md rounded-bl-md py-2.5 px-3">
					{{ rewardAmountLabelSymbol }}
				</div>
				<input
					v-model.number="newPromoCode.reward_amount"
					type="number"
					min="0"
					class="input-field"
					placeholder=""
				>
			</div>
		</div>

		<div class="">
			<label for="" class=""
			>Which customers can use this referral code?</label
			>
			<select
				v-model="newPromoCode.customer_constraint"
				name="reward_kind"
				class="input-field"
			>
				<option v-for="(itm, idx) in customers_using_referral_code" :key="idx" :value="itm.value">
					{{ itm.text }}
				</option>
			</select>
		</div>

		<div class="">
			<label for="" class=""
			>When should this referral code expire?</label
			>
			<div>
				<div>
					<label for="" class=""
					><input
							id="should_expire_yes"
							type="radio"
							value="1"
							:checked="newPromoCode.expires_at"
							name="should_expire"
						>
						<div class=" ml-2">
							<InputDateInput
								v-model="newPromoCode.expires_at"
								class="font-light"
								placeholder="Filter by date"
							/>
						</div>
					</label>
				</div>
				<div>
					<label for="should_expire_no" class=""
					><input
						id="should_expire_no"
						type="radio"
						name="should_expire"
						:checked="newPromoCode.expires_at == null"
						value="0"
						@click="newPromoCode.expires_at = null"
					>
						Never expires
					</label>
				</div>
			</div>
		</div>

		<div class="">
			<label for="" class=""
			>Do you want to reward the
				{{ newPromoCode?.owners?.length > 1 ? "owners" : "owner" }}
				of
				{{ newPromoCode?.owners?.length > 1 ? "these" : "this" }}
				referral
				{{ newPromoCode?.owners?.length > 1 ? "codes" : "code" }}
				when other customers use their Referral Code?</label
			>
			<div>
				<label for="should_owner_benefits_yes" class=""
				><input
					id="should_owner_benefits_yes"
					type="radio"
					name="should_owner_benefits"
					value="wallet_credit"
					:checked="newPromoCode?.owner_benefit?.reward_kind !== 'none'"
					@click="handleOptionClick"
				>
					Yes
				</label>
			</div>
			<div>
				<label for="should_owner_benefits_no" class=""
				><input
					id="should_owner_benefits_no"
					v-model="newPromoCode.owner_benefit.reward_kind"
					type="radio"
					name="should_owner_benefits"
					value="none"
				>
					No
				</label>
			</div>
		</div>

		<div
			v-if="newPromoCode.owner_benefit.reward_kind != 'none'"
			class="space-y-6"
		>
			<div class="">
				<label for="" class=""
				>How do you want to reward the referral code owner?</label
				>
				<select
					v-model="newPromoCode.owner_benefit.reward_kind"
					name="reward_kind"
					class="input-field"
				>
					<option v-for="(itm, idx) in referral_code_owner_reward" :key="idx" :value="itm.value">
						{{ itm.text }}
					</option>
				</select>
			</div>

			<div class="">
				<label for="" class="">{{ ownerRewardAmountLabel }}</label>
				<div class="flex items-center">
					<div class="bg-gray-100 py-3 px-3 rounded-rl-md rounded-bl-md">
						<span class="input-group-text">{{
							ownerRewardAmountLabelSymbol
						}}</span>
					</div>
					<input
						v-model.number="newPromoCode.owner_benefit.reward_amount"
						type="number"
						min="0"
						class="input-field"
						placeholder=""
					>
				</div>
			</div>
		</div>

		<div class="">
			<label for="" class=""
			>Which of the existing customer is this referral code for?</label
			>
			<div>
				<div class="">
					<label for="" class=" w-full">
						<input
							id="owner_type_customers"
							v-model="newPromoCode.owner_type"
							type="radio"
							value="customer"
							name="owner_type"
						>
						<div class="w-full">
							<UserMultiSelect label="" @update:model-value="handleSelectedUsers" />
						</div>
					</label>
				</div>
				<div>
					<label for="promo_code_owner_type" class=""
					><input
						id="owner_type_all"
						v-model="newPromoCode.owner_type"
						type="radio"
						name="owner_type"
						value="all"
					>
						Generate for all customers
					</label>
				</div>
			</div>
		</div>

		<div class="">
			<button
				type="submit"
				:disabled="sendingRequest"
				class="btn btn-lg btn-primary"
			>
				<span v-if="!loading" class="flex justify-center items-center gap-2.5">
					{{
						sendingRequest ? "Creating Referral Code.." : "Create Referral Code"
					}}
				</span>
				<Spinner v-else />
			</button>
		</div>
	</form>
</template>

<script setup lang="ts">
import { useAlert } from '@/composables/core/notification'
import { useCreateReferralCode } from '@/composables/modules/referralcodes/create'
const { createReferralCode, loading } = useCreateReferralCode()

const selectedOwner = ref({}) as any

const handleSelectedUsers = (val:any) => {
  if (Object.keys(val).length) {
    newPromoCode.value.owners.push(val)
  }
}

const customer_reward_plans = ref([
	{
		text: 'Credit Customer\'s Wallet',
		value: 'wallet_credit'
	},
	{
		text: 'Discount Customer\'s Trip by an Amount',
		value: 'flat_rate_discount_on_trips'
	},
	{
		text: 'Discount Customer\'s Trip by a Percentage',
		value: 'percentage_discount_on_trips'
	}
])

const customers_using_referral_code = ref([
	{
		text: 'none',
		value: 'wallet_credit'
	},
	{
		text: 'Only New Customers',
		value: 'new_customer'
	}
])

const referral_code_owner_reward = ref([
	{
		text: 'Credit Owner\'s Wallet',
		value: 'wallet_credit'
	},
	{
		text: 'Discount Owner\'s Trip by an Amount',
		value: 'flat_rate_discount_on_trips'
	},
	{
		text: 'Discount Owner\'s Trip by a Percentage',
		value: 'percentage_discount_on_trips'
	}
])

const shouldRewardOwners = ref(0)
const sendingRequest = ref(false)
const newPromoCode = ref({
  name: '',
  description: '',
  promo_code_prefix: '',
  customer_constraint: 'none',
  owner_type: 'customer',
  owner_id: 1,
  owners: [],
  ownerRewardKind: 'wallet_credit',
  ownerRewardAmount: 0,
  expires_at: null as any,
  max_number_of_uses: 0 as any,
  reward_amount: 0,
  reward_kind: 'wallet_credit',
  owner_reward_amount: 0,
  owner_reward_kind: '',
  should_owner_benefit: false,
  notify_all: false,
  owner_benefit: {
    reward_amount: 0,
    reward_kind: 'none'
  }
})
const customersList = ref([])

const ownerHasBenefit = computed(() => {
  return newPromoCode.value.owner_benefit.reward_kind !== 'none'
})

const handleOptionClick = () => {
	newPromoCode.value.owner_benefit.reward_kind = 'wallet_credit'
}

watch(ownerHasBenefit, (val) => {
  newPromoCode.value.should_owner_benefit = val
})

const rewardAmountLabelSymbol = computed(() => {
  if (
    newPromoCode.value.reward_kind === 'wallet_credit' ||
    newPromoCode.value.reward_kind === 'flat_rate_discount_on_trips'
  ) {
    return 'NGN'
  }

  if (newPromoCode.value.reward_kind === 'percentage_discount_on_trips') {
    return '%'
  }

  return 'NGN'
})

const rewardAmountLabel = computed(() => {
  if (newPromoCode.value.reward_kind === 'wallet_credit') {
    return 'How much do you want to reward customers?'
  }

  if (newPromoCode.value.reward_kind === 'flat_rate_discount_on_trips') {
    return 'How much do you want to remove from the trip?'
  }

  if (newPromoCode.value.reward_kind === 'percentage_discount_on_trips') {
    return 'What percentage discount do you want to give on the trip?'
  }

  return 'How much do you want to reward your customers with?'
})

const ownerRewardAmountLabelSymbol = computed(() => {
  if (
    newPromoCode.value.owner_benefit.reward_kind === 'wallet_credit' ||
    newPromoCode.value.owner_benefit.reward_kind ===
      'flat_rate_discount_on_trips'
  ) {
    return 'NGN'
  }

  if (
    newPromoCode.value.owner_benefit.reward_kind ===
    'percentage_discount_on_trips'
  ) {
    return '%'
  }

  return 'NGN'
})

watch(newPromoCode.value.owners, (val) => {
  newPromoCode.value.owner_type = 'customer'
})

const user_ids = ref([]) as any
const handleCreateReferralCode = () => {
  const payload = generateNewReferralCodePayload()
  createReferralCode(payload)
}

const generateNewReferralCodePayload = () => {
  const selectedUsers = newPromoCode.value.owners

  if (selectedUsers.length < 1 && newPromoCode.value.owner_type !== 'all') {
	useAlert().openAlert({ type: 'ERROR', msg: 'Please select at least one user' })
  }

  let user_ids = [] as Record<string, any>
  if (newPromoCode.value.owner_type !== 'all') {
    user_ids = selectedUsers.map((item) => {
      return { owner_type: 'customer', owner_id: item.id }
    })
  }
  const payload = Object.assign(
    {
      customer_benefit: {
        reward_amount: newPromoCode.value.reward_amount,
        reward_kind: newPromoCode.value.reward_kind,
        customer_constraint: 'none'
      }
    },
    newPromoCode.value,
    {
      owners: user_ids
    }
  )

  if (Object.keys(payload).includes('promo_code')) {
    delete (payload as any).promo_code
  }

  if (newPromoCode.value.owner_type === 'all') {
    delete (payload as any).owners
    payload.owner_type = 'all'
    payload.owner_id = 1
  }

  if (
    newPromoCode.value.customer_constraint &&
    newPromoCode.value.customer_constraint !== ''
  ) {
    payload.customer_benefit.customer_constraint =
      newPromoCode.value.customer_constraint
  }

  if (
    newPromoCode.value.owner_reward_kind &&
    newPromoCode.value.owner_reward_kind !== ''
  ) {
    payload.owner_benefit = {
      reward_amount: newPromoCode.value.owner_reward_amount,
      reward_kind: newPromoCode.value.owner_reward_kind
    }
  }

  if (payload.owner_benefit.reward_kind === 'none') {
    delete (payload as any).owner_benefit
  }

  if (
    Object.keys(payload).includes('expires_at') &&
    !payload.expires_at
  ) {
    delete payload.expires_at
  }

  return payload
}

const ownerRewardAmountLabel = computed(() => {
  if (newPromoCode?.value?.owner_benefit?.reward_kind === 'wallet_credit') {
    return 'How much do you want to reward owner?'
  }

  if (
    newPromoCode?.value?.owner_benefit?.reward_kind ===
    'flat_rate_discount_on_trips'
  ) {
    return 'How much do you want to remove from the owner\'s trip?'
  }

  if (
    newPromoCode?.value?.owner_benefit?.reward_kind ===
    'percentage_discount_on_trips'
  ) {
    return 'What percentage discount do you want to give on the owner\'s trip?'
  }

  return 'How much do you want to reward the owner with?'
})
</script>
