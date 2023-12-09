<template>
	<Modal
		modal="$atts.modal"
		title="Start/End trip"
	>
		<form class="flex flex-col gap-4 w-full" @submit.prevent="controlTrips">
			<select v-model="start" :disabled="loading" class="input-field">
				<option :value="true">
					Start trip
				</option>
				<option :value="false">
					End trip
				</option>
			</select>
			<template v-if="start">
				<select v-if="driver_routes.length" v-model="route" :disabled="loading" class="input-field">
					<option v-for="n in driver_routes" :key="n.id" :value="n" class="!max-w-[500px]">
						{{ n.pickup }} to {{ n.destination }}
					</option>
				</select>
				<p v-else class="text-sm text-center text-dark">
					No routes for this driver
				</p>
			</template>
			<template v-else>
				<select v-if="active_trips.length" v-model="trip" :disabled="loading" class="input-field">
					<option v-for="n in active_trips" :key="n.id" :value="n">
						{{ n.pickup }} to {{ n.destination }}
					</option>
				</select>
				<p v-else class="text-sm text-center text-dark">
					No active trips for this driver
				</p>
			</template>
			<button type="submit" :disabled="loading || (start && !route?.id) || (!start && !trip?.id)"
				class="mt-10 text-sm bg-black p-[16px] text-white text-center w-full border-none outline-none rounded disabled:cursor-not-allowed disabled:bg-[#E0E6ED]"
			>
				{{ loading ? 'processing...' : `${start ? 'Start' : 'End'} trip` }}
			</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useControlTrips } from '@/composables/modules/drivers'

const { loading, start, driver_routes, route, trip, clearObj, controlTrips, active_trips, getActiveTrips, getDriverRoutes } = useControlTrips()

getActiveTrips()
getDriverRoutes()
onBeforeUnmount(() => clearObj())
</script>

<style scoped>
label{
	margin: 0;
}
</style>
