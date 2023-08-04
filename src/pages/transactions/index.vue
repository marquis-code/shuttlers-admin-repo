<template>
	<main>
		<div class="flex justify-between ">
			<ModulesDashboardTransactionsCharts />
			<ModulesDashboardTransactionsDistribution />
		</div>
	</main>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})
</script>

<style scoped></style>
