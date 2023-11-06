<template>
	<HeadersHeaderSlot :title="`${selectedAdmin?.fname} ${selectedAdmin?.lname}`" pre-title="Overview" :loading="Object.keys(selectedAdmin).length === 0">
		<template #tabs>
			<RouterTabs :tabs="pageTabs" />
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
import { useGetStaffs } from '@/composables/modules/staffs/fetch'
const { getStaffs, loading, staffsData } = useGetStaffs()
const id = useRoute().params.id as string
getStaffs()
const filteredStaff = ref({})
// const selectedAdmin = computed(() => {
// 	if (!loading.value) {
//         return staffsData.value.find((staff) => staff.id === Number(id))
//     }
// })
const selectedAdmin = ref({
    id: 88,
    fname: 'Susan',
    lname: 'Johnson',
    email: 'envkt@example.com'
})
onMounted(() => {
    if (!loading.value) {
        filteredStaff.value = staffsData.value.filter((staff) => staff.id === Number(id))
    }
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
