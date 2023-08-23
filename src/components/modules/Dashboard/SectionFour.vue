<template>
	<section class="lg:flex lg:space-x-10 items-start space-y-6 lg:space-y-0">
		<section class="h-[400px] lg:w-6/12 card">
			<div class="border-b">
				<h3 class="font-medium py-4 px-6">
					Last 5 Transactions
				</h3>
			</div>
			<div>
				<div class="overflow-x-auto">
					<table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
						<thead class="ltr:text-left rtl:text-right">
							<tr>
								<th class="py-5 text-xs text-gray-500 font-medium">
									DATE
								</th>
								<th class="py-5 text-xs text-gray-500 font-medium">
									DESCRIPTION
								</th>
								<th class="py-5 text-xs text-gray-500 font-medium">
									USER
								</th>
								<th class="py-5 text-xs text-gray-500 font-medium">
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
		<section class="h-[400px] lg:w-6/12 card">
			<div class="border-b">
				<h3 class="font-medium py-4 px-6">
					Last 5 User Signups
				</h3>
			</div>
			<div>
				<div class="overflow-x-auto">
					<table class="divide-y divide-gray-200 bg-white text-sm">
						<thead class="">
							<tr class="bg-gray-100">
								<th class="py-5 text-xs text-gray-500 font-medium">
									<span>USER</span>
								</th>
								<th class="py-5 text-xs text-gray-500 font-medium">
									<span>EMAIL</span>
								</th>
								<th class="py-5 text-xs text-gray-500 font-medium">
									<span>STATUS</span>
								</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-gray-200">
							<tr class="">
								<td class="px-4 py-2 text-gray-900 font-light text-xs  flex items-center space-x-3">
									<p class="inline p-3 font-semibold rounded-full text-white bg-gray-300">
										AA
									</p> <p class="font-medium">
										Temitope Sodiq
									</p>
								</td>
								<td class="px-4 py-2 text-gray-700 font-light text-xs w-3/12">
									ilovecivilian27@gmail.com
								</td>
								<td class="px-4 py-2 text-gray-700 font-light text-xs w-3/12">
									Active
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
