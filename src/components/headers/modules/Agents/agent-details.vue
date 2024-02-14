<template>
	<HeadersHeaderSlot :title="`${selectedUser.fname} ${selectedUser.lname}`" pre-title="Overview" :loading="Object.keys(selectedUser).length === 0">
		<template #tabs>
			<RouterTabs :tabs="pageTabs" />
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
import { useUserIdDetails } from '@/composables/modules/users/id'

const { selectedUser, getUserById } = useUserIdDetails()

if (Object.keys(selectedUser.value).length === 0) {
    const id = useRoute().params.id as string
getUserById(id)
}

const pageTabs = computed(() => [
    {
        name: 'Agents information',
        path: `/agents/${selectedUser.value.id}/agent-info`
    },
    {
        name: 'Passengers',
        path: `/agents/${selectedUser.value.id}/passengers`
    },
    {
        name: 'Agent routes',
        path: `/agents/${selectedUser.value.id}/agent-routes`
    }

])
</script>

<style scoped>

</style>
