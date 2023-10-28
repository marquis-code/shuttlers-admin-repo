<template>
	<div class="lg:flex lg:gap-1-10 items-start space-y-10 lg:space-y-0">
		<div v-if="!loading" class="w-6/12 space-y-10">
			<div class="bg-white rounded-md shadow-sm p-3">
				<div
					class="flex justify-between items-center py-2.5 border-b pb-2 px-3"
				>
					<div class="font-medium">
						Event Information
					</div>
				</div>
				<div
					v-for="(value, key, index) in eventInformation"
					:key="index"
					:class="[
						key === 'EVENT DATE'
							? 'flex-col'
							: 'flex-row justify-between items-center',
					]"
					class="flex border-b py-4 px-3"
				>
					<p class="text-gray-500 text-sm">
						{{ key }}
					</p>
					<div v-if="key === 'EVENT DATE'" class="text-sm">
						<div class="grid grid-cols-5 gap-4 rounded-md mt-3">
							<p
								v-for="(itm, index) in value"
								:key="index"
								class="text-xs text-center py-2 rounded-md bg-green08 text-white"
							>
								{{ itm }}
							</p>
						</div>
					</div>
					<p v-else class="text-sm">
						{{ value }}
					</p>
				</div>
			</div>

			<div class="bg-white rounded-md shadow-sm p-3">
				<div class="py-2.5 border-b pb-2 px-3">
					<div class="font-medium">
						Customer Information
					</div>
				</div>
				<div
					v-for="(value, key, index) in customerInformation"
					:key="index"
					class="flex justify-between items-center border-b py-4 px-3"
				>
					<p class="text-gray-500 text-sm">
						{{ key }}
					</p>
					<p class="text-sm">
						{{ value }}
					</p>
				</div>
			</div>
		</div>
		<div class="w-4/12 space-y-10 rounded-md">
			<div class="border-b bg-white rounded-md shadow-sm">
				<div class="py-10 pl-10">
					<h1 class="font-bold text-2xl">
						Testing
					</h1>
					<p class="text-sm">
						This is testing
					</p>
				</div>
				<div class="border-t py-6">
					<p class="text-yellow-500 pl-10 text-sm">
						Request pending
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useEventIdDetails } from '@/composables/modules/events/id'
import { convertToCurrency } from '@/composables/utils/formatter'

const { getEventById, loading, selectedEvent } = useEventIdDetails()
const id = useRoute().params.id as string
getEventById(id)

definePageMeta({
  layout: 'dashboard',
  middleware: ['is-authenticated']
})

const eventInformation = computed(() => {
  return {
    TITLE: selectedEvent?.value?.title,
    LOCATION: selectedEvent?.value?.location,
    'WHO WILL BE PAYING': selectedEvent?.value?.payment,
    'TRIP TYPE': selectedEvent?.value?.returnTrip
      ? 'Return Trip'
      : 'One Way Trip',
    'EVENT DATE': [
      '2023-11-06',
      '2023-11-06',
      '2023-11-06',
      '2023-11-06',
      '2023-11-06',
      '2023-11-06',
      '2023-11-06',
      '2023-11-06',
      '2023-11-06',
      '2023-11-06'
    ],
    'ESTIMATED NO. OF ATTENDEES': `~${selectedEvent?.value?.attendeesEstimate}`,
    'TYPE OF EVENT': selectedEvent?.value?.type
  }
})

const customerInformation = computed(() => {
  return {
    'FULL NAME': `${selectedEvent?.value?.firstName} ${selectedEvent?.value?.lastName}` ?? 'N/A',
    'EMAIL ADDRESS': selectedEvent?.value?.email ?? 'N/A',
    'PHONE NUMBER': selectedEvent?.value?.phone ?? 'N/A'
  }
})
</script>

<style scoped>
</style>
