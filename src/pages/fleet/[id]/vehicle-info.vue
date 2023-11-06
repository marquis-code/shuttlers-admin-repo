<template>
	<div>
		<div class="lg:flex lg:gap-x-10 justify-center items-start space-y-10 lg:space-y-0">
			<div class="md:w-6/12 bg-white rounded-md shadow-sm p-3">
				<div class="flex justify-between items-center py-2.5 border-b pb-2 px-3">
					<div class="font-medium">
						Vehicle Information
					</div>
					<ButtonDropdown :children="dropdownChildren" :data="selectedVehicle" />
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						Export QR code
					</p>
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						BRAND
					</p>
					<p class="text-sm">
						{{ `${selectedVehicle?.brand}` ?? 'N/A' }}
					</p>
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						NAME
					</p>
					<p>
						{{ `${selectedVehicle?.name}` ?? 'N/A' }}
					</p>
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						PLATE NUMBER
					</p>
					<p class="text-sm">
						{{ selectedVehicle?.registration_number ?? 'N/A' }}
					</p>
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						CAPACITY
					</p>
					<p class="text-sm">
						{{ selectedVehicle?.seats ?? 'N/A' }}
					</p>
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						TYPE
					</p>
					<p class="text-sm">
						{{ selectedVehicle?.type ?? 'N/A' }}
					</p>
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						AMENITIES
					</p>
					<div v-if="selectedVehicle?.amenities" class="text-sm">
						<p v-for="(itm, idx) in selectedVehicle?.amenities" :key="idx">
							{{ itm.name }}
						</p>
					</div>
					<span v-else>N/A</span>
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						DRIVER
					</p>
					<div class="text-sm">
						<span>{{ selectedVehicle?.driver ? `${selectedVehicle?.driver.fname} ${selectedVehicle?.driver.lname}`: 'Unassigned' }}</span>
					</div>
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						COMMISSIONED SINCE
					</p>
					<p class="text-sm">
						{{ useDateFormat(selectedVehicle.created_at, "MMMM d, YYYY").value }}
					</p>
				</div>
				<div class="flex justify-between items-center py-4 px-3">
					<p class="text-gray-500 text-sm">
						PARTNER
					</p>
					<div>
						<div v-if="selectedVehicle.partner" class="col-auto">
							<NuxtLink to="" class="sh-page-link">
								{{ selectedVehicle?.partner?.company_name ?? 'N/A' }}
							</NuxtLink>
						</div>
						<div v-else class="col-auto">
							<span class="text-muted">No partner assigned</span>
						</div>
					</div>
				</div>
			</div>
			<div class="md:w-6/12 bg-white rounded-md shadow-sm">
				<div class="px-6 border-b py-3">
					<p class="font-medium">
						Vehicle Earnings
					</p>
				</div>

				<div class="flex justify-center gap-y-2 items-center flex-col py-10">
					<p v-if="!loadingEarnings" class="text-4xl font-semibold">
						{{ formattedEarnings }}
					</p>
					<Skeleton v-else height="30px" width="100px" />
					<p class="text-gray-400 text-xs">
						ACCOUNT BALANCE
					</p>
				</div>

				<div class="flex justify-between items-center border-b py-4 px-6">
					<p class="text-gray-500 text-xs">
						Total no. of trips
					</p>
					<p v-if="!loadingTripHistory" class="text-xs">
						{{ fleeTripHistory?.length }}
					</p>
					<Skeleton v-else height="30px" width="100px" />
				</div>
			</div>
		</div>
		<!-- <Skeleton v-else height="600px" /> -->
	</div>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useVehicleIdDetails, useGetVehicleEarnings } from '@/composables/modules/fleets/id'
import { useGetFleetTripHistory } from '@/composables/modules/fleets/id'
const { getFleetsTripHistory, loadingTripHistory, fleeTripHistory } = useGetFleetTripHistory()
const { selectedVehicle, loading, getVehicleById } = useVehicleIdDetails()
const { getVehicleEarnings, loadingEarnings, fleetEarnings } = useGetVehicleEarnings()
getFleetsTripHistory()
const id = useRoute().params.id as string
getVehicleById(id)
getVehicleEarnings()

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})

const dropdownChildren = computed(() => [
	{ name: 'Change Driver', func: () => { } },
	{ name: 'Update Tracking Details', func: () => { } },
	{ name: 'Edit Bus', func: () => { } },
	{ name: 'Export QR Code', func: () => { } },
	{ name: 'De-Commission Vehicle', func: () => { }, class: '!text-red' }
])

const vehicleEarning = computed(() => {
			return fleetEarnings.value.reduce((accumulator, currentValue) => {
				return accumulator + currentValue.finalPartnersRevenue
			}, 0)
		})

const formattedEarnings = computed(() => {
      return !vehicleEarning.value
        ? '₦0.00'
        : `₦${parseFloat(vehicleEarning.value)
            .toFixed(2)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`
    })

const openDropdown = ref(false)
</script>

<style scoped>

</style>
