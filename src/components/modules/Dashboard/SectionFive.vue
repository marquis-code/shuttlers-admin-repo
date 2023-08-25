<template>
	<section class="lg:flex space-y-6 lg:space-y-0 lg:space-x-10 items-start">
		<section :class="[loadingRoutes ? 'h-[400px]' : '']" class="lg:w-6/12 stat-card">
			<div class="border-b">
				<h3 class="font-medium py-4 px-6">
					Our Routes
				</h3>
			</div>
			<div v-if="!loadingRoutes" class="">
				<div v-for="item, index in routesList" :key="index" class="overflow-x-auto flex justify-between items-center text-sm hover:bg-gray-100 w-full px-6 py-3 cursor-pointer">
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
		<section class="lg:lg:w-6/12 stat-card">
			<div class="">
				<h3 class="font-medium py-4 px-6">
					Recent Charter Requests
				</h3>
			</div>
			<div>
				<div class="overflow-x-auto">
					<Table :headers="charterHeader" :table-data="charterList" :loading="loadingCharter">
						<template #item="{ item }">
							<span v-if="item.pickup_date" class="flex items-center gap-4">
								<span class="text-sm">{{ item?.data?.pickup_date }}</span>
							</span>
							<span v-if="item.pickup_address" class="flex items-center gap-4">
								<span class="text-sm">{{ item?.data?.pickup_address }}</span>
							</span>
							<span v-if="item.return_address" class="flex items-center gap-4">
								<span class="text-sm">{{ item?.data?.return_address }}</span>
							</span>
							<span v-if="item.return_time" class="flex items-center gap-4">
								<span class="text-sm">{{ item.data.return_address ? 'Round Trip' : 'One Way' }}</span>
							</span>
						</template>
					</Table>
				</div>
				<div v-if="!loadingCharter" class="flex justify-end items-end py-4 pr-3">
					<NuxtLink to="/trips/charter" class="text-xs text-blue-500 flex justify-center items-center gap-x-2">All Charter Requests <img class="inline" src="@/assets/icons/source/next.svg" alt=""></NuxtLink>
				</div>
			</div>
		</section>
	</section>
</template>

<script setup lang="ts">
import { useGetRecentCharterList } from '@/composables/modules/charter'
import { useGetRecentRoutesList } from '@/composables/modules/routes'

const { getCorporatesList, loadingCharter, charterList } = useGetRecentCharterList()
const { getRoutesList, loadingRoutes, routesList } = useGetRecentRoutesList()
getCorporatesList()
getRoutesList()

const charterHeader = [
	{
		text: 'Pickup Date',
		value: 'pickup_date'
	},
	{
		text: 'From',
		value: 'pickup_address'
	},
	{
		text: 'To',
		value: 'return_address'
	},
	{
		text: 'Trip Type',
		value: 'return_time'
	}
]

</script>

<style scoped>

</style>
