<template>
	<HeadersHeaderSlot title="Pricing control" pre-title="Overview">
		<template #tabs>
			<RouterTabs :tabs="pageTabs" />
		</template>
	</HeadersHeaderSlot>
</template>

<script setup lang="ts">
const pageTabs = [
    {
        name: 'Pricing control',
        path: '/configuration/pricing/pricing-control'
    },
    {
        name: 'Payment option display',
        path: '/configuration/pricing/payment-option'
    }
]
</script>

<style scoped></style>
