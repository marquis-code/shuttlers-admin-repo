<template>
	<section class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
		<div v-for="(item, index) in Object.keys(statsData)" :key="index" class="card">
			<h3 class="text-xs text-gray-400 font-medium leading-loose">
				{{ statsData[item].name }}
			</h3>
			<p v-if="!loading" class="text-lg font-bold text-black">
				{{ convertToCurrency(statsData[item].value) }}
			</p>
			<Skeleton v-else class="" height="20px" />
		</div>
	</section>
</template>

<script setup lang="ts">
import { useGetDashboardStats } from '@/composables/modules/dashboard/stats'
import { convertToCurrency } from '@/composables/utils/formatter'

const { getStats, loading, statsData } = useGetDashboardStats()
getStats()
</script>

<style scoped>

</style>
