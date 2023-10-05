<template>
	<main class="">
		<Table :loading="loadingSuspendedRoutes" :headers="tableFields" :table-data="suspendedRoutesList">
			<template #header>
				<TableFilter :filter-type="{showSearchBar:true, showDownloadButton: true, showStatus: true, showDatePicker: true}" />
			</template>
			<template #item="{ item }">
				<div v-if="item.vehicle">
					<span class="text-blue-500">{{ item.data.vehicle }}</span>
				</div>
				<div v-if="item.registrationNumber" class="">
					<p>
						{{ item.data.registrationNumber }}
					</p>
				</div>
				<div v-if="item.seats">
					<p>
						{{ item.data.seats }}
					</p>
				</div>
				<div v-if="item.inspectionSite">
					<span>{{ item.data.inspectionSite }}</span>
				</div>
				<div v-if="item.inspectionDateAndTime">
					<span>{{ item.data.inspectionDateAndTime }}</span>
				</div>

				<div v-if="item.partner">
					<span class="text-blue-500">{{ item.data.partner }}</span>
				</div>
				<span v-if="item.created_at">
					{{ useDateFormat(item.data.createdAt, "MMMM d, YYYY, HH:MM A").value }}
				</span>
			</template>

			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loadingSuspendedRoutes" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>
<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useGetSuspendedRoutes } from '@/composables/modules/routes/fetch'

const { getSuspendedRoutesList, loadingSuspendedRoutes, suspendedRoutesList, filterData, onFilterUpdate, moveTo, next, prev, total, page } = useGetSuspendedRoutes()
getSuspendedRoutesList()

// const onRowClicked = (data) => {
// 	const { selectedUser } = useUserIdDetails()
// 	useRouter().push(`/users/${data.id}/user-info`)
// 	selectedUser.value = data
// }

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const tableFields = ref([
	{
        text: 'S/N',
        value: 'sn'
    },
    {
        text: 'ROUTE TYPE',
        value: 'vehicle'
    },
    {
        text: 'ROUTE VISIBILITY',
        value: 'registrationNumber'
    },
    {
        text: 'ROUTE CODES',
        value: 'seats'
    },
    {
        text: 'PERIOD',
        value: 'inspectionSite'
    },
    {
        text: 'ADMIN',
        value: 'inspectionDateAndTime'
    },
	{
        text: 'DATE PERFORMED',
        value: 'partner'
    },
    {
        text: 'REASON',
        value: 'created_at'
    },
	{
        text: 'STATUS',
        value: 'created_at'
    },
	{
        text: 'ACTION',
        value: 'created_at'
    }
])

</script>

<style scoped></style>
