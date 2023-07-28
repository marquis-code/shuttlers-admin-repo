<template>
	<main>
		<div class="flex">
			<ModulesTransactionsCharts />
			<ModulesTransactionsDistribution />
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
