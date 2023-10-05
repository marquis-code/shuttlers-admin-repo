<template>
	<main class="">
		<Table :loading="loadingMainRoutes" :headers="tableFields" :table-data="mainRoutesList">
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
				<TablePaginator :current-page="page" :total-pages="total" :loading="loadingMainRoutes" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>
<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useGetMainRoutes } from '@/composables/modules/routes/fetch'

const { getMainRoutesList, loadingMainRoutes, mainRoutesList, filterData, onFilterUpdate, moveTo, next, prev, total, page } = useGetMainRoutes()
getMainRoutesList()

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
        text: 'ROUTE',
        value: 'vehicle'
    },
    {
        text: 'ROUTE CODE',
        value: 'seats'
    },
	{
        text: 'TYPE',
        value: 'seats'
    },
	{
        text: 'STATUS',
        value: 'seats'
    }
])

</script>

<style scoped></style>
