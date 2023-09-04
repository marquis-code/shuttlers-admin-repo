<template>
	<main class="space-y-10">
		<ModulesDashboardSectionOne />
		<ModulesDashboardSectionTwo :chart-data="tripsChartData" :chart-options="tripsChartOptions" />
		<ModulesDashboardSectionThree :chart-data="tripRatingChartData" :chart-options="tripRatingChartOptions" />
		<ModulesDashboardSectionFour />
		<ModulesDashboardSectionFive />
	</main>
</template>
<script setup lang="ts">

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

</script>
