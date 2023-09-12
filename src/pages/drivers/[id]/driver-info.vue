<template>
	<div class="space-y-10">
		<div v-if="!loading" class="lg:flex lg:gap-x-10 justify-center items-start space-y-10 lg:space-y-0">
			<div class="w-7/12 bg-white rounded-md shadow-sm p-3">
				<div class="flex justify-between items-center py-2.5 border-b pb-2 px-3">
					<div class="font-medium">
						Driver Information
					</div>
					<ButtonDropdown :children="dropdownChildren" />
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						NAME
					</p>
					<p class="text-sm">
						{{ `${selectedDriver.fname} ${selectedDriver.lname}` ?? 'N/A' }}
					</p>
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						AVATAR
					</p>
					<p>
						<Avatar :name="selectedDriver.fname" bg="#B1C2D9" />
					</p>
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						PHONE NUMBER
					</p>
					<p class="text-sm">
						{{ selectedDriver.phone ?? 'N/A' }}
					</p>
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						EMAIL ADDRESS
					</p>
					<p class="text-sm">
						{{ selectedDriver.email ?? 'N/A' }}
					</p>
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						RESIDENTIAL ADDRESS
					</p>
					<p class="text-sm">
						{{ selectedDriver.residential_address ?? 'N/A' }}
					</p>
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						DATE OF BIRTH
					</p>
					<p class="text-sm">
						{{
							selectedDriver.dob ?? 'N/A'
						}}
					</p>
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						DATE JOINED
					</p>
					<p class="text-sm">
						{{ useDateFormat(selectedDriver.created_at, "MMMM d, YYYY").value }}
					</p>
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						VEHICLE ASSIGNED
					</p>
					<div v-if="selectedDriver.vehicle">
						<nuxt-link :to="`/fleet/${selectedDriver.vehicle.id}/vehicle-info`" class="text-sm text-indigo-500 cursor-pointer">
							{{
								`${selectedDriver.vehicle.seats} Seater - ${selectedDriver.vehicle.brand} ${selectedDriver.vehicle.name} ${selectedDriver.vehicle.registration_number}`
							}}
						</nuxt-link>
					</div>
					<p v-else>
						No vehicle assigned
					</p>
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						RECENT DEVICE
					</p>
					<p class="text-sm">
						{{
							selectedDriver?.device?.device_brand ?? 'N/A'
						}}
					</p>
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						VEHICLE PARTNER
					</p>
					<p v-if="selectedDriver?.partner" class="text-sm">
						{{
							selectedDriver?.partner?.fname ??
								selectedDriver?.partner?.company_name
						}}
					</p>
					<p v-else>
						N/A
					</p>
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						ROUTE ASSIGNED
					</p>
					<div v-if="selectedDriver?.routes?.length">
						<span
							v-for="(route, index) in selectedDriver?.routes"
							:key="index"
						>{{ route.route_code }}</span
						>
					</div>
					<span v-else>N/A</span>
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						LICENSE NUMBER
					</p>
					<p class="text-sm">
						{{ selectedDriver?.vehicle?.registration_number ?? 'N/A' }}
					</p>
				</div>
			</div>
			<div class="w-5/12 bg-white rounded-md shadow-sm">
				<div class="px-6 border-b py-3  flex justify-between items-center">
					<div class="flex items-center gap-x-3 gap-y-2">
						<img src="@/assets/icons/source/pdf_download.svg" alt="">
						<div>
							<p class="text-sm">
								Drivers License
							</p>
							<p class="text-xs text-shuttlersGreen">
								Submitted
							</p>
						</div>
					</div>
					<p class="text-sm underline text-indigo-500 cursor-pointer">
						View Document
					</p>
				</div>
			</div>
		</div>
		<section class="px-0 card">
			<header class="border-b">
				<h3 class="font-medium px-6">
					Rides by Driver
				</h3>
				<p class="text-sm text-gray-500  pb-3 px-6">
					Rides by driver over the last 30 days
				</p>
			</header>
			<div class="p-5">
				<ChartsBarChart class="!h-72" :loading="loadingTripGraph" :data="getYearlyBarChartData(tripsGraphData)" />
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useDriverIdDetails } from '@/composables/modules/drivers/id'
import { useGetTripsGraph } from '@/composables/modules/trips/fetch'
import { getYearlyBarChartData } from '@/composables/utils/charts'
const { getDriverById, loading, selectedDriver } = useDriverIdDetails()
const { getTripsGraph, loading: loadingTripGraph, tripsGraphData } = useGetTripsGraph()
getTripsGraph()
const id = useRoute().params.id as string
getDriverById(id)

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})

const dropdownChildren = computed(() => [
	{ name: 'Edit Driver', func: () => { } },
	{ name: 'Assign Bus', func: () => { } },
	{ name: 'Edit Bus', func: () => { } },
	{ name: 'Assign/Unassign Route', func: () => { } },
	{ name: 'Start or Stop Trip', func: () => { } },
	{ name: 'Change Password', func: () => { } },
	{ name: 'Add Profile Picture', func: () => { } },
	{ name: 'Suspend Driver', func: () => { }, class: '!text-red' },
	{ name: 'Delete Driver', func: () => { }, class: '!text-red' }
])

const openDropdown = ref(false)
</script>
