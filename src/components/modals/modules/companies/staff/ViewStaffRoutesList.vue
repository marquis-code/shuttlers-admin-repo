<template>
	<Modal modal="$atts.modal" title="View Staff's Route" :no-close-btn="true" :is-medium-modal="true" class="text-center">
		<Table :loading="false" :headers="tableFields" :table-data="computedTableData" :has-options="true">
			<template #item="{ item }">
				<div v-if="item.route_code">
					<p>{{ item?.data?.route_code ?? 'N/A' }}</p>
				</div>
				<div v-if="item.pick_up">
					<RouteDescription :pickup="item?.data?.pick_up" :destination="item?.data?.drop_off" />
				</div>
				<div v-if="item.itinerary">
					<p>{{ item?.data?.itinerary ?? 'N/A' }}</p>
				</div>
				<div v-if="item.id">
					<button class="text-white bg-black px-4 py-3 rounded-md" @click="deleteStaffRoute(item.data)">
						Delete
					</button>
				</div>
			</template>
		</Table>
	</Modal>
</template>

<script setup lang="ts">
import { useDeleteStaffToRoute } from '@/composables/modules/staffs/removeStaffRoute'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { useAssignStaffToRoute } from '@/composables/modules/staffs/assignStaffToRoute'
const { selectedStaffPreferredRoutes } = useAssignStaffToRoute()
const { removeStaffRoute, loading, selectedRouteToDelete } = useDeleteStaffToRoute()

const tableFields = ref([
	{
		text: 'ROUTE CODE',
		value: 'route_code'
	},
	{
		text: 'Route',
		value: 'pick_up'
	},
	{
		text: 'ITINERARY',
		value: 'itinerary'
	},
	{
		text: 'ACTION',
		value: 'id'
	}
])

const computedTableData = computed(() =>
	selectedStaffPreferredRoutes.value.map((item) => {
		return {
			...item,
			route_code: item?.route?.route_code,
			pick_up: item?.route?.pickup,
			drop_off: item?.route?.destination,
			itinerary: item?.itinerary?.trip_time
		}
	})
)
const deleteStaffRoute = (data) => {
	useConfirmationModal().openAlert({
		title: 'Please Confirm ?',
		type: 'NORMAL',
		desc: 'Are you sure you want to remove this route.',
		loading,
		call_function: () => removeStaffRoute(data.id)
	})
}
</script>
