<template>
	<main class="flex flex-col gap-6">
		<Table :loading="loading || AgentByIdloading" :headers="tableFields" :table-data="agentsPassenger" :has-options="true">
			<template #header>
				<TableFilter :filter-type="{showStatus:false, showSearchBar:true, showDownloadButton: true, showDateRange: false}"

				/>
			</template>
			<template #item="{ item }">
				<div v-if="item.fname">
					{{ item?.data?.fname }} {{ item?.data?.lname }}
				</div>
				<div v-if="item.lname" class="">
					<NuxtLink :to="`/users/${item.data.id}/user-info`" class="flex flex-col gap-y-2 py-3 text-blue-600 hover:text-gray-600 text-base">
						<p>{{ item?.data?.fname }} {{ item?.data?.lname }}</p>
						<p>{{ item?.data?.email ?? 'N/A' }}</p>
						<p>{{ item?.data?.phone ?? 'N/A' }}</p>
					</NuxtLink>
				</div>
				<span v-else-if="item.created_at" class="space-y-4 text-base">
					{{ useDateFormat(item?.data?.created_at, "DD, MMMM YYYY").value }}
				</span>
				<span v-if="item.wallet" class="flex items-center gap-4 text-base">
					<span>{{ convertToCurrency(item?.data?.wallet?.amount) }}</span>
				</span>
				<span v-if="item.corporate_id" class="flex items-center gap-4 text-base">
					<span>{{ convertToCurrency(item?.data?.wallet?.credit_amount) }}</span>
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
import { useDateFormat } from '@vueuse/core'
import { useAlert } from '@/composables/core/notification'
import { convertToCurrency } from '@/composables/utils/formatter'
import { useAgentIdDetails } from '@/composables/modules/agents/id'
import { useGetAgentsPassengers } from '@/composables/modules/agents/passengers'

const { AgentByIdloading, selectedAgent } = useAgentIdDetails()
const { agentsPassenger, getAgentsPassenger, loading, page, total, moveTo, next, prev } = useGetAgentsPassengers()

watch(selectedAgent, (value) => {
	if (value.sales_agent_account_id) {
		getAgentsPassenger(value.sales_agent_account_id)
	} else if (Object.keys(value).length && !value.sales_agent_account_id) {
		useAlert().openAlert({ type: 'ERROR', msg: 'sales_agent_account_id not found' })
	}
}, { immediate: true })

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const tableFields = ref([
    {
        text: 'NAME',
        value: 'fname'
    },
    {
        text: 'PHONE NUMBER',
        value: 'phone'
    },
    {
        text: 'EMAIL ADDRESS',
        value: 'email'
    },

    {
        text: 'CLOSEST BUSSTOP',
        value: 'closest_busstop'
    },
    {
        text: 'DATE JOINED',
        value: 'created_at'
    },
    {
        text: 'STATUS',
        value: 'active'
    }
])

</script>
