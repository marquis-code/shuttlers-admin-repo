<template>
	<main class="">
		<Table :loading="loadingFleets" :page="page" :headers="tableFields" :table-data="useMergeArrays(fleetsList, tripRatingData)" :has-options="true">
			<template #header>
				<TableFilter
					:filter-type="{ showSearchBar: true, showDownloadButton: true, showStatus: true, showDateRange: true }" @filter="onFilterUpdate" />
				<div class="bg-white border-y  border-x border-gray-300">
					<div class="px-3 py-3 w-full">
						<div class="flex justify-end items-center gap-x-3">
							<p class="font-bold text-gray-900">Filter:</p>
							<select v-if="!loading" v-model="filterData.type.value" class="border outline-none rounded-md border-gray-300 px-10 py-2.5">
								<option value="" disabled>Filter by vehicle Type</option>
								<option v-for="(itm, idx) in vehicleTypeslist" :key="idx" :value="itm.name">
									{{ itm.name }}
								</option>
							</select>
							<div><button v-if="filterData?.type?.value?.length" @click="filterData.type.value = ''" class="bg-black text-white text-sm px-3 py-2.5 rounded-md">Clear Filter</button></div>
						</div>
					</div>
				</div>
			</template>
			<template #item="{ item }">
				<div v-if="item.vehicle" class="flex items-center gap-x-3">
					<div><FullscreenImage :src="generateQRCodeImageUrl(item)" class="h-10 w-10" alt="QR Code" /></div>
					<div><img src="@/assets/icons/source/default-bus.png" alt="QR Code"></div>
					<span class="text-blue-600">{{ item.data.vehicle }}</span>
				</div>
				<div v-if="item.registration_number" class="">
					<p class="text-blue-600 cursor-pointer" @click="onRowClicked(item.data)">
						{{ item.data.registration_number }}
					</p>
				</div>
				<div v-if="item.seats">
					<p class="cursor-pointer" @click="onRowClicked(item.data)">
						{{ item.data.seats }}
					</p>
				</div>
				<div v-if="item.type">
					<span class="cursor-pointer" @click="onRowClicked(item.data)">{{ item.data.type }}</span>
				</div>

				<div v-if="item.rating">
					<AverageRating :rating="item?.data?.rating || 0" :total-trips="item?.data?.trip_count || 0" @click="onRowClicked(item.data)" />
				</div>
				<div>
					<div v-if="item.amenities">
						<p v-if="item.data.amenities" class="cursor-pointer" @click="onRowClicked(item.data)">
							{{ item.data.amenities.map((itm) => itm.name) }}
						</p>
						<p v-else>N/A</p>
					</div>
				</div>
				<div v-if="item.drivers">
					<div v-if="item?.data?.drivers?.length">
						<NuxtLink v-for="(i, index) in item.data.drivers" :key="index" :to="`/drivers/${i.id}/driver-info`" class="text-blue-600">
							{{ i?.fname ?? 'N/A' }} {{ i?.lname ?? 'N/A' }}
						</NuxtLink>
					</div>
					<p v-else class="text-sm text-gray-500">
						No driver assigned
					</p>
				</div>
				<span v-if="item.created_at" class="cursor-pointer" @click="onRowClicked(item.data)">
					{{ useDateFormat(item.data.createdAt, "MMMM d, YYYY").value }}
				</span>
			</template>
			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loadingFleets" @move-to="moveTo($event)"
					@next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>
<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useGetVehicleTypes } from '@/composables/modules/fleets/vehicle-types'
import { useMergeArrays } from '@/composables/core/JoinWithRatingData'
import { useGetTripRatingData } from '@/composables/modules/trips/tripRating'
import { useGetFleets } from '@/composables/modules/fleets/fetch'
import { useVehicleIdDetails } from '@/composables/modules/fleets/id'
const { getFleetsList, loadingFleets, fleetsList, filterData, onFilterUpdate, moveTo, next, prev, total, page } = useGetFleets()
const { tripRatingData, loadingRatingData, getRatingData } = useGetTripRatingData()
const { getFleetTypes, loading, vehicleTypeslist } = useGetVehicleTypes()
getFleetsList()
getRatingData()
getFleetTypes()

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})

const onRowClicked = (data) => {
	const { selectedVehicle } = useVehicleIdDetails()
	useRouter().push(`/fleet/${data.id}/vehicle-info`)
	selectedVehicle.value = data
}

const tableData = ref()
if (!loadingRatingData) {
	const mergedArray = useMergeArrays(fleetsList.value, tripRatingData.value)
	tableData.value = mergedArray
}

const tableFields = ref([
	{
		text: 'VEHICLE',
		value: 'vehicle',
		width: ''
	},
	{
		text: 'PLATE NUMBER',
		value: 'registration_number'
	},
	{
		text: 'CAPACITY',
		value: 'seats'
	},
	{
		text: 'TYPE',
		value: 'type'
	},
	{
		text: 'VEHICLE AMENITIES',
		value: 'amenities'
	},
	{
		text: 'AVERAGE RATING',
		value: 'rating'
	},
	{
		text: 'DRIVER',
		value: 'drivers'
	},
	{
		text: 'DATE ADDED',
		value: 'created_at'
	}
])

const generateQRCodeImageUrl = (vehicle) => {
	const encodedUrl = encodeURIComponent(
		`https://shuttlers.ng/#/vehicles/${vehicle.id}`
	)
	return `https://chart.googleapis.com/chart?cht=qr&choe=UTF-8&chs=512x512&chl=${encodedUrl}`
}

</script>

<style scoped></style>
