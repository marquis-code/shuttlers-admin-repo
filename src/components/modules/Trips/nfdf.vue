<template>
	<div>
		<div class="w-8/12 bg-white rounded-md shadow-sm p-3">
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
					{{ selectedTrip?.route?.status ? 'Active' : 'Inactive' }}
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
							v-if="vehicleData?.tracking_id?.length"
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
							v-if="vehicleData?.tracking_id?.length"
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
const props = defineProps({
    selectedTrip: {
        type: Object,
        default: () => {},
        required: true
    },
    loading: {
        type: Boolean,
        default: false,
        required: false
    }
})

const router = useRouter()
const driverName = computed(() => {
      return props.selectedTrip.value?.driver
        ? `${props.selectedTrip.value?.driver?.fname || ''} ${props.selectedTrip?.value.driver?.lname || ''}`
        : 'N/A'
    })

	const vehicleData = computed(() => {
      return props.selectedTrip.value?.vehicle || props.selectedTrip.value?.driver?.vehicle
    })
    const partnerData = computed(() => {
      return props.selectedTrip.value?.vehicle?.partner || props.selectedTrip.value?.vehicle?.partner
    })

    const viewRoute = (id) => {
      if (id) { router.push({ name: 'ShowRouteDetails', params: { routeId: id } }) }
    }
</script>

<style scoped>

</style>
