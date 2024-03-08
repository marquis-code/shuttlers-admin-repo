<template>
	<main class="">
		<ButtonGoBack />
		<Table :loading="loadingTripRatings" :headers="tableFields" :table-data="tripRatingList" :has-index="true" :has-options="true">
			<template #header>
				<TableFilter :filter-type="{showSearchBar:true }" />
			</template>

			<template #item="{ item }">
				<div v-if="item.location">
					<RouteDescription :pickup="item.data.trip.route.pickup" :destination="item.data.trip.route.destination" />
				</div>
				<span v-else-if="item.created_at">
					{{ useDateFormat(item.data.created_at, "MMMM d, YYYY").value }}
				</span>
			</template>
			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loadingTripRatings" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useGetTripRatingList } from '@/composables/modules/trips/fetch'
const { getTripRatings, loadingTripRatings, tripRatingList, moveTo, total, page, next, prev } = useGetTripRatingList()
const route = useRoute()
const routeId = String(route.params.id)
getTripRatings(routeId)

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
const tableFields = ref([

    {
        text: 'DATE',
        value: 'date'
    },
    {
        text: 'PASSENGER NAME',
        value: 'passenger_name'
    },
    {
        text: 'PICKUP & DROP OFF',
        value: 'address'
    },
    {
        text: 'RATING',
        value: 'rating'
    },
    {
        text: 'COMMENT',
        value: 'comment'
    },
    {
        text: 'ISSUES',
        value: 'issues'
    },
    {
        text: 'ATTACHMENTS',
        value: 'attachments'
    }

])

</script>
