<template>
	<div>
		<div class="container-fluid py-5">
			<div class="row w-6/12">
				<div class="col-6 col-sm-6 col-lg-6 col-sm-12 col-xs-12">
					<div class="card">
						<div class="card-body">
							<h1>New Referral Code</h1>

							<form class="space-y-6">
								<div class="form-group">
									<label for="" class="form-label">Name of Campaign</label>
									<input v-model.trim="newPromoCode.name" type="text"
										class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900"
										placeholder="">
								</div>
								<div class="form-group">
									<label for="" class="form-label">Promo code prefix</label>
									<input v-model.trim="newPromoCode.promo_code_prefix" type="text"
										class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900"
										placeholder="Enter a custom prefix (optional)">
								</div>
								<div class="form-group">
									<label for="" class="form-label">Description of referral code Campaign</label>
									<textarea v-model.trim="newPromoCode.description"
										class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900"
										rows="2" />
								</div>

								<div class="form-group">
									<label for="" class="form-label">How many times should the Referral Code generated for
										this
										campaign be used?</label>
									<div>
										<div>
											<label for="" class="form-label"><input type="radio" name="promo_code_usages">
												<div class="d-inline-block ml-2">
													<div class="input-group input-group-sm">
														<input v-model.number="newPromoCode.max_number_of_uses"
															type="number" min="0"
															class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900"
															placeholder="e.g 2">
														<div class="input-group-append">
															<span class="input-group-text">times</span>
														</div>
													</div>
												</div>
											</label>
										</div>
										<div>
											<label for="promo_code_usages_unlimited" class="form-label"><input
												id="promo_code_usages_unlimited"
												v-model.number="newPromoCode.max_number_of_uses" type="radio"
												name="promo_code_usages" value="0">
												Unlimited
											</label>
										</div>
									</div>
								</div>

								<div class="form-group">
									<label for="" class="form-label">How do you want to reward the customers that use this
										referral code?</label>
									<select v-model="newPromoCode.reward_kind" name="reward_kind"
										class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900">
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
									<div class="input-group">
										<div class="input-group-prepend">
											<span class="input-group-text">{{
												rewardAmountLabelSymbol
											}}</span>
										</div>
										<input v-model.number="newPromoCode.reward_amount" type="number" min="0"
											class="form-control" placeholder="">
									</div>
								</div>

								<div class="form-group">
									<label for="" class="form-label">Which customers can use this referral code?</label>
									<select v-model="newPromoCode.customer_constraint" name="reward_kind"
										class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900">
										<option value="none">
											All Customers
										</option>
										<option value="new_customer">
											Only New Customers
										</option>
									</select>
								</div>

								<div class="form-group">
									<label for="" class="form-label">When should this referral code expire?</label>
									<div>
										<div>
											<label for="" class="form-label"><input id="should_expire_yes" type="radio"
												value="1" name="should_expire">
												<div class="d-inline-block ml-2">
													<v-datepicker v-model="newPromoCode.expires_at" />
												</div>
											</label>
										</div>
										<div>
											<label for="should_expire_no" class="form-label"><input id="should_expire_no"
												type="radio" name="should_expire"
												:checked="newPromoCode.expires_at == null" value="0"
												@click="newPromoCode.expires_at = null">
												Never expires
											</label>
										</div>
									</div>
								</div>

								<!-- <div class="form-group">
									<label for="" class="form-label"
									>Which of the existing customer is this referral code
										for?</label
									>
									<div>
										<div>
											<label for="owner_type_customers" class="form-label"
											><input
												id="owner_type_customers"
												v-model="newPromoCode.owner_type"
												type="radio"
												value="customer"
												name="owner_type"
											>
											</label>
											<div class="d-inline-block w-75 ml-2">
												<multiselect
													id="ajax"
													v-model="newPromoCode.owners"
													:custom-label="fullName"
													track-by="id"
													placeholder="Type to search"
													open-direction="bottom"
													:options="customersList"
													:multiple="true"
													:searchable="true"
													:loading="isLoading"
													:internal-search="false"
													:clear-on-select="false"
													:close-on-select="false"
													:options-limit="300"
													:limit="10"
													:limit-text="limitText"
													:show-no-results="false"
													:hide-selected="true"
													@search-change="asyncFindCustomers"
												>
													<template slot="clear" slot-scope="props">
														<div
															v-if="newPromoCode.owners.length"
															class="multiselect__clear"
															@mousedown.prevent.stop="clearAll(props.search)"
														/>
													</template
													><span slot="noResult"
													>Oops! No customers found. Consider changing the
														search query.</span
													>
												</multiselect>
											</div>
										</div>

										<div>
											<label for="owner_type_all" class="form-label"
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
								</div> -->

								<div class="form-group">
									<label for="" class="form-label">Do you want to reward the
										{{ newPromoCode.owners.length > 1 ? 'owners' : 'owner' }} of
										{{ newPromoCode.owners.length > 1 ? 'these' : 'this' }}
										referral
										{{ newPromoCode.owners.length > 1 ? 'codes' : 'code' }} when
										other customers use their Referral Code?</label>
									<div>
										<label for="should_owner_benefits_yes" class="form-label"><input
											id="should_owner_benefits_yes" type="radio" name="should_owner_benefits"
											value="wallet_credit" :checked="newPromoCode.owner_benefit.reward_kind != 'none'
											" @click="
												newPromoCode.owner_benefit.reward_kind =
													'wallet_credit'
											">
											Yes
										</label>
									</div>
									<div>
										<label for="should_owner_benefits_no" class="form-label"><input
											id="should_owner_benefits_no"
											v-model="newPromoCode.owner_benefit.reward_kind" type="radio"
											name="should_owner_benefits" value="none">
											No
										</label>
									</div>
								</div>

								<div v-if="newPromoCode.owner_benefit.reward_kind != 'none'">
									<div class="form-group">
										<label for="" class="form-label">How do you want to reward the referral code
											owner?</label>
										<select v-model="newPromoCode.owner_benefit.reward_kind" name="reward_kind"
											class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900">
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
										<div class="input-group">
											<div class="input-group-prepend">
												<span class="input-group-text">{{
													ownerRewardAmountLabelSymbol
												}}</span>
											</div>
											<input v-model.number="newPromoCode.owner_benefit.reward_amount
												" type="number" min="0" class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900"
												placeholder="">
										</div>
									</div>
								</div>

								<div class="form-group">
									<button :disabled="sendingRequest" type="submit" class="btn btn-lg btn-primary">
										{{
											sendingRequest
												? 'Creating Referral Code..'
												: 'Create Referral Code'
										}}
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
definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})

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
	expires_at: null,
	max_number_of_uses: 0,
	reward_amount: 0,
	reward_kind: 'wallet_credit',
	owner_reward_amount: 0,
	owner_reward_kind: '',
	should_owner_benefit: false,
	notify_all: false,
	owner_benefit: ref({
		reward_amount: 0,
		reward_kind: 'none'
	})
})
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
