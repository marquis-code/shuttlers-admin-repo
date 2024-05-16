<template>
	<section v-if="!loading && !AgentByIdloading" class=" z-30 bg-white py-4 px-3">
		<span v-for="filter in filterOptions" :key="filter.value"
			class="px-5  font-bold text-[13px] py-2.5 rounded-lg cursor-pointer"
			:class="[filterData.approval_status.value === filter.value ? 'text-green bg-neut1 ':'']"
			@click="filterData.approval_status.value = filter.value"
		>
			{{ filter.name }}
		</span>
	</section>

	<Skeleton v-else height="56px" class="mt-4" />

	<div class="flex flex-col mt-4 gap-6">
		<section v-if="filterData.approval_status.value === 'monitoring' && !loading" class="flex gap-4 w-full ">
			<div v-if="agentsRoute.length" class="flex flex-col card min-w-[270px] px-6">
				<span class="text-sm text-grey5">{{ filterData_monitoring.trip_type.value === 'completed' ? "Total trips taken" :'Total trips' }}</span>
				<span class="text-3xl font-bold">{{ total }}</span>
			</div>
			<div v-if="agentsRoute.length" class="flex flex-col card min-w-[270px] px-6">
				<span class="text-sm text-grey5">Accrued earnings</span>
				<span class="text-3xl font-bold">{{ total_commissions }} pts</span>
			</div>
		</section>
		<main class="flex flex-col gap-6">
			<Table v-if="filterData.approval_status.value !== 'monitoring'" :loading="loading || AgentByIdloading" :headers="tableFields" :table-data="agentsRoute" :has-options="true" class="mb-12">
				<template #header>
					<TableFilter :filter-type="{showStatus:false, showSearchBar:true, showDownloadButton: false, showDateRange: true}"
						@filter="onFilterUpdate"
					/>
				</template>
				<template #item="{ item }">
					<div v-if="item.route_id">
						{{ item?.data?.route?.route_code ?? 'N/A' }}
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
					<span v-else-if="item.departure_time" class="space-y-4 text-base">
						{{ item?.data?.departure_time }} {{ item?.data?.time_of_day }}
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
					<span v-else-if="item.created_at" class="flex items-center gap-4 py-4">
						{{ useDateFormat(item.data.created_at, "hh:mm, MMMM d, YYYY").value }}
					</span>
				</template>

				<template #footer>
					<TablePaginator :current-page="page" :total-pages="total" :loading="loading" @move-to="moveTo($event)" @next="next" @prev="prev" />
				</template>
			</Table>
			<Table v-if="filterData.approval_status.value === 'monitoring'" :loading="loading || AgentByIdloading" :headers="tableFields" :table-data="agentsRoute" :has-index="true">
				<template #header>
					<ul class="flex mb-2 flex-wrap">
						<li v-for="tab in monitoringTabs" :key="tab.value" class="nav-item cursor-pointer" @click="filterData_monitoring.trip_type.value = tab.value">
							<span class="nav-link" :class="{active: filterData_monitoring.trip_type.value === tab.value}">{{ tab.name }}</span>
						</li>
					</ul>
				</template>
				<template #item="{ item }">
					<p v-if="item.start_date" class="min-w-[100px]">
						{{ item.data?.trip ? moment.utc(item.data?.trip?.start_trip).format('ll') : moment.utc(item.data?.trip_date).format('ll') }}
					</p>
					<div v-if="item.route_code" class="whitespace-nowrap min-w-[80px]" @click.stop>
						<NuxtLink :to="`/trips/routes/${item.data.route.id}/details`" class="text-blue-500">
							{{ item?.data?.route?.route_code }}
						</NuxtLink> <br>
						({{ item.data?.trip ? moment.utc(item.data?.trip?.start_trip).format('LT') : item.data?.itinerary?.trip_time }})
					</div>

					<span v-if="item.driver" class="text-blue-500 flex gap-1 flex-wrap">
						<NuxtLink :to="`/drivers/${item?.data?.driver?.id}/driver-info`" class="">
							{{
								item?.data?.driver
									? `${item?.data?.driver?.fname} ${item.data?.driver?.lname}`
									: item.data?.route?.driver
										? `${item.data?.route?.driver?.fname} ${item.data?.route?.driver?.lname}`
										: 'N/A'
							}}
						</NuxtLink>
						<span v-if="item.data.driver && item.data.driver.phone">
							<a :href="'tel:' + item.data.driver.phone">{{ item.data.driver
								? item.data.driver.phone.replace(/^0/, '+234') : 'N/A' }}</a>
						</span>
					</span>
					<span v-if="item.status">
						<StatusBadge :name="item?.data?.status" />
					</span>

					<span v-else-if="item.user" class="space-y-4 text-base">
						{{ item?.data?.user?.fname }} {{ item?.data?.user?.lname }}
					</span>
					<p v-if="item.vehicle" class="min-w-[100px]">
						{{ item.data.vehicle }} <br> {{ item.data?.cost_of_supply ? convertToCurrency(item.data?.cost_of_supply) : 'N/A' }}
					</p>
					<div v-if="item.route">
						<RouteDescription v-if="item.data.route.pickup" :pickup="item.data.route.pickup" :destination="item.data.route.destination" />
						<span v-else>N/A</span>
					</div>
				</template>
				<template #footer>
					<TablePaginator :current-page="page" :total-pages="total_pages" :loading="loading || AgentByIdloading" @move-to="moveTo($event)" @next="next" @prev="prev" />
				</template>
			</Table>
		</main>
	</div>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import moment from 'moment'
