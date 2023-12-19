<template>
	<HeadersHeaderSlot :title="$route.fullPath.includes('create') ? 'Create Rental' : 'Rental Request'" pre-title="Overview">
		<template v-if="!$route.fullPath.includes('create')" #tabs>
			<RouterTabs :tabs="pageTabs" />
		</template>
		<template v-if="!$route.fullPath.includes('create')" #actions>
			<NuxtLink to="/trips/rental/create" class="p-2 rounded-md text-sm text-light bg-dark px-4">
				Create Rentals
			</NuxtLink>
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
