<template>
	<main class="">
		<Table :loading="loadingMainRoutes" :has-index="true" :page="page" :headers="tableFields" :table-data="mainRoutesList" :option="onRowClicked" class="cursor-pointer">
			<template #header>
				<TableFilter :filter-type="{showSearchBar:true, showDownloadButton: true, showStatus: true, showDateRange: false}"
					@filter="onFilterUpdate"
					@download="downloadMainRoutes"
				/>
			</template>
			<template #sub_header>
				<div class="flex items-stretch justify-end gap-4 border border-b-0 p-2">
					<ButtonMultiSelectDropdown v-model="type" :children="typeChildren" title="Type" />
					<ButtonMultiSelectDropdown v-model="visibility" :children="visibilityChildren" title="Visibility" />
					<select v-model="city" class="min-w-[100px] w-fit pr-4 border py-1.5 px-2 rounded-md outline-none bg-light">
						<option value="">
							All
						</option>
						<option v-for="n in allCityNames" :key="n.id" :value="n.id">
							{{ n.name }}
						</option>
					</select>
				</div>
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
import { useRouteModal } from '@/composables/core/modals'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { useGetMainRoutes } from '@/composables/modules/routes/fetch'
import { useRouteIdDetails } from '@/composables/modules/routes/id'
import { useUpdateRouteStatus } from '@/composables/modules/routes/updateRoute/update'
import { useUpdateDeletion } from '@/composables/modules/routes/updateRoute/delete'
import { useCityAndCountry } from '@/composables/modules/configure/charges/utils'

const { allCityNames, fetchAllCityNames } = useCityAndCountry()
const { updateRoute, loading } = useUpdateRouteStatus()
const { loading: deletingRoute, deleteRoute } = useUpdateDeletion()
const { getMainRoutesList, loadingMainRoutes, mainRoutesList, type, visibility, city, onFilterUpdate, moveTo, next, prev, total, page, downloadMainRoutes } = useGetMainRoutes()

getMainRoutesList()
fetchAllCityNames()
definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const typeChildren = [
	{ name: 'Shared', value: 0 },
	{ name: 'Exclusive', value: 1 }
]

const visibilityChildren = [
	{ name: 'Private', value: 'private' },
	{ name: 'Public', value: 'public' }
]

const onRowClicked = (data) => {
	const { selectedRoute } = useRouteIdDetails()
	useRouter().push(`/trips/routes/${data.id}/details`)
	selectedRoute.value = data
}

const dropdownChildren = computed(() => [
	{ name: 'Edit', func: (data) => {} },
	{ name: 'suspend', func: (data) => { handleRouteStatus(data) } },
	{ name: 'Duplicate', func: (data) => { useRouteModal().openRouteDuplicationModal() } },
	{ name: 'Delete', func: (data) => { handleRouteDelete(data) }, class: '!text-red' }
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

const handleRouteStatus = (data: any) => {
	const actionType = data.status === 0 ? 'unsuspend' : 'suspend'
    useConfirmationModal().openAlert({
        title: `Sure to ${data.status === 0 ? 'Un-suspend' : 'suspend'} route?`,
		type: 'NORMAL',
        desc: `Customers will ${data.status === 0 ? 'will' : 'no longer'} discover this route when searching on the mobile`,
		loading,
		call_function: () => updateRoute(data.id, actionType)
    })
}

const handleRouteDelete = (data: any) => {
    useConfirmationModal().openAlert({
        title: 'Sure to delete route?',
		type: 'NORMAL',
        desc: 'Customers will no longer discover this route when searching on the mobile',
		loading: deletingRoute,
		call_function: () => deleteRoute(data.id)
    })
}

</script>

<style scoped></style>
