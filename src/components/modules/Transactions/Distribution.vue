<template>
	<main>
		<div class="border-b">
			<h3>Transaction Distribution</h3>
			<p>Type of users transactions (Credits, Debits)</p>
		</div>
		<div>
			<Pie style="width: 100%" class="h-[400px]" :options="chartOptions" :data="chartData" />
		</div>
	</main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
const chartData = ref({
	labels: [
        'Red',
        'Yellow',
        'Blue'
    ],
	datasets: [
		{
			label: 'My First Dataset',
			data: [10, 20, 30],
			backgroundColor: [
				'rgba(153, 102, 255, 0.2)'
			]
		}
	]
})

const chartOptions = computed(() => {
	return {
		responsive: true, scales: {
			y: {
				beginAtZero: true
			}
		}
	}
})
</script>

<style scoped></style>
<style></style>
