<template>
	<main class="">
		<Table :loading="loadingFleets" :page="page" :headers="tableFields" :table-data="fleetsList" :has-options="true">
			<template #header>
				<TableFilter
					:filter-type="{ showSearchBar: true, showDownloadButton: true, showStatus: true, showDatePicker: true }" />
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
					<span class="cursor-pointer" @click="onRowClicked(item.data)">{{ item.data.rating }}</span>
				</div>
				<div>
					<div v-if="item.amenities">
						<p  class="cursor-pointer" @click="onRowClicked(item.data)">
							{{ item.data.amenities }}
						</p>
					</div>
				</div>
				<div>
					<div v-if="item.drivers">
						<p v-for="(i, index) in item.data.drivers" :key="index" class="text-blue-600">
							{{ i?.fname ?? 'N/A' }} {{ i?.lname ?? 'N/A' }}
						</p>
					</div>
				</div>
				<span v-if="item.created_at"  class="cursor-pointer" @click="onRowClicked(item.data)">
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
import { useGetFleets } from '@/composables/modules/fleets/fetch'
import { useVehicleIdDetails } from '@/composables/modules/fleets/id'

const { getFleetsList, loadingFleets, fleetsList, filterData, onFilterUpdate, moveTo, next, prev, total, page } = useGetFleets()
getFleetsList()

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})

const onRowClicked = (data) => {
	const { selectedVehicle } = useVehicleIdDetails()
	useRouter().push(`/fleet/${data.id}/vehicle-info`)
	selectedVehicle.value = data
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
