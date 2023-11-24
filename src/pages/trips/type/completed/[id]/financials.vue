<template>
	<section class="mx-10 mt-14 space-y-10">
		<div>
			<ModulesTripsTripFinancialStartsCard v-if="!loadingFinancials" :trip-revenue-stats="revenueStats" />
			<Skeleton v-else height="300px" />
		</div>
		<div>
			<ModulesTripsTripFinancialsTable v-if="!loadingFinancials" :loading-financials="loadingFinancials" :trip-financials="tripFinancials" />
			<Skeleton v-else height="300px" />
		</div>
	</section>
</template>

<script setup lang="ts">
import { useTripFinancials } from '@/composables/modules/trips/id'
const route = useRoute()
const routeId = String(route.params.id)
const { tripFinancials, loading: loadingFinancials, revenueStats, getTripFinancials, financialsMoveTo, page, next, prev } = useTripFinancials()
getTripFinancials(routeId)
definePageMeta({
	layout: 'dashboard-zero',
	middleware: ['is-authenticated']
})

</script>

<style scoped>

</style>
