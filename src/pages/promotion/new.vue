<template>
	<main>
		<div class="mb-6">
			<button class="text text-xs bg-gray-200 text-gray-900 rounded-lg px-3 py-2">
				Go back
			</button>
		</div>
		<div class="bg-white rounded-md border w-6/12">
			<div class="px-6 py-5">
				<p class="font-medium">
					New Promo Code
				</p>
			</div>
			<hr>
			<div class="space-y-6 p-6 mt-5">
				<div class="w-full">
					<label for="campaignName" class="text-sm font-light text-gray">
						Name of Campaign</label>
					<input type="text" name="campaignName"
						class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900">
				</div>
				<div class="w-full">
					<label for="lastName" class="text-sm font-light text-gray">
						Promo Code</label>
					<input type="text" name="lastName"
						class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900">
				</div>

				<div class="w-full">
					<label for="lastName" class="text-sm font-light text-gray">
						Description of promo code Campaign</label>
					<textarea rows="3" cols="3"
						class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900" />
				</div>

				<div class="w-">
					<label for="password" class="text-sm font-light text-gray">
						How do you want to reward the customers that use this referral code?</label>
					<select class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900">
						<option>Credit Customer Wallet</option>
						<option>Discount Customers Trip by an Amount</option>
						<option>Discount Customers Trip by an Percentage</option>
					</select>
				</div>

				<div class="w-">
					<label for="customerRewardFee" class="text-sm font-light text-gray">
						How much do you want to reward customers?</label>
					<input type="number" name="customerRewardFee"
						class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900">
				</div>

				<div class="w-">
					<label for="password" class="text-sm font-light text-gray">
						Which customers can use this referral code?</label>
					<select class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900">
						<option>All Customers</option>
						<option>Only New Customers</option>
						<option>Seleect Customers</option>
						<option>Select Corporates</option>
					</select>
				</div>

				<div class="w-">
					<label for="password" class="text-sm font-light text-gray">
						When should this referral code expire?</label>
					<div class="space-y-3">
						<div class="space-x-2">
							<span><input name="usageImmediatlyAfterCreating" type="radio"> </span>
							<span><date-picker v-model:value="dateSelected" class="font-light"
								placeholder="Filter by date" /></span>
						</div>
						<div class="flex items-center gap-x-2">
							<span><input name="usageImmediatlyAfterCreating" type="radio"></span>
							<span> <label> Never expires</label></span>
						</div>
					</div>
				</div>

				<div class="w-">
					<label for="password" class="text-sm font-light text-gray">
						Apply promo code to beneficiaries immediately after creating?</label>
					<div class="flex items-center gap-x-3">
						<span><input name="usageImmediatlyAfterCreating" type="radio"></span>
						<span><label>Yes</label></span>
					</div>

					<div class="flex items-center gap-x-2">
						<span> <input name="usageImmediatlyAfterCreating" type="radio"></span>
						<span> <label>No</label></span>
					</div>
				</div>

				<div>
					<button class="text-white bg-black rounded-md px-6 py-2.5 text-xm">
						Create Promo Code
					</button>
				</div>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
</script>

<style></style>
