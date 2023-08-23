<template>
	<section class="lg:flex lg:space-x-10 items-start space-y-6 lg:space-y-0">
		<section :class="[loading ? 'h-[400px]' : '']" class="lg:w-6/12 stat-card rounded-lg">
			<div class="border-b">
				<h3 class="font-medium py-4 px-6">
					Last 5 Transactions
				</h3>
			</div>
			<div v-if="!loading" class="relative flex flex-col min-w-0 break-words w-full">
				<div class="block w-full overflow-x-auto ">
					<table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
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
							<tr v-for="transaction, index in recentTransactions" :key="index" class="h-24 py-10">
								<td class="px-4 py-2 text-gray-900 font-light text-xs">
									{{ transaction?.created_at ?? 'N/A' }}
								</td>
								<td class="px-4 py-2 text-gray-700 font-light text-xs">
									{{ transaction?.title ?? 'N/A' }}
								</td>
								<td class="px-4 py-2 text-gray-700 font-light text-xs">
									{{ transaction?.user?.fname }} {{ transaction?.user?.lname }}
								</td>
								<td class="px-4 py-2 font-light text-xs w-3/12" :style="{color: transaction?.type === 'debit' ? &quot;#e63757&quot; : &quot;#00d97e&quot;}">
									₦{{ transaction?.amount }}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div v-else class="flex justify-center items-center h-full">
				<p class="text-center">
					Loading...
				</p>
			</div>
		</section>
		<section :class="[loading ? 'h-[400px]' : '']" class="lg:w-6/12 stat-card">
			<h3 class="font-medium py-4 px-6">
				Last 5 User Signups
			</h3>
			<div v-if="!loading" class="relative flex flex-col min-w-0 break-words w-full">
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
							<tr v-for="item, index in recentSignups" :key="index" class="h-24">
								<th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center space-x-2">
									<p class="h-10 w-10 text-center flex justify-center items-center  text-white bg-gray-400 rounded-full">
										{{ item.fname.charAt(0).toUpperCase() + item.lname.charAt(0).toUpperCase() }}
									</p>
									<span class="text-gray-600"> {{ item.fname }} {{ item.lname }}</span>
								</th>
								<td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-gray-600">
									{{ item.email }}
								</td>
								<td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-gray-600">
									{{ item.active == '1' ? 'Active' : 'Inactive' }}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="flex justify-end items-end border-t py-4 pr-3">
					<NuxtLink to="/users" class="text-xs text-blue-500 flex justify-center items-center gap-x-2">All Users<img class="inline" src="@/assets/icons/source/next.svg" alt=""></NuxtLink>
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

const { loadRecentStats, loading, recentTransactions, recentSignups } = useRecentDashboardStats()
loadRecentStats()

console.log(recentTransactions, 'recent trasnsactions')
</script>

<style scoped>

</style>
