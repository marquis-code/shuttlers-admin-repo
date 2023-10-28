<template>
	<section class="px-0 card">
		<header class="border-b">
			<h3 class="font-medium pb-3.5 px-6">
				Users
			</h3>
		</header>
		<div class="p-5">
			<ChartsBarChart class="!h-72" :loading="loading" :data="getYearlyBarChartData(usersGraphData)" />
		</div>
	</section>
</template>

<script setup lang="ts">

import { getYearlyBarChartData } from '@/composables/utils/charts'
import { useGetUsersGraph } from '@/composables/modules/users/fetch'

const { getUsersGraph, loading, usersGraphData } = useGetUsersGraph()

getUsersGraph()
</script>
