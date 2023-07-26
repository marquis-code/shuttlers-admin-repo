<template>
	<section class="stat_card">
		<div class="border-b flex justify-between items-center pb-3">
			<div>
				<h3 class="font-medium px-6">
					Trip rating service
				</h3>
			</div>
			<div class="pr-3">
				<vue-date-picker placeholder="Filter by date" />
			</div>
		</div>
		<div class="p-5 space-y-6">
			<div class="rounded-md border bg-white shadow-sm space-y-4 p-6 w-4/12">
				<div class="flex justify-between items-center">
					<div>
						<p class="text-gray-400 font-light">
							Customer Satisfaction
						</p>
						<p><span class="text-3xl font-bold">4.4</span>/5</p>
					</div>
					<div>
						<img src="@/assets/images/rating-star.jpg" alt="" class="rounded-full h-14 w-14 bg-yellow-200 p-3">
					</div>
				</div>
				<p class="flex items-center space-x-1">
					<span class="inline"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
						fill="none" stroke="#21d369" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M20.2 7.8l-7.7 7.7-4-4-5.7 5.7" />
						<path d="M15 7h6v6" />
					</svg></span> <span class="text-green-600 inline">73 ratings</span> in total
				</p>
			</div>
			<div>
				<Bar style="width: 100%" class="h-[400px]" :options="chartOptions" :data="chartData" />
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { ref, computed } from 'vue'
const chartData = ref({
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
