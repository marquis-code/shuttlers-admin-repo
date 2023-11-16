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
import { useGetUpcomingTripsList } from '@/composables/modules/trips/fetch'
import { useUpcomingTripIdDetails } from '@/composables/modules/trips/id'

const { headstate } = usePageHeader()

const id = useRoute().params.id
const tripType = (useRoute().name as string).split('-')[2]

const pageTabs = computed(() => [
    {
        name: 'Details',
        path: `/trips/type/${tripType}/${id}/trip-details`
    },
    {
        name: 'Passengers',
        path: `/trips/type/${tripType}/${id}/Passengers`
	},
    {
        name: 'Ratings',
        path: `/trips/type/${tripType}/${id}/Ratings`
	}

])

const debounceTimer = ref<number>()

onUnmounted(() => {
	clearTimeout(debounceTimer.value)
})

</script>
