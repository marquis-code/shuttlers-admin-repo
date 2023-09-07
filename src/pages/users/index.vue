<template>
	<main class="">
		<Table :loading="loading" :headers="tableFields" :table-data="usersList" :has-options="true" :option="onRowClicked">
			<template #header>
				<TableFilter :filter-type="{showStatus:true, showSearchBar:true, showDownloadButton: true, showDatePicker: true}" @filter="onFilterUpdate" />
			</template>
			<template #item="{ item }">
				<div v-if="item.fname">
					<Avatar :name="item.data.fname" bg="#B1C2D9" />
				</div>
				<span v-if="item.lname" class="flex items-center gap-4">
					<span>{{ item.data.fname }} {{ item.data.lname }}</span>
				</span>
				<span v-else-if="item.created_at">
					{{ useDateFormat(item.data.created_at, "MMMM d, YYYY").value }}
				</span>
				<span v-if="item.wallet" class="flex items-center gap-4">
					<span>{{ convertToCurrency(item.data.wallet.amount) }}</span>
				</span>
				<span v-if="item.corporate_id" class="flex items-center gap-4">
					<span>{{ convertToCurrency(item.data.wallet.credit_amount) }}</span>
				</span>
				<span v-else-if="item.active">
					<StatusBadge :name="item.data.active === '1' ? 'active' : 'inactive'" class="rounded-full text-center w-20 h-8 flex justify-center items-center" />
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

const { getUsersList, loading, usersList, filterData, onFilterUpdate, moveTo, next, prev, total, page } = useGetUsersList()

filterData.status.value = useRoute().query.status === '1' ? 'active' : 'inactive'
getUsersList()

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
        text: 'AVATAR',
        value: 'fname'
    },
    {
        text: 'USER',
        value: 'lname'
    },
    {
        text: 'DATE JOINED',
        value: 'created_at'
    },
    {
        text: 'WALLET BALANCE',
        value: 'wallet'
    },
    {
        text: 'COMPANY BALANCE',
        value: 'corporate_id'
    },
    {
        text: 'STATUS',
        value: 'active'
    }
])

</script>
