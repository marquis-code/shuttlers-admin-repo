<template>
	<div>
		<div class="container-fluid py-5">
			<div class="lg:w-6/12">
				<div class="">
					<div class="card">
						<div class="card-body">
							<h1 class="font-bold text-lg text-gray-900">
								New Referral Code
							</h1>

							<form
								class="space-y-6"
								@submit.prevent="handleCreateReferralCode"
							>
								<div class="form-group">
									<label for="" class="form-label">Name of Campaign</label>
									<input
										v-model.trim="newPromoCode.name"
										type="text"
										class="input-field"
										placeholder=""
									>
								</div>
								<div class="form-group">
									<label for="" class="form-label">Promo code prefix</label>
									<input
										v-model.trim="newPromoCode.promo_code_prefix"
										type="text"
										class="input-field"
										placeholder="Enter a custom prefix (optional)"
									>
								</div>
								<div class="form-group">
									<label for="" class="form-label"
									>Description of referral code Campaign</label
									>
									<textarea
										v-model.trim="newPromoCode.description"
										class="input-field resize-none"
										rows="2"
									/>
								</div>

								<div class="form-group">
									<label for="" class="form-label"
									>How many times should the Referral Code generated for this
										campaign be used?</label
									>
									<div>
										<div>
											<label for="" class="form-label"
											><input
													id="selected_period"
													name="promo_code_usages"
													type="radio"
													:checked="newPromoCode.max_number_of_uses > 0"
												>
												<div class="d-inline-block ml-2">
													<div class="flex items-center gap-x-2">
														<input
															v-model.number="newPromoCode.max_number_of_uses"
															type="number"
															min="0"
															class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900"
															placeholder="e.g 2"
														>
														<div class="input-group-append">
															<span class="text-lg">times</span>
														</div>
													</div>
												</div>
											</label>
										</div>
										<div>
											<label
												for="promo_code_usages_unlimited"
												class="form-label"
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

								<div class="form-group">
									<label for="" class="form-label"
									>How do you want to reward the customers that use this
										referral code?</label
									>
									<select
										v-model="newPromoCode.reward_kind"
										name="reward_kind"
										class="input-field"
									>
										<option value="wallet_credit">
											Credit Customer's Wallet
										</option>
										<option value="flat_rate_discount_on_trips">
											Discount Customer's Trip by an Amount
										</option>
										<option value="percentage_discount_on_trips">
											Discount Customer's Trip by a Percentage
										</option>
									</select>
								</div>

								<div class="form-group">
									<label for="" class="form-label">{{
										rewardAmountLabel
									}}</label>
									<div class="flex items-center">
										<div
											class="bg-gray-100 rounded-tl-md rounded-bl-md py-2.5 px-3"
										>
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

								<div class="form-group">
									<label for="" class="form-label"
									>Which customers can use this referral code?</label
									>
									<select
										v-model="newPromoCode.customer_constraint"
										name="reward_kind"
										class="input-field"
									>
										<option value="none">
											All Customers
										</option>
										<option value="new_customer">
											Only New Customers
										</option>
									</select>
								</div>

								<div class="form-group">
									<label for="" class="form-label"
									>When should this referral code expire?</label
									>
									<div>
										<div>
											<label for="" class="form-label"
											><input
													id="should_expire_yes"
													type="radio"
													value="1"
													:checked="newPromoCode.expires_at"
													name="should_expire"
												>
												<div class="d-inline-block ml-2">
													<InputDateInput
														v-model="newPromoCode.expires_at"
														class="font-light"
														placeholder="Filter by date"
													/>
												</div>
											</label>
										</div>
										<div>
											<label for="should_expire_no" class="form-label"
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

								<div class="form-group">
									<label for="" class="form-label"
									>Do you want to reward the
										{{ newPromoCode?.owners?.length > 1 ? "owners" : "owner" }}
										of
										{{ newPromoCode?.owners?.length > 1 ? "these" : "this" }}
										referral
										{{ newPromoCode?.owners?.length > 1 ? "codes" : "code" }}
										when other customers use their Referral Code?</label
									>
									<div>
										<label for="should_owner_benefits_yes" class="form-label"
										><input
											id="should_owner_benefits_yes"
											type="radio"
											name="should_owner_benefits"
											value="wallet_credit"
											:checked="newPromoCode?.owner_benefit?.reward_kind !== 'none'
											"
											@click="
												newPromoCode.owner_benefit.reward_kind =
													'wallet_credit'
											"
										>
											Yes
										</label>
									</div>
									<div>
										<label for="should_owner_benefits_no" class="form-label"
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
									<div class="form-group">
										<label for="" class="form-label"
										>How do you want to reward the referral code owner?</label
										>
										<select
											v-model="newPromoCode.owner_benefit.reward_kind"
											name="reward_kind"
											class="input-field"
										>
											<option value="wallet_credit">
												Credit Owner's Wallet
											</option>
											<option value="flat_rate_discount_on_trips">
												Discount Owner's Trip by an Amount
											</option>
											<option value="percentage_discount_on_trips">
												Discount Owner's Trip by a Percentage
											</option>
										</select>
									</div>

									<div class="form-group">
										<label for="" class="form-label">{{
											ownerRewardAmountLabel
										}}</label>
										<div class="flex items-center">
											<div
												class="bg-gray-100 py-3 px-3 rounded-rl-md rounded-bl-md"
											>
												<span class="input-group-text">{{
													ownerRewardAmountLabelSymbol
												}}</span>
											</div>
											<input
												v-model.number="
													newPromoCode.owner_benefit.reward_amount
												"
												type="number"
												min="0"
												class="input-field"
												placeholder=""
											>
										</div>
									</div>
								</div>

								<div class="">
									<label for="" class="form-label"
									>Which of the existing customer is this referral code
										for?</label
									>
									<div>
										<div class="">
											<label for="" class="form-label w-full">
												<input
													id="promo_code_owner_type"
													type="radio"
													:checked="newPromoCode.owners"
													value="1"
													name="promo_code_owner_type"
												>
												<div class="w-full">
													<UserSelector
														v-model="selectedOwner"
														:multiple="true"
														@update:model-value="handleSelectedUsers"
													/>
												</div>
											</label>
										</div>
										<div>
											<label for="promo_code_owner_type" class="form-label"
											><input
												id="promo_code_owner_type"
												type="radio"
												name="promo_code_owner_type"
												:checked="newPromoCode.owner_type == 'all'"
												value="all"
												@click="
													() => {
														(newPromoCode.owner_type = 'all'),
														(newPromoCode.owners = []),
														(selectedOwner = {});
													}
												"
											>
												Generate for all customers
											</label>
										</div>
									</div>
								</div>

								<div class="form-group">
									<button
										type="submit"
										:disabled="sendingRequest"
										class="btn btn-lg btn-primary"
									>
										<span
											v-if="!loading"
											class="flex justify-center items-center gap-2.5"
										>
											{{
												sendingRequest
													? "Creating Referral Code.."
													: "Create Referral Code"
											}}
										</span>
										<Spinner v-else />
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useAlert } from '@/composables/core/notification'
import { useCreateReferralCode } from '@/composables/modules/referralcodes/create'
const { createReferralCode, loading, setPayload } = useCreateReferralCode()
definePageMeta({
  layout: 'dashboard',
  middleware: ['is-authenticated']
})

