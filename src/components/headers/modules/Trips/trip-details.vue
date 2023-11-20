<template>
	<HeadersHeaderSlot :title="headstate.title.value" :pre-title="headstate.preTitle.value" class="relative">
		<template #title>
			<StatusBadge :name="tripType" />
		</template>
		<template #tabs>
			<RouterTabs :tabs="pageTabs" />
			<ModulesTripsSearchCard :trip-type="tripType" />
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
import { usePageHeader } from '@/composables/utils/header'

const { headstate } = usePageHeader()

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

</script>
