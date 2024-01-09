<template>
	<Skeleton v-if="loadingRouteBookings" height="300px" />
	<div v-else class="rounded-md bg-white shadow-md">
		<p class="border-b text-gray-500 font-medium text-sm p-4">
			Passengers
		</p>
		<div class="p-3 space-y-6">
			<div class="">
				<label for="">Filter By Company</label>
				<InputMultiSelectUsers />
			</div>
			<div>
				<button class="bg-black text-white text-xs px-3 py-2 rounded-md">
					Apply Filter
				</button>
			</div>
			<div>
				<Table :loading="loadingRouteBookings" :headers="tableFields" :table-data="routeBookings" :has-index="true">
					<template #item="{ item }">
						<p v-if="item.route_day" class="">
							{{ moment(item.data.date).format('ddd') }}
						</p>
					</template>
				</Table>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import moment from 'moment'
import { useRouteBookingsById } from '@/composables/modules/routes/id'

const id = useRoute().params.id as string
const { loadingRouteBookings, getRouteBookingsById, routeBookings, corporateId } = useRouteBookingsById()
const tableFields = [
	{ text: 'Route day', value: 'route_day' },
	{ text: 'Total Passengers', value: 'passengers' },
	{ text: 'Date', value: 'date' }
]

getRouteBookingsById(id)
</script>
