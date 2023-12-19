<template>
	<main class="">
		<Table :loading="loadingSuspendedRoutes" :has-index="true" :page="page" :headers="tableFields" :table-data="formattedSuspendedList">
			<template #header>
				<TableFilter :filter-type="{showSearchBar:true, showDownloadButton: true, showStatus: true, showDatePicker: true}" />
			</template>
			<template #item="{ item }">
				<div v-if="item.route_type">
					<span class="font-medium" :class="[item?.data?.route_type === 'shared' ? 'text-yellow-600' : 'text-indigo-600']">{{ item?.data?.route_type }}</span>
				</div>
				<div v-if="item.route_visibility">
					{{ item?.data?.route_visibility }}
				</div>
				<div v-if="item.suspension_data">
					<span v-for="n in data.value" :key="n" class="block whitespace-nowrap">
						{{ n }}
					</span>
				</div>
				<div v-if="item.staff">
					<p class="whitespace-nowrap">
						{{ item.data.staff.fname }} {{ item.data.staff.lname }} <br> {{
							item.data.staff.email }}
					</p>
				</div>
				<div v-if="item.suspension_dates">
					<span v-for="n in item.data.suspension_dates" :key="n" class="block whitespace-nowrap">
						{{ useDateFormat(n, "MMMM d, YYYY").value }}
					</span>
				</div>
				<span v-if="item.updated_at">
					{{ useDateFormat(item?.data?.updated_at, "MMMM d, YYYY").value }}
				</span>
				<div v-if="item.status">
					<span class="text-white px-2 text-sm py-1 rounded-lg" :class="[item.data.status === 'completed' ? 'bg-indigo-600' : 'bg-yellow-500']">{{ item?.data?.status }}</span>
				</div>
				<span v-if="item.created_at">
					{{ useDateFormat(item?.data?.created_at, "MMMM d, YYYY").value }}
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

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const formattedSuspendedList = computed(() =>
suspendedRoutesList.value.map((i) => {
         return {
             ...i,
             route_codes: !i.suspension_data?.routes?.length ? 'All' : i.suspension_data.routes.map((route) => route.route_code ?? 'N/A').join(', '),
			 action: '',
			 user: `${i.staff.fname} ${i.staff.lname}`
         }
    })
)

const tableFields = ref([
    {
        text: 'ROUTE TYPE',
        value: 'route_type'
    },
    {
        text: 'ROUTE VISIBILITY',
        value: 'route_visibility'
    },
    {
        text: 'ROUTE CODES',
        value: 'route_codes'
    },
    {
        text: 'PERIOD',
        value: 'suspension_dates'
    },
    {
        text: 'ADMIN',
        value: 'staff'
    },
	{
        text: 'DATE PERFORMED',
        value: 'created_at'
    },
    {
        text: 'REASON',
        value: 'suspension_reason'
    },
	{
        text: 'STATUS',
        value: 'status'
    },
	{
        text: 'ACTION',
        value: 'updated_at'
    }
])

</script>

<style scoped></style>
