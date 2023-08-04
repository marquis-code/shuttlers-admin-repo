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
const tripsChartData = computed(() => {
    return {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{ data: [40, 20, 12, 40, 20, 12, 40, 20, 12, 40, 20, 12] }]
    }
})

const tripsChartOptions = computed(() => {
    return { responsive: true }
})

const tripRatingChartData = ref({
	labels: ['2023-07-20', '2023-07-21', '2023-07-22', '2023-07-23', '2023-07-24', '2023-07-25', '2023-07-26'],
	datasets: [
		{
			label: 'No. of passengers that rated trip',
			data: [0, 0, 0, 0, 0, 0, 0],
			backgroundColor: [
				'rgba(153, 102, 255, 0.2)'
			]
		},
		{
			label: 'Total passengers on trip',
			data: [4, 3, 2, 1, 6, 2, 2],
			backgroundColor: [
				'rgba(201, 203, 207, 0.2)'
			]
		}
	]
})

const tripRatingChartOptions = computed(() => {
	return {
		responsive: true, scales: {
			y: {
				beginAtZero: true
			}
		}
	}
})

const dashboardStats = ref([
    {
        title: 'TOTAL RIDES',
        count: '102,354'
    },
    {
        title: 'TOTAL TRANSACTIONS',
        count: '1,441,860'
    },
    {
        title: 'TOTAL USERS',
        count: '77,472'
    },
    {
        title: 'TOTAL DRIVERS',
        count: '1,606'
    }
])
</script>
