<template>
	<main class="space-y-10">
		<section class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
			<div v-for="(item, index) in dashboardStats" :key="index" class="rounded-md shadow-sm bg-white p-6 border">
				<h3 class="text-xs text-gray-400 font-medium leading-loose">
					{{ item.title }}
				</h3>
				<p class="text-lg font-bold text-black">
					{{ item.count }}
				</p>
			</div>
		</section>
		<section class="border shadow-md rounded-md bg-white h-[400px]">
			<div class="border-b">
				<h3 class="font-medium py-4 px-6">
					Trips
				</h3>
			</div>
		</section>
		<section class="border shadow-md rounded-md bg-white h-[400px]">
			<div class="border-b">
				<h3 class="font-medium py-4 px-6">
					Trip Rating Service
				</h3>
			</div>
		</section>
		<section class="lg:flex lg:space-x-10 items-start space-y-6 lg:space-y-0">
			<section class="border shadow-md rounded-md bg-white h-[400px] lg:w-6/12">
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
			<section class="border shadow-md rounded-md bg-white h-[400px] lg:w-6/12">
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
		<section class="lg:flex space-y-6 lg:space-y-0 lg:space-x-10 items-start">
			<section class="border shadow-md rounded-md bg-white h-[400px] lg:lg:w-6/12">
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
			<section class="border shadow-md rounded-md bg-white h-[400px] lg:lg:w-6/12">
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
	</main>
</template>
<script setup lang="ts">
definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
const dashboardStats = ref([
        {
            title: 'TOTAL RIDES',
            count: '102,354'
        },
        {
            title: 'TOTAL TRANSACTIONS',
            count: '1,441,860'
        },
        {
            title: 'TOTAL USERS',
            count: '77,472'
        },
        {
            title: 'TOTAL DRIVERS',
            count: '1,606'
        }
     ])
</script>
