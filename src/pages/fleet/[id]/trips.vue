<template>
	<main class="">
		<ButtonGoBack class="mb-6" />
		<Table :loading="loadingTripHistory" :headers="tableFields" :table-data="fleeTripHistory" :has-options="true" :option="(data)=>$router.push(`/admin/${data.id}/info`)">
			<template #header>
				<TableFilter :filter-type="{showStatus:true, showSearchBar:true}" @filter="onFilterUpdate" />
			</template>
			<template #item="{ item }">
				<span v-if="item.fname" class="flex items-center gap-4">
					<div>
						<Avatar :name="item.data.fname" bg="#B1C2D9" />
					</div>

					<span>{{ item.data.fname }} {{ item.data.lname }}</span>
				</span>
			</template>
			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loadingTripHistory" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import { useGetFleetTripHistory } from '@/composables/modules/fleets/id'

const { getFleetsTripHistory, loadingTripHistory, fleeTripHistory, moveTo, page, total, next, prev, onFilterUpdate } = useGetFleetTripHistory()
getFleetsTripHistory()

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
const tableFields = ref([
    {
        text: 'S/N',
        value: 'fname'
    },
    {
        text: 'TRIP DATE',
        value: 'phone'
    },
    {
        text: 'ROUTE CODE (START TIME)',
        value: 'email'
    },
    {
        text: 'ROUTE',
        value: 'active'
    },
    {
        text: 'PARTNERS NAME',
        value: 'role'
    },
    {
        text: 'VEHICLE NAME',
        value: 'created_at'
    },
    {
        text: 'DRIVER',
        value: 'updated_at'
    },
    {
        text: 'AVERAGE RATING',
        value: 'updated_at'
    },
    {
        text: 'ACTION',
        value: 'updated_at'
    },
    {
        text: 'PASSENGERS',
        value: 'updated_at'
    }
])

</script>

<style scoped></style>
