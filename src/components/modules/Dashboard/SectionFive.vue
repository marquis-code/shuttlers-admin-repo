<template>
	<section class="lg:flex space-y-6 lg:space-y-0 lg:space-x-10 items-start">
		<section class="card h-[400px] lg:w-6/12">
			<div class="border-b">
				<h3 class="font-medium py-4 px-6">
					Our Routes
				</h3>
			</div>
			<div>
				<div class="overflow-x-auto">
					<table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
						<thead class="ltr:text-left rtl:text-right">
							<tr>
								<th class="whitespace-nowrap px-4 py-2 text-xs text-gray-500 font-medium">
									DATE
								</th>
								<th class="whitespace-nowrap px-4 py-2 text-xs text-gray-500 font-medium">
									DESCRIPTION
								</th>
								<th class="whitespace-nowrap px-4 py-2 text-xs text-gray-500 font-medium">
									USER
								</th>
								<th class="whitespace-nowrap px-4 py-2 text-xs text-gray-500 font-medium">
									AMOUNT
								</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-gray-200">
							<tr class="">
								<td class="px-4 py-2 text-gray-900 font-light text-xs w-3/12">
									02:01 PM Jul 23, 2023
								</td>
								<td class="px-4 py-2 text-gray-700 font-light text-xs w-3/12">
									Booking refund for SRL103. from Sandfill Bus Stop to Ogunlana Drive Bus Stop (Itire Rd) for 2023-07-24 trip on Company wallet.
								</td>
								<td class="px-4 py-2 text-gray-700 font-light text-xs w-3/12">
									Oshokpekha
								</td>
								<td class="px-4 py-2 font-light text-xs w-3/12 text-green-500">
									₦1,700
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</section>
		<section class="card h-[400px] lg:lg:w-6/12">
			<div class="border-b">
				<h3 class="font-medium py-4 px-6">
					Recent Charter Requests
				</h3>
			</div>
			<div>
				<div class="overflow-x-auto">
					<table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
						<thead class="bg-gray-100">
							<tr>
								<th class="py-4 text-xs text-gray-500 font-medium">
									<span>PICKUP DATE</span>
								</th>
								<th class="py-4 text-xs text-gray-500 font-medium">
									<span>FROM</span>
								</th>
								<th class="py-4 text-xs text-gray-500 font-medium">
									<span>TO</span>
								</th>
								<th class="py-4 text-xs text-gray-500 font-medium">
									<span>TRIP TYPE</span>
								</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-gray-200 ">
							<tr class="">
								<td class="px-4 py-2 text-gray-900 font-light text-xs w-3/12">
									<span>2023-07-29</span>
								</td>
								<td class="px-4 py-2 text-gray-700 font-light text-xs w-3/12">
									<span>Sam Ethnan Airforce Base, Alh Abibat Street, Lagos, Nigeria</span>
								</td>
								<td class="px-4 py-2 text-gray-700 font-light text-xs w-3/12">
									<span>Victoria Island, Lagos, Lagos, Nigeria</span>
								</td>
								<td class="px-4 py-2 text-gray-700 font-light text-xs w-3/12">
									<span>Round Trip</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</section>
	</section>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
