<template>
	<section class="items-start space-y-6 lg:flex lg:space-x-10 lg:space-y-0">
		<section :class="[loading ? 'h-[400px]' : '']" class="rounded-lg lg:w-6/12 stat-card">
			<div class="border-b">
				<h3 class="px-6 py-4 font-medium">
					Last 5 Transactions
				</h3>
			</div>
			<div v-if="!loading" class="relative flex flex-col w-full min-w-0 break-words">
				<div class="block w-full overflow-x-auto ">
					<Table />
					<!-- <table class="min-w-full text-sm bg-white divide-y-2 divide-gray-200">
						<thead>
							<tr>
								<th class="py-5 text-[10px] text-gray-500 font-medium">
									DATE
								</th>
								<th class="py-5 text-[10px] text-gray-500 font-medium">
									DESCRIPTION
								</th>
								<th class="py-5 text-[10px] text-gray-500 font-medium">
									USER
								</th>
								<th class="py-5 text-[10px] text-gray-500 font-medium">
									AMOUNT
								</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-gray-200">
							<tr v-for="transaction, index in recentTransactions" :key="index" class="h-24 py-10 cursor-pointer">
								<td class="px-4 py-2 text-xs font-light text-gray-900">
									{{ transaction?.created_at ?? 'N/A' }}
								</td>
								<td class="px-4 py-2 text-xs font-light text-gray-700">
									{{ transaction?.title ?? 'N/A' }}
								</td>
								<td class="px-4 py-2 text-xs font-light text-gray-700">
									{{ transaction?.user?.fname }} {{ transaction?.user?.lname }}
								</td>
								<td class="w-3/12 px-4 py-2 text-xs font-light" :style="{color: transaction?.type === 'debit' ? &quot;#e63757&quot; : &quot;#00d97e&quot;}">
									₦{{ transaction?.amount }}
								</td>
							</tr>
						</tbody>
					</table> -->
				</div>
			</div>
			<div v-else class="flex items-center justify-center h-full">
				<p class="text-center">
					Loading...
				</p>
			</div>
		</section>
		<section :class="[loading ? 'h-[400px]' : '']" class="lg:w-6/12 stat-card">
			<h3 class="px-6 py-4 font-medium">
				Last 5 User Signups
			</h3>
			<div v-if="!loading" class="relative flex flex-col w-full min-w-0 break-words">
				<div class="block w-full overflow-x-auto ">
					<table class="items-center w-full border-collapse">
						<thead>
							<tr>
								<th class="px-6 align-middle border border-solid py-3 text-[10px] uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-100 text-gray-600">
									USER
								</th>
								<th class="px-6 align-middle border border-solid py-3 text-[10px] uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-100 text-gray-600">
									EMAIL
								</th>
								<th class="px-6 align-middle border border-solid py-3 text-[10px] uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-100 text-gray-600">
									STATUS
								</th>
							</tr>
						</thead>

						<tbody class="divide-y divide-gray-200">
							<tr v-for="item, index in recentSignups" :key="index" class="h-24 cursor-pointer">
								<th class="flex items-center p-4 px-6 space-x-2 text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
									<p class="flex items-center justify-center w-10 h-10 text-center text-white bg-gray-400 rounded-full">
										{{ item.fname.charAt(0).toUpperCase() + item.lname.charAt(0).toUpperCase() }}
									</p>
									<span class="text-gray-600"> {{ item.fname }} {{ item.lname }}</span>
								</th>
								<td class="p-4 px-6 text-sm text-gray-600 align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
									{{ item.email }}
								</td>
								<td class="p-4 px-6 text-sm text-gray-600 align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
									{{ item.active == '1' ? 'Active' : 'Inactive' }}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="flex items-end justify-end py-4 pr-3 border-t">
					<NuxtLink to="/users" class="flex items-center justify-center text-xs text-blue-500 gap-x-2">
						All Users<img class="inline" src="@/assets/icons/source/next.svg" alt="">
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

const { loadRecentStats, loading, recentTransactions, recentSignups } = useRecentDashboardStats()
loadRecentStats()

</script>

<style scoped>

</style>