import { useAgentIdDetails } from '@/composables/modules/agents/id'
import { useGetAgentsRoutes } from '@/composables/modules/agents/routes'
import { useAlert } from '@/composables/core/notification'
import { useDeclineRouteSuggestion } from '@/composables/modules/agents/decline'
import { useAcceptRouteSuggestion } from '@/composables/modules/agents/accept'
import { convertToCurrency } from '@/composables/utils/formatter'

const { AgentByIdloading, selectedAgent } = useAgentIdDetails()
const { agentsRoute, getAgentsRoute, loading, page, total, total_pages, moveTo, next, prev, agentDataRef, filterOptions, filterData, filterData_monitoring, total_commissions, onFilterUpdate } = useGetAgentsRoutes()

const { setAcceptRoute } = useAcceptRouteSuggestion()
const { setDeclineRoute } = useDeclineRouteSuggestion()

watch(selectedAgent, (value) => {
	if (value.sales_agent_account_id) {
		agentDataRef.value = value
		getAgentsRoute()
	} else if (Object.keys(value).length && !value.sales_agent_account_id) {
		useAlert().openAlert({ type: 'ERROR', msg: 'sales_agent_account_id not found' })
	}
}, { immediate: true })

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const monitoringTabs = [
	{ name: 'Active', value: 'active' },
	{ name: 'Upcoming', value: 'upcoming' },
	{ name: 'Completed', value: 'completed' }
]
const tableFields = computed(() => {
	const header = [
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
			value: 'departure_time'
		},
		{
			text: 'Date',
			value: 'created_at'
		},
		{
			text: 'PASSENGERS',
			value: 'passengers'
		}
	]

	if (filterData.approval_status.value === 'pending_review') {
			header.push({ text: '', value: 'id' })
	}

	const tripMonitoringHeader = [
    {
        text: 'DATE',
        value: 'start_date'
    },
    {
        text: 'ROUTE CODE ( START TIME)',
        value: 'route_code'
    },
    {
        text: 'ROUTE',
        value: 'route'
    },
    {
        text: 'PASSENGERS\'S NAME',
        value: 'user'
    },

	{
        text: 'DRIVER’S NAME',
        value: 'driver'
    }
	// {
    //     text: 'STATUS',
    //     value: 'status'
    // }
	// {
	// 	text: 'EARNINGS (pts)',
	// 	value: 'action'
	// }
]
	return filterData.approval_status.value === 'monitoring' ? tripMonitoringHeader : header
})

const dropdownChildren = computed(() => [

	{ name: 'Approve route', func: (data) => { setAcceptRoute(data) } },
    { name: 'Decline route', func: (data) => { setDeclineRoute(data) } }
	// { name: 'Duplicate', func: (data) => { useRouteModal().openRouteDuplicationModal() } },
	// { name: 'Delete', func: (data) => { handleRouteDelete(data) }, class: '!text-red' }
])

</script>

<style scoped>
.nav-link{
@apply text-sm font-medium text-grey5_5 leading-[20px] px-5 py-4;
}
.active{
@apply border-b-[3px] border-shuttlersGreen font-medium text-shuttlersGreen py-2;
}
</style>
