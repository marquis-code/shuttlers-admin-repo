<template>
	<main class="">
		<Table :loading="loadingEventAttendees" :headers="tableFields" :table-data="eventAttendeesList" :option="onRowClicked">
			<template #header>
				<TableFilter :filter-type="{showSearchBar:true, showDateRange: true}" @filter="onFilterUpdate" />
			</template>
			<template #item="{ item }">
				<div v-if="item.user">
					<p class="font-weight-bold my-0" style="line-height: 1">
						<span>{{
							`${item.data.firstName} ${item.data.lastName}`
						}}</span>
					</p>
				</div>
				<div v-else-if="item.phoneNumber">
					{{ item.data.phoneNumber ? item.data.phoneNumber : 'N/A' }}
				</div>
				<div v-else-if="item.email">
					<span>	{{ item.data.email ?? 'N/A' }}</span>
					<div v-if="item.data.status === 'notified'" class="font-bold">
						Notified
					</div>
				</div>
				<div v-else-if="item.busStop">
					<p class="text my-0">
						{{ item.data.pickupLocation }}
					</p>
				</div>
				<div v-else-if="item.attendingDays">
					<div class="flex flex-wrap">
						<p
							v-for="(day, index) in getDatesInRange(
								`${item.data.tripDate}`,
								`${item.data.returnDate}`
							)"
							:key="index"
							class="text my-0 mx-1"
						>
							{{
								index ===
									getDatesInRange(`${item.data.tripDate}`, `${item.data.returnDate}`)
										.length -
									1
									? formatToWeekDay(day)
									: formatToWeekDay(day) + ','
							}}
						</p>
					</div>
				</div>
			</template>
			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loadingEventAttendees" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>
<script setup lang="ts">

import { useEventIdDetails } from '@/composables/modules/events/id'
import { useGetEventAttendees } from '@/composables/modules/events/attendees/fetch'
import { getDatesInRange, formatToWeekDay } from '@/composables/utils/old-helper'

const { selectedEvent } = useEventIdDetails()

const { getEventAttendeesList, loadingEventAttendees, eventAttendeesList, onFilterUpdate, total, page, next, prev, moveTo } = useGetEventAttendees()

watch(selectedEvent, (val) => {
	if (val.id) {
		getEventAttendeesList()
	}
}, { immediate: true })
const onRowClicked = (data) => {
	// useRouter().push(`/events/${data.id}/event-info`)
	// selectedEvent.value = data
}

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const tableFields = ref([
    {
        text: 'Attendee Name',
        value: 'user'
    },
    {
        text: 'Phone number',
        value: 'phoneNumber'
    },
    {
        text: 'Email',
        value: 'email'
    },
    {
        text: 'Nearest Bus stop',
        value: 'busStop'
    },
    {
        text: 'Program days',
        value: 'attendingDays'
    }
])

</script>

<style scoped></style>
