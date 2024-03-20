<template>
	<main class="flex flex-col gap-6">
		<section class="flex gap-4 w-full">
			<div class="flex flex-col card min-w-[270px] px-6">
				<span class="text-sm text-grey5">Agent count</span>
				<span class="text-3xl font-bold">200</span>
			</div>
			<div class="flex flex-col card min-w-[270px] px-6">
				<span class="text-sm text-grey5">Total no. of onboarded users</span>
				<span class="text-3xl font-bold">200</span>
			</div>
			<div class="flex flex-col card min-w-[270px] px-6">
				<span class="text-sm text-grey5">Total amount disbursed</span>
				<span class="text-3xl font-bold">₦200,000.00</span>
			</div>
		</section>
		<Table :loading="loading" :headers="tableFields" :table-data="agentsList" :has-options="true" :option="onRowClicked" :has-index="true" :page="page">
			<template #header>
				<TableFilter :filter-type="{ showSearchBar:true, showDownloadButton: true,}"
				/>
			</template>
			<template #item="{ item }">
				<div v-if="item.fname">
					{{ item?.data?.fname }} {{ item?.data?.lname }}
				</div>
				<div v-if="item.phone">
					{{ item?.data?.phone ?? 'N/A' }}
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
					<StatusBadge :name="item?.data?.sales_agent_account_active === '1' ? 'active' : 'inactive'" />
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
import { convertToCurrency } from '@/composables/utils/formatter'
import { useGetAgentsList } from '@/composables/modules/agents/fetch'
import { useUserIdDetails } from '@/composables/modules/users/id'

const { getAgentsList, loading, agentsList, moveTo, next, prev, total, page } = useGetAgentsList()

getAgentsList()
const onRowClicked = (data) => {
	const { selectedUser } = useUserIdDetails()
	useRouter().push(`/agents/${data.id}/agent-info`)
	selectedUser.value = data
}

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
        text: 'ROUTES CREATED',
        value: 'id'
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
