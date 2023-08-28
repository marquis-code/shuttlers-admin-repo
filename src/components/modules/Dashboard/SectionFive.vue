<template>
	<section class="items-start space-y-6 lg:flex lg:space-y-0 lg:space-x-10">
		<section :class="[loading ? 'h-[400px]' : '']" class="lg:w-6/12 stat-card">
			<div class="border-b">
				<h3 class="px-6 py-4 font-medium">
					Our Routes
				</h3>
			</div>
			<div v-if="!loading" class="">
				<div v-for="item, index in recentRoutes" :key="index" class="flex items-center justify-between w-full px-6 py-3 overflow-x-auto text-sm cursor-pointer hover:bg-gray-100">
					<div class="w-10/12 space-y-6">
						<div class="space-y-2">
							<p class="text-gray-700">
								{{ item?.pickup ?? 'N/A' }}
							</p>
							<p class="text-gray-700">
								{{ item?.destination ?? 'N/A' }}
							</p>
						</div>
						<div class="flex items-center justify-between w-full text-gray-700">
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
			<div v-else class="flex items-center justify-center h-full">
				<p class="text-center">
					Loading...
				</p>
			</div>
		</section>
		<section :class="[loading ? 'h-[400px]' : '']" class="lg:lg:w-6/12 stat-card">
			<div class="border-b">
				<h3 class="px-6 py-4 font-medium">
					Recent Charter Requests
				</h3>
			</div>
			<div v-if="!loading">
				<div class="overflow-x-auto">
					<table class="min-w-full text-sm bg-white divide-y-2 divide-gray-200">
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
							<tr v-for="charter, index in recentCharter" :key="index" class="h-24 cursor-pointer">
								<td class="px-4 py-2 text-xs font-light text-gray-900">
									<span>{{ charter?.pickup_date ?? 'N/A' }}</span>
								</td>
								<td class="px-4 py-2 text-xs font-light text-gray-700">
									<span>{{ charter?.pickup_address ?? 'N/A' }}</span>
								</td>
								<td class="px-4 py-2 text-xs font-light text-gray-700">
									<span>{{ charter?.return_address ?? 'N/A' }}</span>
								</td>
								<td class="px-4 py-2 text-xs font-light text-gray-700">
									<span>{{ charter.return_address ? 'Round Trip' : 'One Way' }}</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="flex items-end justify-end py-4 pr-3 border-t">
					<NuxtLink to="/charter" class="flex items-center justify-center text-xs text-blue-500 gap-x-2">
						All Charter Requests <img class="inline" src="@/assets/icons/source/next.svg" alt="">
					</NuxtLink>
				</div>
			</div>
			<div v-else class="flex items-center justify-center h-full">
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
