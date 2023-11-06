<template>
	<main class="">
		<Table :loading="loadingMainRoutes" :has-index="true" :page="page" :headers="tableFields" :table-data="mainRoutesList" :option="onRowClicked" class="cursor-pointer">
			<template #header>
				<TableFilter :filter-type="{showSearchBar:true, showDownloadButton: true, showStatus: true, showDatePicker: true}" />
			</template>
			<template #item="{ item }">
				<div v-if="item.pickup">
					<RouteDescription :pickup="item?.data?.pickup" :destination="item?.data?.destination" />
				</div>
				<div v-if="item.visibility" class="">
					<p class="rounded-full px-2 py-1 text-xs w-20 text-center" :class="[item?.data?.is_exclusive === 0 ? 'text-yellow-500 bg-yellow-50' : 'text-purple-500']">
						{{ item?.data?.is_exclusive === 0 ? 'Shared' : 'Exclusive' }}
					</p>
					<p class="rounded-full px-2 py-1 text-xs w-20 text-center">
						{{ item?.data?.visibility }}
					</p>
				</div>
				<span v-if="item.status">
					<StatusBadge :name="item.data.status === 0 ? 'Inactive' : 'Active'" />
				</span>
				<span v-if="item.id">
					<ButtonIconDropdown :children="dropdownChildren" :data="item.data" class-name="w-56" />
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
import { useRouteIdDetails } from '@/composables/modules/routes/id'

const { getMainRoutesList, loadingMainRoutes, mainRoutesList, filterData, onFilterUpdate, moveTo, next, prev, total, page } = useGetMainRoutes()
getMainRoutesList()

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const onRowClicked = (data) => {
	const { selectedRoute } = useRouteIdDetails()
	useRouter().push(`/trips/routes/${data.id}/details`)
	selectedRoute.value = data
}

const dropdownChildren = computed(() => [
	{ name: 'Edit', func: (data) => {} },
	{ name: 'Suspend', func: (data) => {} },
	{ name: 'Duplicate', func: (data) => {} },
	{ name: 'Delete', func: (data) => {}, class: '!text-red' }
])

const tableFields = ref([
    {
        text: 'ROUTE',
        value: 'pickup'
    },
    {
        text: 'ROUTE CODE',
        value: 'route_code'
    },
	{
        text: 'TYPE',
        value: 'visibility'
    },
	{
        text: 'STATUS',
        value: 'status'
    },
	{
		text: 'ACTIONS',
		value: 'id'
	}
])

</script>

<style scoped></style>
