<template>
	<div class="space-y-10">
		<ButtonGoBack />
		<div v-if="!loading" class="flex flex-col gap-5 lg:flex-row lg:gap-x-10 items-start">
			<div class="w-7/12 max-w-[600px] bg-white rounded-md shadow-sm p-3">
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
				<div class="flex justify-between items-center gap-4 border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						ROUTE ASSIGNED
					</p>
					<div v-if="selectedDriver?.routes?.length" class="text-sm flex items-center gap-2 flex-wrap">
						<span
							v-for="(route, index) in selectedDriver?.routes"
							:key="index"
						>{{ route?.route_code || 'N/A' }}</span
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
			<div class="w-5/12 max-w-[400px] flex flex-col gap-4">
				<template v-if="documents.length">
					<div v-for="n, i in documents" :key="i" class="bg-white rounded-md shadow-sm px-4 border-b py-3 flex justify-between items-center">
						<div class="flex items-center gap-x-3 gap-y-2">
							<img src="@/assets/icons/source/pdf_download.svg" alt="">
							<div>
								<p class="text-sm">
									{{ n.document_type === 'driver_license' ? 'Driver\'s license' : n.document_type }}
								</p>
								<p class="text-xs text-shuttlersGreen">
									Submitted
								</p>
							</div>
						</div>
						<a :href="n.files[0]" target="_blank" class="text-sm underline text-indigo-500">
							View Document
						</a>
					</div>
				</template>
				<div v-else class="p-4 px-6 flex items-center gap-4 bg-white rounded-md shadow-sm">
					<img src="@/assets/icons/source/pdf_download.svg" alt="">
					<p class="text-sm text-grey5 font-medium">
						No documents available
					</p>
				</div>
			</div>
		</div>
		<Skeleton v-else height="200px" radius="10px" />
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
				<ChartsBarChart class="!h-72" :loading="loadingDriverGraph" :data="getYearlyBarChartData(graphData)" />
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useDriverIdDetails, useDriverGraph, useAssignBus, useControlTrips, useSuspendDriver, useDeleteDriver } from '@/composables/modules/drivers'
import { getYearlyBarChartData } from '@/composables/utils/charts'
import { useDriverModal } from '@/composables/core/modals'
import { useAllVehicles, useEditVehicles } from '@/composables/modules/fleets/vehicles/index'

const { getDriverById, loading, selectedDriver, documents } = useDriverIdDetails()
const { loading: loadingDriverGraph, getGraph, graphData } = useDriverGraph()
const { selectedVehicle } = useAssignBus()
const { vehicles, getVehicles } = useAllVehicles()
const { openEditBus } = useEditVehicles()
const { initControlTrips } = useControlTrips()
const { initSuspension } = useSuspendDriver()
const { initDelete } = useDeleteDriver()
const id = useRoute().params.id as string

getDriverById(id)
getGraph(id)

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})

const dropdownChildren = computed(() => [
	{ name: 'Edit Driver', func: () => { useRouter().push(`/drivers/edit/${id}`) } },
	{ name: 'Assign Bus', func: () => openAssignBus() },
	{ name: 'Edit Bus', func: () => openEditBus(selectedDriver.value?.vehicle) },
	{ name: 'Assign/Unassign Route', func: () => useDriverModal().openAssignRoute() },
	{ name: 'Start or Stop Trip', func: () => initControlTrips() },
	{ name: 'Change Password', func: () => useDriverModal().openChangeDriverPassword() },
	{ name: 'Add Profile Picture', func: () => useDriverModal().openChangeDriverPicture() },
	{ name: `${selectedDriver.value.active === '1' ? 'Suspend' : 'Unsuspend'} Driver`, func: () => initSuspension(selectedDriver.value), class: '!text-red' },
	{ name: 'Delete Driver', func: () => initDelete(), class: '!text-red' }
])

const openAssignBus = () => {
	if (selectedDriver.value?.vehicle?.id) selectedVehicle.value = selectedDriver.value.vehicle
	useDriverModal().openAssignBus()
}

if (!vehicles.value.length) getVehicles()
</script>
