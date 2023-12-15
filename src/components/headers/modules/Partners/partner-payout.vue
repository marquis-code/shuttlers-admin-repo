<template>
	<HeadersHeaderSlot title="Partner Payout" pre-title="Overview">
		<template #tabs>
			<RouterTabs :tabs="pageTabs" />
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
const pageTabs = [
    {
        name: 'Pending',
        path: '/partners/payouts'
    },
    {
        name: 'Completed',
        path: '/partners/payouts/completed'
    },
    {
        name: 'Failed',
        path: '/partners/payouts/failed'
    }

]
</script>

<style scoped></style>
