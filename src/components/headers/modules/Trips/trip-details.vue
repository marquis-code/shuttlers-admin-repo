<template>
	<HeadersHeaderSlot :title="headstate.title.value" :pre-title="headstate.preTitle.value" class="relative">
		<template #title>
			<StatusBadge :name="tripType" />
		</template>
		<template #actions>
			<div v-if="tripType !== 'completed'">
				<ButtonDropdown :children="dropdownChildren" :data="selectedTrip" bg-color="#000" />
			</div>
		</template>

		<template #tabs>
			<RouterTabs :tabs="pageTabs" />
			<ModulesTripsSearchCard :trip-type="tripType" />
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
import { usePageHeader } from '@/composables/utils/header'
import { useTripOptions } from '@/composables/modules/trips/options'
import { dayIsInThePast } from '@/composables/utils/formatter'
import { useUpcomingTripIdDetails } from '@/composables/modules/trips/id'

const { selectedTrip } = useUpcomingTripIdDetails()

const { headstate } = usePageHeader()
const { initializeStartTrips, initializeCancelTrips, initializeCompleteTrips, initializeTripUpdate, initializeEndTrips } = useTripOptions()

const id = useRoute().params.id
const tripType = computed(() => (useRoute().name as string).split('-')[2])

const pageTabs = computed(() => {
	const headerArray = [
    {
        name: 'Details',
        path: `/trips/type/${tripType.value}/${id}/trip-details`
    },
    {
        name: 'Passengers',
        path: `/trips/type/${tripType.value}/${id}/Passengers`
	},
    {
        name: 'Ratings',
        path: `/trips/type/${tripType.value}/${id}/Ratings`
	}
]

if (tripType.value === 'completed') {
	headerArray.push({
        name: 'Trip Financials',
        path: `/trips/type/${tripType.value}/${id}/financials`
    })
}
return headerArray
})

const dropdownChildren = computed(() => {
 const dropdownOptions = [] as Record<string, any>[]
    const upcomingDropdownOptions = [
         { name: 'Start Trip', func: (data) => initializeStartTrips(data) },
    { name: 'Update Trip', func: (data) => initializeTripUpdate(data) },
    { name: 'Cancel Trip', func: (data) => initializeCancelTrips(data), class: '!text-red' }
    ]

    if (tripType.value === 'upcoming') {
        dropdownOptions.push(...upcomingDropdownOptions)
        if (dayIsInThePast(selectedTrip.value.trip_date)) {
        dropdownOptions.push({ name: 'Complete Trip', func: (data) => initializeCompleteTrips(data) })
        }
    }

    if (tripType.value === 'active') {
        dropdownOptions.push({ name: 'End Trip', func: (data) => initializeEndTrips(data), class: '!text-red' })
    }
    return dropdownOptions
})

</script>
