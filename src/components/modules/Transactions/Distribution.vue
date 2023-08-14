<template>
	<main class="">
		<div class="border-b">
			<!-- <h3>Transaction Distribution</h3>
			<p>Type of users transactions (Credits, Debits)</p> -->
			<div class="px-6 py-3">
				<h3 class="font-medium">
					Transaction Distribution
				</h3>
				<p class="font-light  text-xs text-gray-500">
					Type of users transactions (Credits, Debits)
				</p>
			</div>
		</div>
		<div class="py-6">
			<DoughnutChart :chart-data="testData" :height="300" :width="300" />
		</div>
	</main>
</template>

<script setup lang="ts">
import { Chart, DoughnutController, ArcElement, Tooltip, registerables } from 'chart.js'

Chart.register(DoughnutController, ArcElement, Tooltip)
Chart.register(...registerables)

const testData = {
	labels: ['Credits', 'Debits'],
	datasets: [
		{
			data: [43, 57],
			backgroundColor: ['#FFCCCB', '#FF5733 ']
		}
	]
}
</script>

<style scoped></style>
<style></style>
