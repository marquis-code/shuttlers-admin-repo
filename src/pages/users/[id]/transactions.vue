<template>
	<main class="">
		<Table :loading="loading" :headers="tableFields" :table-data="transactionsList">
			<template #header>
				<TableFilter :filter-type="{showSearchBar:true}" />
			</template>
			<template #item="{ item }">
				<div v-if="item.created_at">
					<span>{{ useDateFormat(item.data.created_at, "hh:mm A, MMMM d, YYYY").value }}</span>
				</div>
				<div v-if="item.title">
					<span>{{ item?.data?.title ?? 'N/A' }}</span>
				</div>
				<div v-if="item.amount">
					<span :style="{color: item.data.type === 'credit' ? &quot;#e63757&quot; : &quot;#00d97e&quot;}">
						₦ {{ convertToCurrency(item?.data?.amount) }}
					</span>
				</div>
				<div v-if="item.payment_source">
					<span>{{ item?.data?.payment_source ?? 'N/A' }}</span>
				</div>
			</template>
		</Table>
	</main>
</template>
<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { convertToCurrency } from '@/composables/utils/formatter'
import { useUserTransactions } from '@/composables/modules/users/transactions'
const { transactionsList, loading, getUserTransactionsById } = useUserTransactions()
const id = useRoute().params.id as string
getUserTransactionsById(id)

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const tableFields = ref([
    {
        text: 'TRANSACTION DATE',
        value: 'created_at'
    },
    {
        text: 'DESCRIPTION',
        value: 'title'
    },
    {
        text: 'AMOUNT',
        value: 'amount'
    },
    {
        text: 'SOURCE',
        value: 'payment_source'
    }
])

</script>

<style scoped></style>
