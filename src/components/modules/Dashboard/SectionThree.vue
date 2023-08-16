<template>
	<section class="stat_card">
		<div class="flex items-center justify-between pb-3 border-b">
			<div>
				<h3 class="px-6 font-medium">
					Trip rating service
				</h3>
			</div>
			<div class="pr-3">
				<date-picker v-model:value="dateSelected" placeholder="Filter by date" />
			</div>
		</div>
		<div class="p-5 space-y-6">
			<div class="w-4/12 p-6 space-y-4 bg-white border rounded-md shadow-sm">
				<div class="flex items-center justify-between">
					<div>
						<p class="font-light text-gray-400">
							Customer Satisfaction
						</p>
						<p><span class="text-3xl font-bold">4.4</span>/5</p>
					</div>
					<div>
						<img src="@/assets/images/rating-star.jpg" alt="" class="p-3 bg-yellow-200 rounded-full h-14 w-14">
					</div>
				</div>
				<p class="flex items-center space-x-1">
					<span class="inline"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
						fill="none" stroke="#21d369" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M20.2 7.8l-7.7 7.7-4-4-5.7 5.7" />
						<path d="M15 7h6v6" />
					</svg></span> <span class="inline text-green-600">73 ratings</span> in total
				</p>
			</div>
			<div>
				<!-- <Bar style="width: 100%" class="h-[400px]" :options="chartOptions" :data="chartData" /> -->
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
// const props = defineProps({
// 	chartOptions: {
// 		type: Object,
// 		required: true
// 	},
// 	chartData: {
// 		type: Object,
// 		required: true
// 	}
// })

const dateSelected = ref(null)

</script>

<style scoped></style>
