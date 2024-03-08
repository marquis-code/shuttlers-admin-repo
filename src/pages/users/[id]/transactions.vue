<template>
	<main class="">
		<ButtonGoBack class="mb-6" />
		<Table :loading="loading" :headers="tableFields" :table-data="transactionsList" :has-options="true" :option="onRowClicked">
			<template #header>
				<TableFilter
					:filter-type="{
						showSearchBar: true,
						showDateRange: true
					}"
					@filter="onFilterUpdate"
				/>
			</template>
			<template #item="{ item }">
				<div v-if="item.created_at">
					<p>{{ moment(item.data.created_at).format('LT') }}</p>
					<p>{{ moment(item.data.created_at).format('LL') }}</p>
				</div>
				<div v-if="item.title">
					<span>{{ item?.data?.title ?? 'N/A' }}</span>
				</div>
				<div v-if="item.amount">
					<span :class="[ item.data.type === 'credit' ? 'text-green': 'text-red']">
						{{ convertToCurrency(item?.data?.amount) }}
					</span>
				</div>
				<div v-if="item.payment_source">
					<span>{{ item?.data?.payment_source === 'instant_payment' ? `${item?.data?.payment_source}(Corporate pay)` : item?.data?.payment_source }}</span>
				</div>
			</template>
			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loading" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>
<script setup lang="ts">
import moment from 'moment'
import { useDateFormat } from '@vueuse/core'
import { convertToCurrency } from '@/composables/utils/formatter'
import { useUserTransactions } from '@/composables/modules/users/inner/transactions'
const { transactionsList, loading, getUserTransactionsById, moveTo, next, prev, total, page, onFilterUpdate } = useUserTransactions()

getUserTransactionsById()

const onRowClicked = (data) => {
	useRouter().push(`/transactions/${data.id}`)
}

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
