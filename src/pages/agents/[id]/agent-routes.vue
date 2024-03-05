<template>
	<main class="flex flex-col gap-6">
		<ButtonGoBack />
		<Table :loading="loading || AgentByIdloading" :headers="tableFields" :table-data="agentsRoute" :has-options="true">
			<template #header>
				<TableFilter :filter-type="{showStatus:false, showSearchBar:true, showDownloadButton: true, showDateRange: false}"

				/>
			</template>
			<template #item="{ item }">
				<div v-if="item.route_id">
					{{ item?.data?.route_id ?? 'N/A' }}
				</div>
				<div v-if="item.pickup">
					<RouteDescription :pickup="item?.data?.pickup" :destination="item?.data?.destination" />
				</div>

				<span v-else-if="item.route_available_days" class="space-y-4 text-base">
					{{ item?.data?.route_available_days }}
				</span>
				<span v-else-if="item.is_return_trip" class="space-y-4 text-base">
					{{ item?.data?.is_return_trip === 1 ? 'Return Trip' : 'One Way Trip' }}
				</span>
				<span v-else-if="item.return_trip_departure_time" class="space-y-4 text-base">
					{{ item?.data?.return_trip_departure_time }} {{ item?.data?.return_trip_time_of_day }}
				</span>
				<span v-else-if="item.passengers" class="space-y-4 text-base">
					{{ item?.data?.passengers.length }}
				</span>
				<span v-else-if="item.id">
					<ButtonIconDropdown :children="dropdownChildren" :data="item.data" class-name="w-40" />
				</span>
				<span v-else-if="item.active" class="text-base">
					<StatusBadge :name="item?.data?.active === '1' ? 'active' : 'inactive'" />
				</span>
			</template>

			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loading" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">

import { useAgentIdDetails } from '@/composables/modules/agents/id'
import { useGetAgentsRoutes } from '@/composables/modules/agents/routes'
import { useAlert } from '@/composables/core/notification'

const { AgentByIdloading, selectedAgent } = useAgentIdDetails()
const { agentsRoute, getAgentsRoute, loading, page, total, moveTo, next, prev } = useGetAgentsRoutes()

watch(selectedAgent, (value) => {
	if (value.sales_agent_account_id) {
		getAgentsRoute(value.sales_agent_account_id)
	} else if (value && !value.sales_agent_account_id) {
		useAlert().openAlert({ type: 'ERROR', msg: 'sales_agent_account_id not found' })
	} else {
		useAlert().openAlert({ type: 'ERROR', msg: 'Agent not found' })
	}
}, { immediate: true })

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
const tableFields = ref([
    {
        text: 'ROUTE CODE',
        value: 'route_id'
    },
    {
        text: 'ROUTE',
        value: 'pickup'
    },
    {
        text: 'TRIP DAYS',
		value: 'route_available_days',
		width: 25
    },
    {
        text: 'TRIP TYPE',
        value: 'is_return_trip'
    },

    {
        text: 'TIME',
        value: 'return_trip_departure_time'
    },
    {
        text: 'PASSENGERS',
        value: 'passengers'
    },
    {
        text: '',
        value: 'id'
    }
])

const dropdownChildren = computed(() => [

	{ name: 'Approve route', func: (data) => { } },
    { name: 'Decline route', func: (data) => { } }
	// { name: 'Duplicate', func: (data) => { useRouteModal().openRouteDuplicationModal() } },
	// { name: 'Delete', func: (data) => { handleRouteDelete(data) }, class: '!text-red' }
])

</script>
