<template>
	<HeadersHeaderSlot title="Rental Request" pre-title="Overview">
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
        name: 'Rental Request',
        path: '/trips/rental'
    },
    {
        name: 'Upcoming Rental',
        path: '/trips/rental/upcoming'
	}

])
</script>
