<template>
	<main>
		<div class="border-b">
			<h3>Transactions (30 days)</h3>
			<p>User transactions over the last 30 days</p>
		</div>
	</main>
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { ref, computed } from 'vue'
const chartData = ref({
	labels: ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'August', 'Sept', 'Oct', 'Nov', 'Dec'],
	datasets: [
		{
			label: 'My First Dataset',
			data: [12, 0, 81, 5, 14, 27, 11, 0, 0, 0, 0, 0],
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
