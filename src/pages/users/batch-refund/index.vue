<template>
	<main class="">
		<Table :loading="loading" :headers="tableFields" :table-data="refundList">
			<template #header>
				<TableFilter :filter-type="{showStatus:true, showSearchBar:true}" />
			</template>
			<template #item="{ item }">
				<span v-if="item.pickup" class="flex items-center gap-4">
					<span>{{ item.data.pickup }}</span>
				</span>
				<span v-if="item.dropoff" class="flex items-center gap-4">
					<span>{{ item.data.dropoff }}</span>
				</span>
				<span v-if="item.routeCode" class="flex items-center gap-4">
					<span>{{ item.data.routeCode }}</span>
				</span>
				<span v-if="item.userCount" class="flex items-center gap-4">
					<span>{{ item.data.userCount }}</span>
				</span>
				<span v-if="item.status" class="text-xs text-white rounded-lg" :class="[item.data.status === 'processed' ? 'bg-green-500 px-3 py-1' : 'bg-red-500 px-3 py-1']">
					{{ item.data.status }}
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
import { useGetBatchRefundList } from '@/composables/modules/users/batch-refund/fetch'

const { getBatchRefundList, loading, refundList } = useGetBatchRefundList()
getBatchRefundList()

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
const tableFields = ref([
    {
        text: 'PICKUP',
        value: 'pickup'
    },
    {
        text: 'DROPOFF',
        value: 'dropoff'
    },
    {
        text: 'ROUTE CODE',
        value: 'routeCode'
    },
    {
        text: 'USERS COUNT',
        value: 'userCount'
    },
    {
        text: 'STATUS',
        value: 'status'
    },
    {
        text: 'CREATED AT',
        value: 'created_at'
    }
])

</script>

<style scoped></style>
