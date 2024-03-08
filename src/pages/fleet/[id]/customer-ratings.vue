<template>
	<main class="">
		<ButtonGoBack class="mb-6" />
		<Table :loading="loading" :headers="tableFields" :table-data="fleetRatings" :has-options="true">
			<template #header>
				<TableFilter :filter-type="{showStatus:false, showSearchBar:true}" @filter="onFilterUpdate" />
			</template>
			<!-- <template #item="{ item }">
				<span v-if="item.fname" class="flex items-center gap-4">
					<div>
						<Avatar :name="item.data.fname" bg="#B1C2D9" />
					</div>

					<span>{{ item.data.fname }} {{ item.data.lname }}</span>
				</span>
			</template> -->
			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loading" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import { useGetFleetRating } from '@/composables/modules/fleets/id'

const { getFleetRatings, loading, fleetRatings, onFilterUpdate, moveTo, total, page, next, prev } = useGetFleetRating()
getFleetRatings()

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
const tableFields = ref([
    {
        text: 'DATE',
        value: 'fname'
    },
    {
        text: 'PASSENGER NAME',
        value: 'phone'
    },
    {
        text: 'Email',
        value: 'email'
    },
    {
        text: 'RATING',
        value: 'active'
    },
    {
        text: 'COMMENT',
        value: 'role'
    },
    {
        text: 'ISSUES',
        value: 'created_at'
    },
    {
        text: 'ATTACHMENT(S)',
        value: 'updated_at'
    },
    {
        text: 'TRIP TIME',
        value: 'updated_at'
    },
    {
        text: 'ROUTE',
        value: 'updated_at'
    }
])

</script>

<style scoped></style>
