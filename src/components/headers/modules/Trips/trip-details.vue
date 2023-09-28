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
const pageTabs = [
    {
        name: 'Details',
        path: '/trips/type/upcoming/4900005/trip-details'
    }

]
</script>
