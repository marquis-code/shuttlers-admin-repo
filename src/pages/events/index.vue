<template>
	<main class="">
		<Table :loading="loadingEvents" :headers="tableFields" :table-data="eventsList" :option="onRowClicked">
			<template #header>
				<TableFilter :filter-type="{showSearchBar:true, showDateRange: true}" @filter="onFilterUpdate" />
			</template>
			<template #item="{ item }">
				<div v-if="item.title">
					<span class="text-blue-600">{{ item.data.title }}</span>
				</div>
				<div v-if="item.firstName" class="">
					<p class="text-blue-600">
						{{ item.data.firstName }} {{ item.data.lastName }}
					</p>
					<p>{{ item.data.email }}</p>
				</div>
				<div v-if="item.location" class="flex items-center gap-x-2">
					<img src="@/assets/icons/source/location.svg" alt="">
					<p class="font-medium">
						{{ item.data.location }}
					</p>
				</div>
				<div v-if="item.returnTrip">
					<span>{{ item.data.returnTrip ? 'Return' : 'One-way' }}</span>
				</div>
				<span v-else-if="item.createdAt">
					{{ useDateFormat(item.data.createdAt, "MMMM d, YYYY").value }}
				</span>
				<div v-if="item.status">
					<span class="text-white text-sm px-2.5 py-2 rounded-lg font-medium"
						:class="[item.data.status === 'accepted' ? 'bg-green-500' : item.data.status === 'pending' ? 'bg-yellow-600' : item.data.status === 'cancelled' ? 'bg-gray-400' : item.data.status === 'queried' ? 'bg-blue-500' : item.data.status === 'rejected' ? 'bg-red' : '']"
					>
						{{ item.data.status }}
					</span>
				</div>
			</template>
			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loadingEvents" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>
<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useGetEvents } from '@/composables/modules/events/fetch'
import { useEventIdDetails } from '@/composables/modules/events/id'

const { getEventsList, loadingEvents, eventsList, onFilterUpdate, total, page, next, prev, moveTo } = useGetEvents()
getEventsList()
const onRowClicked = (data) => {
	const { selectedEvent } = useEventIdDetails()
	useRouter().push(`/events/${data.id}/event-info`)
	selectedEvent.value = data
}

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const tableFields = ref([
    {
        text: 'EVENT TITLE',
        value: 'title'
    },
    {
        text: 'CUSTOMER NAME',
        value: 'firstName'
    },
    {
        text: 'DATE',
        value: 'createdAt'
    },
    {
        text: 'EVENT LOCATION',
        value: 'location'
    },
    {
        text: 'TRIP TYPE',
        value: 'returnTrip'
    },
	{
        text: 'NO OF ATTENDEES',
        value: 'attendeesEstimate'
    },
    {
        text: 'STATUS',
        value: 'status'
    }
])

</script>

<style scoped></style>
