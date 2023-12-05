<template>
	<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
		<div v-for="(item, index) in Object.keys(statsData)" :key="index" class="card">
			<h6 class="text-[11px] text-gray-400 leading-loose uppercase">
				{{ statsData[item].name }}
			</h6>
			<p v-if="!loading" class="text-lg font-bold text-black">
				{{ statsData[item].value.toLocaleString() }}
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
