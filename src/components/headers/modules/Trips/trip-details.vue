<template>
	<HeadersHeaderSlot :title="formatPageTitle" :pre-title="headstate.preTitle.value" :loading="Object.keys(selectedTrip).length === 0" class="relative">
		<template #title>
			<StatusBadge :name="tripType" />
		</template>
		<template v-if="tripType !== 'cancelled'" #actions>
			<div>
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
import moment from 'moment'
import { usePageHeader } from '@/composables/utils/header'
import { useTripOptions } from '@/composables/modules/trips/options'
import { dayIsInThePast } from '@/composables/utils/formatter'
import { useUpcomingTripIdDetails } from '@/composables/modules/trips/id'
import { useCreateIssues } from '@/composables/modules/trips/issues'
import { useTransferTrip } from '@/composables/modules/trips/transfer'
import { useUser } from '@/composables/auth/user'
import { isProdEnv } from '@/composables/utils/system'
import { useCancelTrip } from '@/composables/modules/trips/cancel'

const { user } = useUser()
const { initTransfer } = useTransferTrip()
const { selectedTrip } = useUpcomingTripIdDetails()
const { initLogIssues } = useCreateIssues()
const { headstate } = usePageHeader()
const { initCancelTrip } = useCancelTrip()
const { initializeStartTrips, initializeCancelTrips, initializeCompleteTrips, initializeTripUpdate, initializeEndTrips } = useTripOptions()
const id = useRoute().params.id
const tripType = computed(() => (useRoute().name as string).split('-')[2])

const pageTabs = computed(() => {
	let headerArray = [
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

if (tripType.value === 'cancelled') {
	headerArray = headerArray.filter((el) => el.name === 'Details' || el.name === 'Passengers')
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
        { name: 'Log Issue', func: (data) => setDataForLoggingIssue(data), hide: isProdEnv.value },
        { name: 'Transfer trip', func: (data) => initTransfer([data]), hide: tripType.value !== 'completed' || user.value.role !== 'super_admin' },
        { name: 'Cancel trip', func: (data) => initCancelTrip(data), hide: tripType.value !== 'completed' || user.value.role !== 'super_admin' }
    ] as Record<string, any>[]
    const upcomingDropdownOptions = [
        { name: 'Start Trip', func: (data) => initializeStartTrips(data) },
        { name: 'Update Trip', func: (data) => initializeTripUpdate(data, 'upcoming') },
        { name: 'Cancel Trip', func: (data) => initializeCancelTrips(data), class: '!text-red' }
    ]

    if (tripType.value === 'upcoming') {
        dropdownOptions.push(...upcomingDropdownOptions)
        if (dayIsInThePast(selectedTrip.value.trip_date)) {
            dropdownOptions.push({ name: 'Complete Trip', func: (data) => initializeCompleteTrips(data) })
        }
    }

    if (tripType.value === 'active') {
        dropdownOptions.push(...[{ name: 'End Trip', func: (data) => initializeEndTrips(data), class: '!text-red' }, { name: 'Update Trip', func: (data) => initializeTripUpdate(data, 'active') }])
    }

    return dropdownOptions
})

const formatPageTitle = computed(() => {
    return `${selectedTrip.value?.route?.route_code} ⚫ ${moment.utc(selectedTrip?.value?.trip_date_time).format('h:mm A') ?? moment.utc(selectedTrip?.value?.start_trip).format('h:mm A')} ⚫ ${selectedTrip.value?.driver?.lname} ${selectedTrip.value?.driver?.fname} ⚫ ${moment.utc(selectedTrip?.value?.trip_date_time).format('Do MMMM, YYYY') ?? moment.utc(selectedTrip?.value?.start_trip).format('Do MMMM, YYYY')}`
})

</script>
