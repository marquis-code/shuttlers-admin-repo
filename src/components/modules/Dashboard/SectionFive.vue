<template>
	<section class="lg:flex space-y-6 lg:space-y-0 lg:space-x-10 items-start">
		<section :class="[loading ? 'h-[400px]' : '']" class="lg:w-6/12 stat-card">
			<div class="border-b">
				<h3 class="font-medium py-4 px-6">
					Our Routes
				</h3>
			</div>
			<div v-if="!loading" class="">
				<div v-for="item, index in recentRoutes" :key="index" class="overflow-x-auto flex justify-between items-center text-sm hover:bg-gray-100 w-full px-6 py-3">
					<div class="space-y-6 w-10/12">
						<div class="space-y-2">
							<p class="text-gray-700">
								{{ item?.pickup ?? 'N/A' }}
							</p>
							<p class="text-gray-700">
								{{ item?.destination ?? 'N/A' }}
							</p>
						</div>
						<div class="flex justify-between items-center text-gray-700 w-full">
							<p class="font-light text-[12px]">
								{{ item?.route_code ?? 'N/A' }}
							</p>
							<p class="font-light text-[12px]">
								{{ item?.duration ?? 'N/A' }}
							</p>
							<p class="font-light text-[12px]">
								{{ item?.distance ?? 'N/A' }}
							</p>
							<p class="text-white font-medium text-[9px] rounded-md py-[0.4px] px-1" :style="{backgroundColor: item?.status === 0 ? &quot;#e63757&quot; : &quot;#00d97e&quot;}">
								{{ item?.status === 0 ? 'Inactive' : 'Active' }}
							</p>
						</div>
					</div>
					<p class="">
						<img src="@/assets/icons/greater.svg" alt="" class="">
					</p>
				</div>
			</div>
			<div v-else class="flex justify-center items-center h-full">
				<p class="text-center">
					Loading...
				</p>
			</div>
		</section>
		<section :class="[loading ? 'h-[400px]' : '']" class="lg:lg:w-6/12 stat-card">
			<div class="border-b">
				<h3 class="font-medium py-4 px-6">
					Recent Charter Requests
				</h3>
			</div>
			<div v-if="!loading">
				<div class="overflow-x-auto">
					<table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
						<thead class="bg-gray-100">
							<tr class="px-6">
								<th class="py-4 text-[10px] text-gray-500 font-medium">
									<span>PICKUP DATE</span>
								</th>
								<th class="py-4 text-[10px] text-gray-500 font-medium">
									<span>FROM</span>
								</th>
								<th class="py-4 text-[10px] text-gray-500 font-medium">
									<span>TO</span>
								</th>
								<th class="py-4 text-[10px] text-gray-500 font-medium">
									<span>TRIP TYPE</span>
								</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-gray-200 ">
							<tr v-for="charter, index in recentCharter" :key="index" class="h-24">
								<td class="px-4 py-2 text-gray-900 font-light text-xs">
									<span>{{ charter?.pickup_date ?? 'N/A' }}</span>
								</td>
								<td class="px-4 py-2 text-gray-700 font-light text-xs">
									<span>{{ charter?.pickup_address ?? 'N/A' }}</span>
								</td>
								<td class="px-4 py-2 text-gray-700 font-light text-xs">
									<span>{{ charter?.return_address ?? 'N/A' }}</span>
								</td>
								<td class="px-4 py-2 text-gray-700 font-light text-xs">
									<span>{{ charter.return_address ? 'Round Trip' : 'One Way' }}</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="flex justify-end items-end border-t py-4 pr-3">
					<NuxtLink to="/charter" class="text-xs text-blue-500 flex justify-center items-center gap-x-2">All Charter Requests <img class="inline" src="@/assets/icons/source/next.svg" alt=""></NuxtLink>
				</div>
			</div>
			<div v-else class="flex justify-center items-center h-full">
				<p class="text-center">
					Loading...
				</p>
			</div>
		</section>
	</section>
</template>

<script setup lang="ts">
import { useRecentDashboardStats } from '@/composables/modules/dashboard/recentStats'

const { loadRecentStats, loading, recentCharter, recentRoutes } = useRecentDashboardStats()
loadRecentStats()

console.log(recentCharter.value, 'reecent routes here')

</script>

<style scoped>

</style>
