<template>
	<section class="stat_card">
		<div class="border-b">
			<h3 class="font-medium pb-3.5 px-6">
				Trips
			</h3>
		</div>
		<div class="p-5">
			<Bar style="width: 100%" class="h-[400px]" :options="chartOptions" :data="chartData" />
		</div>
	</section>
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

<style scoped></style>
