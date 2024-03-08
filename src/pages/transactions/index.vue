<template>
	<main>
		<ButtonGoBack class="mb-6" />
		<section class="space-y-10">
			<div class="lg:flex space-y-6 lg:space-y-0 lg:space-x-6 justify-start">
				<div class="card  h-[420px] lg:w-8/12 pb-20">
					<div>
						<h4 class="card-header !mb-1 pb-0">
							Transactions (30 days)
						</h4>
						<small class="text-grey5">User transactions over the last 30 days</small>
					</div>
					<ChartsLineChart :data="last30DaysTransactions" :loading="loading" />
				</div>
				<div class="card h-[420px] lg:w-4/12 pb-24">
					<div>
						<h4 class="card-header !mb-1 pb-0">
							Transaction Distribution
						</h4>
						<small class="text-grey5 ">Type of users transactions (Credits, Debits)</small>
					</div>
					<ChartsDoughnutChart :data="transactionsDistrubution" :loading="loading" />
				</div>
			<!-- <ModulesTransactionsDistribution /> -->
			</div>

			<div>
				<Table :loading="loadingTransactions" :headers="tableFields" :table-data="transactionsList" :has-options="true"
					:option="(data)=> $router.push(`/transactions/${data.id}`)">
					<template #header>
						<TableFilter :filter-type="{showDateRange: true}" @filter="onFilterUpdate" />
					</template>
					<template #item="{ item }">
						<div v-if="item.created_at">
							<span>{{ item.data.created_at }}</span>
						</div>
						<div v-if="item.description" class="">
							<span>{{ item.data.description }}</span>
						</div>
						<div v-if="item.user" class="">
							<span>{{ item.data.user.fname }} {{ item.data.user.lname }}</span>
						</div>

						<div v-if="item.amount" class="">
							<span>{{ convertToCurrency(item.data.amount) }}</span>
						</div>

						<div v-if="item.payment_source" class="">
							<span><span :style="{'color': item.data.type === 'debit' ? '#FF0000': '#32CD32'}">{{ convertToCurrency(item.data.amount) }}</span> {{ item.data.payment_source.replace('_', ' ') }}</span>
						</div>
					</template>

					<template #footer>
						<TablePaginator :current-page="page" :total-pages="total" :loading="loadingTransactions" @move-to="moveTo($event)" @next="next" @prev="prev" />
					</template>
				</Table>
			</div>
		</section>
	</main>
</template>

<script setup lang="ts">

import { useGetTransactionGraph } from '../../composables/modules/transactions/fetch'
import { convertToCurrency } from '@/composables/utils/formatter'
import { useGetRecentTransactionsList } from '@/composables/modules/transactions/fetch'
const { getTransactionList, loadingTransactions, transactionsList, next, prev, onFilterUpdate, moveTo, total, page } = useGetRecentTransactionsList()
const { getTransactionGraph, loading, last30DaysTransactions, transactionsDistrubution } = useGetTransactionGraph()
getTransactionList()
getTransactionGraph()

const tableFields = ref([
	{
		text: 'Transaction Date',
		value: 'created_at'
	},
	{
		text: 'Description',
		value: 'title'
	},
	{
		text: 'User',
		value: 'user'
	},
	{
		text: 'Amount	',
		value: 'amount'
	},
	{
		text: 'Source',
		value: 'payment_source'
	}
])

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})
</script>
