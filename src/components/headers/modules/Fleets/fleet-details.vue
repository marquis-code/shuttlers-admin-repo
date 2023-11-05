<template>
	<HeadersHeaderSlot :title="`${selectedVehicle.brand} ${selectedVehicle.name}`" pre-title="Overview" :loading="Object.keys(selectedVehicle).length === 0">
		<template #tabs>
			<RouterTabs :tabs="pageTabs" />
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
import { useVehicleIdDetails } from '@/composables/modules/fleets/id'

const { selectedVehicle, getVehicleById } = useVehicleIdDetails()

if (Object.keys(selectedVehicle.value).length === 0) {
    const id = useRoute().params.id as string
getVehicleById(id)
}

const pageTabs = computed(() => [
    {
        name: 'Vehicle Overview',
        path: `/fleet/${selectedVehicle.value.id}/vehicle-info`
    },
    {
        name: 'Vehicle Documents',
        path: `/fleet/${selectedVehicle.value.id}/vehicle-documents`
    },
    {
        name: 'Trip History',
        path: `/fleet/${selectedVehicle.value.id}/trips`
    },
    {
        name: 'Customer Ratings',
        path: `/fleet/${selectedVehicle.value.id}/customer-ratings`
    }
])
</script>

<style scoped>

</style>