const selectedOwner = ref({}) as any

const handleSelectedUsers = () => {
  if (Object.keys(selectedOwner).length) {
    newPromoCode.value.owners.push(selectedOwner.value)
  }
}

const router = useRouter()
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
const user_ids = ref([]) as any
const customersList = ref([])
const isLoading = ref(false)

const ownerHasBenefit = computed(() => {
  return newPromoCode.value.owner_benefit.reward_kind !== 'none'
})

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

const handleCreateReferralCode = () => {
  if (newPromoCode.value.owner_type !== 'all') {
    user_ids.value = newPromoCode.value.owners.map((item) => {
      return { owner_type: 'customer', owner_id: item.id }
    })
    newPromoCode.value.owners = user_ids
  }

  if (newPromoCode.value.owner_benefit.reward_kind === 'none') {
    delete (newPromoCode.value as any).owner_benefit
  }

  if (
    newPromoCode.value.owners.length < 1 &&
    newPromoCode.value.owner_type !== 'all'
  ) {
    useAlert().openAlert({
      type: 'ERROR',
      msg: 'Please select at least one user'
    })
  }

  if (Object.keys(newPromoCode.value).includes('promo_code')) {
    delete (newPromoCode.value as any).promo_code
  }

  if (
    newPromoCode.value.customer_constraint &&
    newPromoCode.value.customer_constraint !== ''
  ) {
    newPromoCode.value.customer_constraint
  }

  if (newPromoCode.value.owner_type === 'all') {
    delete (newPromoCode.value as any).owners
    newPromoCode.value.owner_type = 'all'
    newPromoCode.value.owner_id = 1
  }

  if (
    Object.keys(newPromoCode.value).includes('expires_at') &&
    !newPromoCode.value.expires_at
  ) {
    delete (newPromoCode.value as any).expires_at
  }
  setPayload(newPromoCode.value)
  createReferralCode()
}

const ownerRewardAmountLabel = computed(() => {
  if (newPromoCode.value.owner_benefit.reward_kind === 'wallet_credit') {
    return 'How much do you want to reward owner?'
  }

  if (
    newPromoCode.value.owner_benefit.reward_kind ===
    'flat_rate_discount_on_trips'
  ) {
    return 'How much do you want to remove from the owner\'s trip?'
  }

  if (
    newPromoCode.value.owner_benefit.reward_kind ===
    'percentage_discount_on_trips'
  ) {
    return 'What percentage discount do you want to give on the owner\'s trip?'
  }

  return 'How much do you want to reward the owner with?'
})
</script>
