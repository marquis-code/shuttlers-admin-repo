<template>
	<main>
		<ButtonGoBack class="mb-6" />

		<div class="bg-white rounded-md border w-6/12">
			<div class="px-6 py-5">
				<p class="font-medium">
					New Promo Code
				</p>
			</div>
			<hr>
			<form class="space-y-6 p-6 mt-5">
				<div class="w-full">
					<label for="" class="text-sm font-light text-gray">
						Name of Campaign</label>
					<input v-model.trim="newPromoCode.name" type="text" name=""
						class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900">
				</div>
				<div class="w-full">
					<label for="" class="text-sm font-light text-gray">
						Promo Code</label>
					<input v-model.trim="newPromoCode.promo_code" type="text" name="l"
						class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900">
				</div>

				<div class="w-full">
					<label for="lastName" class="text-sm font-light text-gray">
						Description of promo code Campaign</label>
					<textarea v-model.trim="newPromoCode.description" rows="3" cols="3"
						class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900" />
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
						<input v-model.number="newPromoCode.reward_amount" type="number" class="form-control"
							placeholder="">
					</div>
				</div>

				<div class="w-">
					<label for="password" class="text-sm font-light text-gray">
						Which customers can use this referral code?</label>
					<select v-model="newPromoCode.customer_constraint"
						class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900">
						<option value="none">
							All Customers
						</option>
						<option value="new_customers">
							Only New Customers
						</option>
					</select>
				</div>

				<div class="w-">
					<label for="password" class="text-sm font-light text-gray">
						When should this referral code expire?</label>
					<div class="space-y-3">
						<div class="space-x-2">
							<span><input id="should_expire_yes" type="radio" value="1" name="should_expire"> </span>
							<span><date-picker v-model:value="newPromoCode.expires_at" class="font-light"
								placeholder="Filter by date" /></span>
						</div>
						<div class="flex items-center gap-x-2">
							<span><input id="should_expire_no" type="radio" name="should_expire"
								:checked="newPromoCode.expires_at == null" value="0"
								@click="newPromoCode.expires_at = null"></span>
							<span> <label> Never expires</label></span>
						</div>
					</div>
				</div>
				<div>
					<button :disabled="sendingRequest" type="submit"
						class="text-white bg-black rounded-md px-6 py-2.5 text-xm">
						{{
							sendingRequest
								? 'Creating Promo Code..'
								: 'Create Promo Code'
						}}
					</button>
				</div>
			</form>
		</div>
	</main>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})

const shouldRewardOwners = ref(0)
const sendingRequest = ref(false)
const newPromoCode = ref({
	name: '',
	description: '',
	customer_constraint: 'none',
	owner_type: 'admin',
	owner_id: 1,
	expires_at: null,
	max_number_of_uses: 0,
	reward_amount: 0,
	reward_kind: 'wallet_credit',
	should_owner_benefit: false,
	promo_code: ''
})
const isLoading = ref(false)

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

</script>

<style></style>
