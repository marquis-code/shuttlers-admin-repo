<template>
	<HeadersHeaderSlot :title="headstate.title.value" :pre-title="headstate.preTitle.value">
		<template #tabs>
			<RouterTabs :tabs="pageTabs" />
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
import { usePageHeader } from '@/composables/utils/header'
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
</script>
