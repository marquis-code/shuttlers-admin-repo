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
        name: 'User Info',
        path: `/users/${selectedUser.value.id}/user-info`
    },
    {
        name: 'Rides',
        path: `/users/${selectedUser.value.id}/rides`
    },
    {
        name: 'Transactions',
        path: `/users/${selectedUser.value.id}/transactions`
    },
    {
        name: 'Active Bookings',
        path: `/users/${selectedUser.value.id}/active-bookings`
    },
    {
        name: 'Past Bookings',
        path: `/users/${selectedUser.value.id}/past-bookings`
    },
    {
        name: 'Cancelled Trips',
        path: `/users/${selectedUser.value.id}/cancelled-trips`
    },
    {
        name: 'Creditline Usages',
        path: `/users/${selectedUser.value.id}/credit-line-usage`
    }
])
</script>

<style scoped>

</style>
