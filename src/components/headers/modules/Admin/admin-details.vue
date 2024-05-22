<template>
	<HeadersHeaderSlot :title="`${selectedAdmin?.fname} ${selectedAdmin?.lname}`" pre-title="Overview" :loading="loading">
		<template #tabs>
			<RouterTabs :tabs="pageTabs" />
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
import { useAdminIdDetails } from '@/composables/modules/staffs/id'

const { selectedAdmin, loading, getAdminById } = useAdminIdDetails()

if (!selectedAdmin.value?.id) {
    const id = useRoute().params.id as string
    selectedAdmin.value.id = id
    getAdminById(id)
}

const pageTabs = computed(() => [
    {
        name: 'Staff Information',
        path: `/admin/${selectedAdmin.value?.id}/info`
    },
    {
        name: 'Permissions',
        path: `/admin/${selectedAdmin.value?.id}/permissions`
    }
])
</script>

<style scoped>

</style>
