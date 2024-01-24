<template>
	<HeadersHeaderSlot :title="formatPageTitle" :pre-title="headstate.preTitle.value" class="relative">
		<template #title>
			<StatusBadge :name="tripType" />
		</template>
		<template #actions>
			<div v-if="tripType !== 'completed'">
				<ButtonDropdown :children="dropdownChildren" :data="selectedTrip" bg-color="#000" />
			</div>
			<button v-if="tripType === 'completed' && user.role === 'super_admin'" class="bg-dark text-light text-sm p-2 rounded-md px-4" @click="initTransfer(selectedTrip)">
				Transfer Trip
			</button>
		</template>

		<template #tabs>
			<RouterTabs :tabs="pageTabs" />
			<ModulesTripsSearchCard :trip-type="tripType" />
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
import moment from 'moment'
import { usePageHeader } from '@/composables/utils/header'
import { useTripOptions } from '@/composables/modules/trips/options'
import { dayIsInThePast } from '@/composables/utils/formatter'
import { useUpcomingTripIdDetails } from '@/composables/modules/trips/id'
import { useCreateIssues } from '@/composables/modules/trips/issues'
import { useTransferTrip } from '@/composables/modules/trips/transfer'
import { useUser } from '@/composables/auth/user'
import { isProdEnv } from '@/composables/utils/system'

const { user } = useUser()
const { initTransfer } = useTransferTrip()
const { selectedTrip } = useUpcomingTripIdDetails()
const { initLogIssues } = useCreateIssues()
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
	},
    {
        name: 'Issues',
        path: `/trips/type/${tripType.value}/${id}/issues`
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

const setDataForLoggingIssue = (data: Record<string, any>) => {
    const trip_data = {
        ...data,
        trip_start_time: data?.trip_start_time,
        route_code: data.route?.route_code
    }
    initLogIssues(trip_data)
}

const dropdownChildren = computed(() => {
    const dropdownOptions = [
        { name: 'Log Issue', func: (data) => setDataForLoggingIssue(data), hide: isProdEnv.value }
    ] as Record<string, any>[]
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
        dropdownOptions.push(...[{ name: 'End Trip', func: (data) => initializeEndTrips(data), class: '!text-red' }, { name: 'Update Trip', func: (data) => initializeTripUpdate(data) }])
    }

    if (tripType.value === 'completed') {
        dropdownOptions.push(...[{ name: 'Transfer Trip', func: (data) => initTransfer(data) }])
    }
    return dropdownOptions
})

// const formatPageTitle = (tripTitle: string) => {
//     const result = {
//         completed: `${selectedTrip.value.route.route_code} ⚫ ${moment.utc(selectedTrip.value.start_trip).format('h:mm A')} ⚫ ${selectedTrip.value.driver.lname} ${selectedTrip.value.driver.fname} ⚫ ${moment.utc(selectedTrip.value.start_trip).format('Do MMMM, YYYY')}`,
//         active: `${selectedTrip.value.route.route_code} ⚫ ${moment.utc(selectedTrip.value.start_trip).format('h:mm A')} ⚫ ${selectedTrip.value.driver.lname} ${selectedTrip.value.driver.fname} ⚫ ${moment.utc(selectedTrip.value.start_trip).format('Do MMMM, YYYY')}`,
//         upcoming: `${selectedTrip.value.route.route_code} ⚫ ${moment.utc(selectedTrip.value.start_trip).format('h:mm A')} ⚫ ${selectedTrip.value.driver.lname} ${selectedTrip.value.driver.fname} ⚫ ${moment.utc(selectedTrip.value.start_trip).format('Do MMMM, YYYY')}`
//     }

//     return result[tripTitle]
// }

const formatPageTitle = computed(() => {
    return `${selectedTrip.value.route.route_code} ⚫ ${moment.utc(selectedTrip.value.start_trip).format('h:mm A')} ⚫ ${selectedTrip.value.driver.lname} ${selectedTrip.value.driver.fname} ⚫ ${moment.utc(selectedTrip.value.start_trip).format('Do MMMM, YYYY')}`
})

</script>
