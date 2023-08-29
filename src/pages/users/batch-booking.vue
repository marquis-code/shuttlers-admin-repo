<template>
	<main class="">
		<Table :loading="loading" :headers="tableFields" :table-data="batchBookingList">
			<template #header>
				<TableFilter :filter-type="{showStatus:true, showSearchBar:true}"/>
			</template>
			<template #item="{ item }">
				<div v-if="item.fname">
					<Avatar :name="item.data.fname" bg="#B1C2D9" />
				</div>
				<span v-if="item.lname" class="flex items-center gap-4">
					<span>{{ item.data.fname }} {{ item.data.lname }}</span>
				</span>
				<span v-if="item.wallet" class="flex items-center gap-4">
					<span>{{ item.data.wallet.amount }}</span>
				</span>
				<span v-if="item.corporate_id" class="flex items-center gap-4">
					<span>{{ item.data.wallet.credit_amount }}</span>
				</span>
				<span class="text-white text-xs rounded-lg" v-else-if="item.active" :class="[item.data.active == 1 ? 'bg-green-500 px-3 py-1' : 'bg-red-500 px-3 py-1']">
					{{ item.data.active == 1 ? 'Active' : 'Inactive' }}
				</span>
				<span v-else-if="item.created_at">
					{{ useDateFormat(item.data.created_at, "MMMM d, YYYY").value }}
				</span>
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useGetBatchBookingList } from '@/composables/modules/user/fetch'

const { getBatchBookingList, loading, batchBookingList } = useGetBatchBookingList()
getBatchBookingList()

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
const tableFields = ref([
    {
        text: 'PICKUP',
        value: 'fname'
    },
    {
        text: 'DROPOFF',
        value: 'lname'
    },
    {
        text: 'ROUTE CODE',
        value: 'created_at'
    },
    {
        text: 'USERS COUNT',
        value: 'requested_by'
    },
    {
        text: 'STATUS',
        value: 'corporate_id'
    },
    {
        text: 'CREATED AT',
        value: 'created_at'
    }
])

</script>

<style scoped></style>
