<template>
	<HeadersHeaderSlot :title="`${selectedDriver.fname} ${selectedDriver.lname}`" pre-title="Overview" :loading="Object.keys(selectedDriver).length === 0">
		<template #tabs>
			<RouterTabs :tabs="pageTabs" />
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
import { useDriverIdDetails } from '@/composables/modules/drivers/id'

const { selectedDriver, getDriverById } = useDriverIdDetails()

if (Object.keys(selectedDriver.value).length === 0) {
    const id = useRoute().params.id as string
getDriverById(id)
}

const pageTabs = computed(() => [
    {
        name: 'Driver Info',
        path: `/drivers/${selectedDriver.value.id}/driver-info`
    },
    {
        name: 'Customer Ratings',
        path: `/drivers/${selectedDriver.value.id}/customer-rating`
    }
])
</script>

<style scoped>

</style>
