<template>
	<div>
		<ButtonGoBack class="mb-6" />
		<div class="container-fluid py-5">
			<div class="lg:w-6/12">
				<div class="">
					<div class="card">
						<div class="card-body">
							<h1 class="font-bold text-lg text-gray-900">
								New Promo Code
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
									<label for="" class="form-label">Promo code</label>
									<input
										v-model.trim="newPromoCode.promo_code"
										type="text"
										class="input-field"
										placeholder="Enter a custom prefix (optional)"
									>
								</div>
								<div class="form-group">
									<label for="" class="form-label"
									>Description of Promo Code Campaign</label
									>
									<textarea
										v-model.trim="newPromoCode.description"
										class="input-field resize-none"
										rows="2"
									/>
								</div>

								<div class="form-group">
									<label for="" class="form-label"
									>How many times should the Promo Code generated for this
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
									>How do you want to reward the customers that use this Promo
										Code?</label
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
									>Which customers can use this Promo Code?</label
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
										<option value="select_users">
											Select Users
										</option>
										<option value="select_corporates">
											Select Corporates
										</option>
									</select>
								</div>

								<div
									v-if="newPromoCode.customer_constraint == 'select_corporates'"
									class="form-group"
								>
									<label for=""
									>Select corporates that promo code applies to</label
									>
									<CompanySelector
										v-model="selectedCorporate"
										:multiple="true"
										@update:model-value="handleSelectedCorporate"
									/>
								</div>

								<div
									v-if="newPromoCode.customer_constraint == 'select_users'"
									class="form-group"
								>
									<label for="">Select users that promo code applies to</label>
									<UserSelector
										v-model="selectedUser"
										:multiple="true"
										@update:model-value="handleSelectedUsers"
									/>
								</div>

								<div class="form-group">
									<label for="" class="form-label"
									>When should this Promo Code expire?</label
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
									>Apply promo code to beneficiaries immediately after
										creating?</label
									>
									<div>
										<div>
											<div>
												<label
													for="should_apply_immediately_to_beneficiaries_yes"
													class="form-label"
												><input
													id="should_apply_immediately_to_beneficiaries_yes"
													type="radio"
													name="should_apply_immediately_to_beneficiaries"
													:checked="
														newPromoCode.should_apply_immediately_to_beneficiaries ==
															true
													"
													value="1"
													@click="
														newPromoCode.should_apply_immediately_to_beneficiaries = true
													"
												>
													Yes
												</label>
											</div>
											<div>
												<label
													for="should_apply_immediately_to_beneficiaries_no"
													class="form-label"
												><input
													id="should_apply_immediately_to_beneficiaries_no"
													type="radio"
													name="should_apply_immediately_to_beneficiaries"
													:checked="
														newPromoCode.should_apply_immediately_to_beneficiaries ==
															false
													"
													value="0"
													@click="
														newPromoCode.should_apply_immediately_to_beneficiaries = false
													"
												>
													No
												</label>
											</div>
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
													? "Creating Promo Code.."
													: "Create Promo Code"
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
import { useUser } from '@/composables/auth/user'
import { useAlert } from '@/composables/core/notification'
import { useCreatePromoCode } from '@/composables/modules/promocodes/create'
const { createPromoCode, loading } = useCreatePromoCode()
const { user } = useUser()

const selectedUser = ref({}) as any
const selectedCorporate = ref({}) as any

const handleSelectedUsers = () => {
  if (Object.keys(selectedUser).length) {
    newPromoCode.value.customer_constraint_options.push(selectedUser.value)
  }
}

const handleSelectedCorporate = () => {
  if (Object.keys(selectedCorporate).length) {
    newPromoCode.value.customer_constraint_options.push(
      selectedCorporate.value
    )
  }
}

const shouldRewardOwners = ref(0)
const sendingRequest = ref(false)
const newPromoCode = ref({
  name: '',
  description: '',
  customer_constraint: 'none',
  customer_constraint_options: null as any,
  owner_type: 'admin',
  owner_id: 1,
  expires_at: null as any,
  max_number_of_uses: 0,
  reward_amount: 0,
  reward_kind: 'wallet_credit',
  should_owner_benefit: false,
  promo_code: '',
  should_apply_immediately_to_beneficiaries: false
})

		watch(() => newPromoCode.value.customer_constraint, (newval) => {
			newPromoCode.value.customer_constraint_options = []
			if (
				newval !== 'select_users' &&
				newval !== 'select_corporates'
			) {
				newPromoCode.value.customer_constraint_options = null
			}
		})

onMounted(() => {
	if (user.value && user.value.role) {
			newPromoCode.value.owner_type = 'staff'
		}
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

const handleCreateReferralCode = () => {
    newPromoCode.value.owner_id = user.value.id
  const payload = {
    customer_benefit: {
      reward_amount: newPromoCode.value.reward_amount,
      reward_kind: newPromoCode.value.reward_kind,
      customer_constraint: 'none',
      customer_constraint_options: null
    },
    ...newPromoCode.value
  }

  if (
    newPromoCode.value.customer_constraint &&
    newPromoCode.value.customer_constraint !== ''
  ) {
    payload.customer_benefit.customer_constraint =
      newPromoCode.value.customer_constraint

    payload.customer_benefit.customer_constraint_options =
      newPromoCode.value.customer_constraint_options?.map((i) => i.id)

    if (
      (newPromoCode.value.customer_constraint === 'select_users' ||
        newPromoCode.value.customer_constraint === 'select_corporates') &&
      (!payload?.customer_benefit?.customer_constraint_options ||
        !payload?.customer_benefit?.customer_constraint_options?.length)
    ) {
      useAlert().openAlert({
        type: 'ERROR',
        msg: 'customer constraint of type \'Select Users\' and \'Select Corporates\' requires valid options to be selected'
      })
    }
  }

  if (Object.keys(payload).includes('expires_at') && !payload.expires_at) {
    delete payload.expires_at
  }
  createPromoCode(payload)
}

definePageMeta({
  layout: 'dashboard',
  middleware: ['is-authenticated']
})
</script>
