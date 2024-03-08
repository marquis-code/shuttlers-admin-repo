<template>
	<main>
		<ButtonGoBack class="mb-6" />
		<section class="px-0 card">
			<header class="border-b">
				<h3 class="font-medium px-6">
					Rides by User
				</h3>
				<p class="text-sm text-gray-500  pb-3 px-6">
					Rides by user over the last 30 days
				</p>
			</header>
			<div class="p-5">
				<ChartsBarChart class="!h-72" :loading="loading" :data="getYearlyBarChartData(graph)" />
			</div>
		</section>
	</main>
</template>

<script setup lang="ts">
import { useGetTripsGraph } from '@/composables/modules/trips/fetch'
import { useUserRidesGraph } from '@/composables/modules/users/rides_graph'
import { getYearlyBarChartData } from '@/composables/utils/charts'

// const { getTripsGraph, loading, tripsGraphData } = useGetTripsGraph()
const { loading, graph, fetchUserRidesGraph } = useUserRidesGraph()
fetchUserRidesGraph()

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})
</script>
