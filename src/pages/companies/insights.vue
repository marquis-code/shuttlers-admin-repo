<template>
	<section class="px-0 card">
		<header class="border-b">
			<h3 class="font-medium pb-3.5 px-6">
				Companies Growth
			</h3>
		</header>
		<div class="p-5">
			<ChartsBarChart class="!h-72" :loading="loading" :data="getYearlyBarChartData(corporatesGraphData)" />
		</div>
	</section>
</template>

<script setup lang="ts">

import { getYearlyBarChartData } from '@/composables/utils/charts'
import { useGetCorporateGraph } from '@/composables/modules/corporates/fetch'

const { getCorporatesGraph, loading, corporatesGraphData } = useGetCorporateGraph()
getCorporatesGraph()

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})
</script>
