<template>
	<div class="card">
		<div v-for="(itm, index) in bookingInformationDetails" :key="index"
			class="flex justify-between items-center py-4 border-b last:border-none">
			<div class="text-sm">
				{{ itm.name }}
			</div>
			<div class="text-sm">
				{{ itm.value }}
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useRouteIdDetails, useRoutePaymentOptionsById, useTripStartTimeById, useRoutePassengersById, useRouteDriversById } from '@/composables/modules/routes/id'
const { selectedRoute, loading, getRouteById } = useRouteIdDetails()
const bookingInformationDetails = computed(() => {
	return [
		{ name: 'Who pays for booking?', value: selectedRoute?.value?.payer || 'Not Available', class: 'text-gray-600', func: () => { } },
		{ name: 'When is payment happening?', value: selectedRoute?.value?.payment_mode || 'Not Available', class: 'text-gray-600', func: () => { } },
		{ name: 'Who owns this route?', value: selectedRoute?.value.owner_type || 'Not Available', class: 'text-gray-600', func: () => { } }
	]
})
</script>
