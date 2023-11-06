<template>
	<HeadersHeaderSlot :title="`${selectedAdmin?.fname} ${selectedAdmin?.lname}`" pre-title="Overview" :loading="loadingStaffs">
		<template #tabs>
			<RouterTabs :tabs="pageTabs" />
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
import { useGetStaffs } from '@/composables/modules/staffs/fetch'

const { getStaffs, loading: loadingStaffs, staffsData } = useGetStaffs()
const id = useRoute().params.id as string
getStaffs()

const selectedAdmin = computed(() => {
	if (loadingStaffs.value) return
	return staffsData.value.find((staff) => staff.id === Number(id))
})

const pageTabs = computed(() => [
    {
        name: 'Staff Information',
        path: `/admin/${selectedAdmin.value.id}/info`
    },
    {
        name: 'Permissions',
        path: `/admin/${selectedAdmin.value.id}/permissions`
    }
])
</script>

<style scoped>

</style>
