<template>
	<HeadersHeaderSlot title="Tiffany Young" pre-title="Overview">
		<template #tabs>
			<RouterTabs :tabs="pageTabs" />
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
const pageTabs = [
    {
        name: 'User Info',
        path: '/users/details/user-info'
    },
    {
        name: 'Rides',
        path: '/users/details/rides'
    },
    {
        name: 'Transactions',
        path: '/users/details/transactions'
    },
    {
        name: 'Active Bookings',
        path: '/users/details/active-bookings'
    },
    {
        name: 'Past Bookings',
        path: '/users/details/past-bookings'
    },
    {
        name: 'Cancelled Trips',
        path: '/users/details/cancelled-trips'
    },
    {
        name: 'Creditline Usages',
        path: '/users/details/credit-line-usage'
    }
]
</script>

<style scoped>

</style>
