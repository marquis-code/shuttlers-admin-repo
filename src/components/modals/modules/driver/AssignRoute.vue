<template>
	<Modal modal="$atts.modal" title="Assign/Unassign route to driver">
		<form class="flex flex-col gap-4 w-full" @submit.prevent="assignRoute">
			<select v-model="assign" :disabled="loading" class="input-field">
				<option :value="true">
					Assign route
				</option>
				<option :value="false">
					Unassign route
				</option>
			</select>
			<RouteSelector @selected="(val) => route = val" />
			<div v-if="selectedDriver.routes">
				<div v-for="route in selectedDriver.routes" :key="route.id" class="flex items-center justify-between">
					<p class="text-gray-800 rounded-md px-3 py-2.5">
						{{ route.route_code }}
					</p>
					<button type="button" class="bg-gray-500 text-white px-3 rounded-sm py-2 text-sm"
						@click="unassignRoute(route.id)">
						Unassign
					</button>
				</div>
			</div>
			<button type="submit" :disabled="loading || !route?.id"
				class="mt-[100px] text-sm bg-black p-[16px] text-white text-center w-full border-none outline-none rounded disabled:cursor-not-allowed disabled:bg-[#E0E6ED]">
				{{ loading ? 'processing...' : `${assign ? 'Assign' : 'Unassign'} Route` }}
			</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useAssignRouteToDriver } from '@/composables/modules/drivers'
import { useUnAssignRouteToDriver } from '@/composables/modules/drivers/unassign_route'

const { loading, route, assign, assignRoute, clearObj, selectedDriver } = useAssignRouteToDriver()
const { unassignRoute } = useUnAssignRouteToDriver()
onBeforeUnmount(() => clearObj())
</script>

<style scoped>
label {
	margin: 0;
}
</style>
