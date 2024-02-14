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
		<Table :loading="loading" :headers="tableFields" :table-data="usersList" :has-options="true" :option="onRowClicked">
			<template #header>
				<TableFilter :filter-type="{showStatus:false, showSearchBar:true, showDownloadButton: true, showDateRange: false}"
					@filter="onFilterUpdate"
					@download="downloadUsers"
				/>
			</template>
			<template #item="{ item }">
				<div v-if="item.fname">
					<Avatar :src="item?.data?.avatar" :name="item?.data?.fname" bg="#B1C2D9" />
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
import { convertToCurrency } from '@/composables/utils/formatter'
import { useGetUsersList } from '@/composables/modules/users/fetch'
import { useUserIdDetails } from '@/composables/modules/users/id'

const { getUsersList, loading, usersList, filterData, onFilterUpdate, moveTo, next, prev, total, page, downloadUsers } = useGetUsersList()

// getUsersList()
const onRowClicked = (data) => {
	const { selectedUser } = useUserIdDetails()
	useRouter().push(`/users/${data.id}/user-info`)
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
        text: 'BUS STOP',
        value: '_'
    },
    {
        text: 'ROUTES CREATED',
        value: '_'
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
