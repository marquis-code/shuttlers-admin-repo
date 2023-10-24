<template>
	<main class="">
		<Table :loading="loadingSuspendedRoutes" :has-index="true" :page="page" :headers="tableFields" :table-data="formattedSuspendedList">
			<template #header>
				<TableFilter :filter-type="{showSearchBar:true, showDownloadButton: true, showStatus: true, showDatePicker: true}" />
			</template>
			<template #item="{ item }">
				<div v-if="item.action">
					<button v-if="data.item.status == 'active'"
						class="btn bg-transparent text-black text-xs rounded outline-none border-black"
						@click="openRestoreModal(data.item)">
						Cancel
					</button>
					<p v-else class="m-0 text-sm whitespace-nowrap w-fit">
						{{ useDateFormat(data.item.updated_at, "MMMM Do YYYY").value }}
					</p>
				</div>
				<div v-if="item.route_codes">
					{{ item?.data?.route_codes }}
				</div>
				<div v-if="item.user">
					<p class="whitespace-nowrap">
						{{ data?.item?.user }}
					</p>
				</div>
				<!-- <div v-if="item.staff">
					<p class="whitespace-nowrap">
						{{ data.item.staff.fname }} {{ data.item.staff.lname }} <br> {{
							data.item.staff.email }}
					</p>
				</div> -->
				<!-- <div v-if="item.staff_id">
					<p class="whitespace-nowrap">
						{{ data.item.staff.fname }} {{ data.item.staff.lname }} <br> {{
							data.item.staff.email }}
					</p>
				</div> -->
				<!-- <div v-if="item.suspension_dates">
					<span v-for="n in data.value" :key="n" class="block whitespace-nowrap">
						{{ useDateFormat(n, "dddd, MMMM Do YYYY").value }}
					</span>
				</div> -->
				<!-- <div v-if="item.suspension_data">
					{{ !data.item.suspension_data?.routes?.length ? 'All' : data.item.suspension_data.routes.map((route) =>
						route.route_code ?? 'N/A').join(', ') }}
				</div> -->
				<div v-if="item.suspension_dates">
					<span v-for="n in data.value" :key="n" class="block whitespace-nowrap">
						{{ useDateFormat(n, "dddd, MMMM Do YYYY").value }}
					</span>
				</div>
				<span v-if="item.created_at">
					{{ useDateFormat(item?.data?.createdAt, "MMMM d, YYYY, HH:MM A").value }}
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
			//  staff_email: i.staff.email
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
        value: 'period'
    },
    {
        text: 'ADMIN',
        value: 'user'
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
        value: 'action'
    }
])

</script>

<style scoped></style>
