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
const props = defineProps({
	chartOptions: {
		type: Object,
		required: true
	},
	chartData: {
		type: Object,
		required: true
	}
})
</script>
