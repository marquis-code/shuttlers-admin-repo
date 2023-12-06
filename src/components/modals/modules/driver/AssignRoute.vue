<template>
	<Modal
		modal="$atts.modal"
		title="Assign/Unassign route to driver"
	>
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
			<button type="submit" :disabled="loading || !route?.id"
				class="mt-[100px] text-sm bg-black p-[16px] text-white text-center w-full border-none outline-none rounded disabled:cursor-not-allowed disabled:bg-[#E0E6ED]"
			>
				{{ loading ? 'processing...' : `${assign ? 'Assign' : 'Unassign'} Route` }}
			</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useAssignRouteToDriver } from '@/composables/modules/drivers'

const { loading, route, assign, assignRoute, clearObj } = useAssignRouteToDriver()

onBeforeUnmount(() => clearObj())
</script>

<style scoped>
label{
	margin: 0;
}
</style>
