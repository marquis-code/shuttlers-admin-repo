<template>
	<main>
		<ButtonGoBack url="/companies" class="mb-6" />
		<section class="px-0 card">
			<header class="border-b">
				<h3 class="font-medium px-6">
					Rides by Staff
				</h3>
				<p class="text-sm text-gray-500  pb-3 px-6">
					Rides by staff over the last 30 days
				</p>
			</header>
			<div class="p-5">
				<ChartsBarChart class="!h-72" :loading="loading" :data="getYearlyBarChartData(tripsGraphData)" />
			</div>
		</section>
	</main>
</template>

<script setup lang="ts">
import { useGetTripsGraph } from '@/composables/modules/trips/fetch'
import { getYearlyBarChartData } from '@/composables/utils/charts'

const { getTripsGraph, loading, tripsGraphData } = useGetTripsGraph()
getTripsGraph()
definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})
</script>
