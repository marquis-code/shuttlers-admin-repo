<template>
	<main class="flex flex-col gap-4">
		<ButtonGoBack url="/events" />
		<Skeleton v-if="loading" height="400px" radius="10px" />
		<div v-else class="flex flex-col gap-5 lg:flex-row">
			<div class="flex flex-col flex-grow gap-5 xl:max-w-[700px]">
				<div class="flex flex-col rounded-lg border">
					<h3 class="p-4 border-b text-dark font-medium">
						Event Information
					</h3>
					<div class="flex flex-col px-4">
						<div v-for="n,i in event_info" :key="i" class="flex gap-4 justify-between py-3"
							:class="[i === event_info.length-1 ? '' : 'border-b', (n.key === 'EVENT DATE' && n.value?.length > 2) ? 'flex-col' : 'flex-row items-center']"
						>
							<p class="text-sm text-grey4 shrink-0">
								{{ n.key }}
							</p>
							<template v-if="n.key === 'EVENT DATE'">
								<div class="flex items-center flex-wrap gap-2">
									<p v-for="date,idx in n.value" :key="idx" class="bg-[#00800021] p-2 rounded text-xs font-medium whitespace-nowrap">
										{{ moment(date).format('ll') }}
									</p>
								</div>
							</template>
							<div v-else-if="n.key === 'ONBOARDING LINK' && n?.value" class="flex items-center gap-2">
								<a target="_blank" :href="n.value" class="w-[200px] sm:w-[200px] md:w-[300px] truncate">
									{{ n.value }}
								</a>
								<ButtonCopyToClipboard :value="n.value" />
							</div>
							<p v-else class="text-sm text-dark font-medium text-right truncate">
								{{ n.value }}
							</p>
						</div>
					</div>
				</div>

				<div class="flex flex-col rounded-lg border">
					<h3 class="p-4 border-b text-dark font-medium">
						Customer Information
					</h3>
					<div class="flex flex-col px-4">
						<div v-for="n,i in customer_info" :key="i" class="flex items-center gap-4 justify-between py-3"
							:class="i === customer_info.length-1 ? '' : 'border-b'"
						>
							<p class="text-sm text-grey4 shrink-0">
								{{ n.key }}
							</p>
							<p class="text-sm text-dark font-medium text-right truncate">
								{{ n.value }}
							</p>
						</div>
					</div>
				</div>
			</div>
			<div class="flex flex-col gap-5 w-full lg:max-w-[400px] xl:max-w-[500px] shrink-0">
				<div class="border rounded-lg flex flex-col overflow-hidden">
					<img v-if="selectedEvent?.banner" :src="selectedEvent?.banner" class="w-full h-[200px] object-cover">
					<div v-else class="h-[200px] w-full bg-[#b9bcc8]" />
					<div class="p-4 md:p-6 flex flex-col gap-4">
						<h3 class="text-lg font-bold text-dark">
							{{ selectedEvent?.title || 'N/A' }}
						</h3>
						<p class="font-normal" v-html="selectedEvent?.description" />
					</div>
					<div class="border-t p-4 flex items-center justify-between gap-4">
						<p class="font-medium text-sm" :class="selectedEvent?.status === 'pending' ? 'text-yellow01' : selectedEvent?.status === 'accepted' ? 'text-green7' : 'text-red'">
							Request {{ selectedEvent?.status }}
						</p>
						<button v-if="selectedEvent.status === 'accepted'" class="btn !font-medium p-2 bg-purp7 flex gap-2 items-center text-light" @click="useNotifyEvent().initNotifyEvent('organizer')">
							<Icon name="bell" class="w-5" />
							<span>Notify Organizer</span>
						</button>
					</div>
				</div>

				<div v-if="selectedEvent.status === 'accepted'" class="flex flex-col rounded-lg border">
					<div class="flex items-center gap-4 justify-between p-4 border-b">
						<h3 class="text-dark font-medium">
							Assigned Routes
						</h3>
						<div class="flex items-center gap-2 text-light font-medium">
							<button class="py-1 px-2 bg-dark rounded-md" @click="useEventModal().openAssignRoutes()">
								Assign routes
							</button>
							<button v-if="event_routes?.length" class="py-1 p-2 bg-purp7 rounded-md" @click="initEditRoutes(event_routes)">
								Edit
							</button>
						</div>
					</div>
					<div class="flex flex-col p-4">
						<div v-if="event_routes?.length" class="flex flex-col gap-2">
							<p v-for="n in event_routes" :key="n.id" class="text-sm bg-grey9 text-dark rounded-md p-2">
								{{ n.routeCode }} - {{ n.pickup }}
							</p>
						</div>
						<p v-else class="text-dark font-medium text-center">
							No routes assigned
						</p>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import moment from 'moment'
import { useEventIdDetails, useAddRoutesToEvent, useNotifyEvent } from '@/composables/modules/events'
import { convertToCurrency } from '@/composables/utils/formatter'
import { useEventModal } from '@/composables/core/modals'

const { getEventById, loading, selectedEvent, getEventRoutes, event_routes } = useEventIdDetails()
const { initEditRoutes } = useAddRoutesToEvent()
getEventById()
getEventRoutes()

definePageMeta({
  layout: 'dashboard',
  middleware: ['is-authenticated']
})

function getAllDatesBetween(start:Date, end:Date) {
    const dates:Date[] = []
    const currentDate = new Date(start)

    while (currentDate <= end) {
        dates.push(new Date(currentDate))
        currentDate.setDate(currentDate.getDate() + 1)
    }
    return dates
}

const event_info = computed(() => {
	return [
		{ key: 'TITLE', value: selectedEvent.value?.title },
		{ key: 'LOCATION', value: selectedEvent.value?.location },
		{ key: 'WHO WILL BE PAYING', value: selectedEvent.value?.payment },
		{ key: 'TRIP TYPE', value: selectedEvent.value?.returnTrip ? 'Return' : 'One-way' },
		{ key: 'EVENT DATE', value: getAllDatesBetween(new Date(selectedEvent.value?.tripDate), new Date(selectedEvent.value?.returnDate)) },
		{ key: 'ESTIMATED NO. OF ATTENDEES', value: `~${selectedEvent.value?.attendeesEstimate}` },
		{ key: 'TYPE OF EVENT', value: selectedEvent.value?.type },
		{ key: 'ONBOARDING LINK', value: selectedEvent.value?.eventLink }
	]
})

const customer_info = computed(() => {
	return [
		{ key: 'FULL NAME', value: `${selectedEvent.value?.firstName} ${selectedEvent.value?.lastName}` },
		{ key: 'EMAIL ADDRESS', value: selectedEvent.value?.email },
		{ key: 'PHONE NUMBER', value: selectedEvent.value?.phone }
	]
})

</script>

<style scoped>
</style>
