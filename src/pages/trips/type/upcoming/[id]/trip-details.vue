<template>
	<div>
		<div v-if="!loading" class="w-8/12 bg-white rounded-md shadow-sm p-3">
			<div class="py-2.5 border-b pb-2 px-3">
				<div class="font-medium">
					Trip Information
				</div>
			</div>
			<div class="flex justify-between items-center border-b py-4 px-3">
				<p class="text-gray-500 text-sm">
					Route
				</p>
				<p class="text-sm">
					<RouteDescription :pickup="selectedTrip?.route?.pickup" :destination="selectedTrip?.route?.destination"
						@click="viewRoute(selectedTrip?.route?.id)" />
				</p>
			</div>
			<div class="flex justify-between items-center border-b py-4 px-3">
				<p class="text-gray-500 text-sm">
					StarteselectedTrip
				</p>
				<p>
					{{ `${selectedTrip?.created_at} ${selectedTrip?.start_trip}` ?? 'N/A' }}
				</p>
			</div>
			<div class="flex justify-between items-center border-b py-4 px-3">
				<p class="text-gray-500 text-sm">
					Distance
				</p>
				<p class="text-sm">
					{{ selectedTrip?.route?.distance ?? 'N/A' }}
				</p>
			</div>
			<div class="flex justify-between items-center border-b py-4 px-3">
				<p class="text-gray-500 text-sm">
					Duration
				</p>
				<p class="text-sm">
					{{ selectedTrip?.route?.duration ?? 'N/A' }}
				</p>
			</div>
			<div class="flex justify-between items-center border-b py-4 px-3">
				<p class="text-gray-500 text-sm">
					Status
				</p>
				<p class="text-sm">
					{{ selectedTrip.route.status ? 'Active' : 'Inactive' }}
				</p>
			</div>
			<div class="flex justify-between items-center border-b py-4 px-3">
				<p class="text-gray-500 text-sm">
					Route Code
				</p>
				<p class="text-sm">
					{{
						selectedTrip?.route?.route_code ?? 'N/A'
					}}
				</p>
			</div>
			<div class="flex justify-between items-center border-b py-4 px-3">
				<p class="text-gray-500 text-sm">
					Driver
				</p>
				<div class="text-sm flex items-center gap-x-3">
					<Avatar :name="selectedTrip.driver.fname" bg="#B1C2D9" />
					<NuxtLink v-if="selectedTrip?.driver && selectedTrip?.driver.id" to="/">
						{{ driverName }}
					</NuxtLink>
				</div>
			</div>
			<div class="flex justify-between items-center border-b py-4 px-3">
				<p class="text-gray-500 text-sm">
					Driver's Phone
				</p>
				<p class="text-sm">
					<a
						v-if="selectedTrip?.driver && selectedTrip?.driver?.phone"
						:href="'tel:' + selectedTrip?.driver?.phone"
					>
						{{ selectedTrip?.driver.phone }}
					</a>
				</p>
			</div>
			<div class="flex justify-between items-center border-b py-4 px-3">
				<p class="text-gray-500 text-sm">
					Vehicle
				</p>
				<p class="text-sm">
					<NuxtLink
						class="sh-link" to="/"
					>
						<img
							v-if="vehicleData.tracking_id?.length"
							src="@/assets/img/gps.png"
							width="15"
							height="15"
							alt="Vehicle has tracker onboard"
						>

						{{ vehicleData?.brand }} {{ vehicleData?.name }} ({{
							vehicleData?.registration_number
						}})
					</NuxtLink>
				</p>
			</div>
			<div class="flex justify-between items-center py-4 px-3">
				<p class="text-gray-500 text-sm">
					Partner
				</p>
				<div>
					<NuxtLink
						class="sh-link"
						to="/"
					>
						<img
							v-if="vehicleData.tracking_id?.length"
							src="@/assets/img/gps.png"
							width="15"
							height="15"
							alt="Vehicle has tracker onboard"
						>

						{{ partnerData?.company_name }}
					</NuxtLink>
					<br>
					{{ partnerData?.company_phone }}
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useUpcomingTripIdDetails } from '@/composables/modules/trips/id'
const { selectedTrip, loading, getUpcomingTripById } = useUpcomingTripIdDetails()
const id = useRoute().params.id as string
console.log(id, 'id here')
getUpcomingTripById(id)
definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})
const router = useRouter()

const driverName = computed(() => {
      return selectedTrip.value?.driver
        ? `${selectedTrip.value?.driver?.fname || ''} ${selectedTrip?.value.driver?.lname || ''}`
        : 'N/A'
    })

	const vehicleData = computed(() => {
      return selectedTrip.value?.vehicle || selectedTrip.value?.driver?.vehicle
    })
    const partnerData = computed(() => {
      return selectedTrip.value?.vehicle?.partner || selectedTrip.value?.vehicle?.partner
    })

    const viewRoute = (id) => {
      if (id) { router.push({ name: 'ShowRouteDetails', params: { routeId: id } }) }
    }
</script>

<style scoped>

</style>
