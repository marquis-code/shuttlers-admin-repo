<template>
	<section class="lg:flex space-y-6 lg:space-y-0 lg:space-x-10 items-start">
		<section class="h-[400px] lg:w-6/12 stat-card">
			<div class="border-b">
				<h3 class="font-medium py-4 px-6">
					Our Routes
				</h3>
			</div>
			<div class="">
				<div v-for="item, index in routes" :key="index" class="overflow-x-auto flex justify-between items-center text-sm hover:bg-gray-100 w-full px-6 py-3">
					<div class="space-y-6">
						<div class="space-y-2">
							<p class="text-gray-700">
								{{ item.pickup }}
							</p>
							<p class="text-gray-700">
								{{ item.dropoff }}
							</p>
						</div>
						<div class="flex justify-between items-center text-gray-700">
							<p class="font-light text-[12px]">
								{{ item.routeCode }}
							</p>
							<p class="font-light text-[12px]">
								{{ item.time }}
							</p>
							<p class="font-light text-[12px]">
								{{ item.distance }}
							</p>
							<p class="text-white font-medium text-[12px] rounded-md py-0.5 px-1" :class="[item.status === 'Active' ? 'bg-green-500' : 'bg-gray-500']">
								{{ item.status }}
							</p>
						</div>
					</div>
					<p class="">
						<img src="@/assets/icons/greater.svg" alt="" class="">
					</p>
				</div>
			</div>
		</section>
		<section class="h-[400px] lg:lg:w-6/12 stat-card">
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
  const routes = ref([
	{
		pickup: 'Shoprite Sangotedo., Sangotedo, Nigeria',
		dropoff: 'OANDO Gas and Petrol Station, Alakoro Marina St, Lagos, Nigeria',
		routeCode: 'SGT4',
		time: '57 mins',
		distance: '32.64 km',
		status: 'Active'
	},
	{
		pickup: 'Jakande Gate Bus Stop., LCDA, Egbe Road, Lagos, Nigeria',
		dropoff: 'EvertyOne Towers, Lagos, Nigeria',
		routeCode: 'JAK16.',
		time: '51 mins',
		distance: '33.76 km',
		status: 'Inactive'
	}
  ])
</script>

<style scoped>

</style>

Shoprite Sangotedo., Sangotedo, Nigeria

57 mins
32.64 km
Active
