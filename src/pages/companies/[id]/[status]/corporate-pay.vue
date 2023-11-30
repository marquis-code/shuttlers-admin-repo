<template>
	<main class="card px-0">
		<div class="flex justify-between items-center border-b px-6 py-3">
			<div>
				<h1 class="font-bold text-gray-900">
					Corporate Pay Configuration
				</h1>
				<p class="text-sm text-gray-700 max-w-lg">
					Corporates should be able to configure different settings for their customers to restrict usage of
					Company Wallet.
				</p>
			</div>
			<div>
				<button class="bg-black text-sm text-white  px-3 py-2 rounded-md">
					Save Changes
				</button>
			</div>
		</div>
		<div class="flex p-6">
			<div class="w-3/12">
				<h1 class="font-bold text-gray-900">
					Wallet Options
				</h1>
				<p class="text-sm text-gray-700 max-w-lg">
					Configure how your staff wallet behave
				</p>
			</div>
			<div class="w-9/12 space-y-3">
				<div v-for="(itm, idx) in walletOptions" :key="idx" class="cursor-pointer focus-within:shadow-lg focus-within:bg-emerald-600">
					<label :for="itm.name" class="flex justify-between items-center py-4 rounded-md  bg-white border px-6">
						<p class="text-sm text-gray-700">
							{{ itm.name }}
						</p>
						<div> <input :id="itm.name" type="checkbox"></div>
					</label>
				</div>
			</div>
		</div>

		<div class="flex p-6">
			<div class="w-3/12">
				<h1 class="font-bold text-gray-900">
					Limit Configuration
				</h1>
				<p class="text-sm text-gray-700 max-w-lg">
					This settings will allow corporate or Shuttlers Admin Configure a
					limit/Period.
				</p>
			</div>
			<div class="w-9/12 space-y-3">
				<div v-for="(itm, idx) in limitConfiguration" :key="idx">
					<div class="flex justify-between items-center py-4 rounded-md  bg-white border px-6">
						<div class="flex items-center gap-x-3">
							<p class="text-sm text-gray-700">
								{{ itm.name }}
							</p>
							<div><input type="number" class="outline-none py-2 px-2.5 rounded-md border"></div>
						</div>
						<div> <input type="radio"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="flex justify-between items-center p-6">
			<div>
				<h1 class="font-bold text-gray-900">
					Show staffs their limit usage
				</h1>
				<p class="text-sm text-gray-700 max-w-lg">
					Do you want the staffs of this company to see their limit usage?
				</p>
			</div>
			<div>
				<label for="prevent_staff_view_of_public_routes"
					class="relative h-8 w-14 cursor-pointer [-webkit-tap-highlight-color:_transparent]">
					<input id="prevent_staff_view_of_public_routes" type="checkbox" class="peer sr-only">

					<span class="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-shuttlersGreen" />

					<span
						class="absolute inset-y-0 start-0 m-1 h-6 w-6 rounded-full bg-white transition-all peer-checked:start-6" />
				</label>
			</div>
		</div>
		<div class="flex p-6">
			<div class="w-3/12">
				<h1 class="font-bold text-gray-900">
					Exemptions
				</h1>
				<p class="text-sm text-gray-700 max-w-lg">
					This configuration will allow a company exempt some users or a group of users from the “Limit restrictions”.
				</p>
			</div>
			<div class="w-9/12 space-y-3 border rounded-md">
				<div class="flex justify-between items-center border-b py-3 px-6">
					<h1 class="font-medium text-gray-700">
						Create new exemption for your staff
					</h1>
					<div>
						<button class="bg-black text-sm text-white py-2 rounded-md px-3">
							Add Exemption
						</button>
					</div>
				</div>
				<p class="flex justify-center items-center text-sm text-gray-800 py-3">
					No exemption has been added yet
				</p>
				<div class="flex justify-between items-center p-6">
					<div>
						<label for="" class="font-bold flex items-center gap-x-2">
							Create exemption for groups in your company
							<input type="radio">
						</label>
					</div>
					<div>
						<label for="" class="font-bold flex items-center gap-x-2">

							Create exemption for individual users in your company

							<input type="radio">
						</label>
					</div>
				</div>
				<div class="p-6">
					<p class="text-sm font-medium">
						Configuration
					</p>
					<div class="flex justify-between items-center py-4 rounded-md px-6 border">
						<div class="flex items-center gap-x-3">
							<p>Allow an employee spend</p>
							<div>
								<input type="number" class="w-full border outline-none py-2 rounded-md px-3">
							</div>
							<div class="flex items-center gap-x-3">
								<p class="text-sm font-medium text-gray-800">
									per
								</p>
								<div class="w-full">
									<select class="border input-field w-full py-2 text-sm px-6">
										<option value="day">
											Day
										</option>
										<option value="week">
											Week
										</option>
										<option value="month">
											Month
										</option>
										<option value="year">
											Year
										</option>
									</select>
								</div>
							</div>
						</div>
						<div><input type="radio"></div>
					</div>
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

const walletOptions = reactive([
	{
		name: 'Restrict booking on public routes with company wallet',
		value: 'restrict_booking_on_public_routes_with_company_wallet'
	},
	{
		name: 'Restrict booking on private routes with company wallet',
		value: 'restrict_booking_on_private_routes_with_company_wallet'
	}
])

const limitConfiguration = reactive([
	{
		name: 'Allow an employee spend',
		amount: '',
		duration: [{
			name: 'Day',
			value: 'day'
		}, {
			name: 'Week',
			value: 'week'
		}, {
			name: 'Month',
			value: 'month'
		}, {
			name: 'Year',
			value: 'year'
		}]
	},
	{
		name: 'Allow an employee book',
		amount: '',
		duration: [{
			name: 'Day',
			value: 'day'
		}, {
			name: 'Week',
			value: 'week'
		}, {
			name: 'Month',
			value: 'month'
		}, {
			name: 'Year',
			value: 'year'
		}]
	}
])
</script>

<style scoped></style>
