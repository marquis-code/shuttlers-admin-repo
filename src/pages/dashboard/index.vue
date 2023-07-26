<template>
	<main class="space-y-10">
		<ModulesDashboardSectionOne />
		<ModulesDashboardSectionTwo />
		<ModulesDashboardSectionThree />
		<ModulesDashboardSectionFour />
		<ModulesDashboardSectionFive />
	</main>
</template>
<script setup lang="ts">
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { Bar } from 'vue-chartjs'
definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
const chartData = computed(() => {
    return {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{ data: [40, 20, 12, 40, 20, 12, 40, 20, 12, 40, 20, 12] }]
    }
})

const chartOptions = computed(() => {
    return { responsive: true }
})

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

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
