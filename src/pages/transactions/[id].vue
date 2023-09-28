<template>
	<main>
		<ButtonGoBack class="mb-6" />
		<div class="card max-w-2xl">
			<div class="card-header">
				Transaction Information
			</div>
			<div class="card-body">
				<h5 v-if="Object.keys(transaction).length === 0 && !loading" class="text-small text-center">
					No Transaction Detail available
				</h5>
				<div v-else-if="loading" class="flex justify-content-center align-items-center">
					<Skeleton height="500px" />
				</div>
				<template v-else>
					<div class="flex justify-between items-center px-12 border-y ">
						<div v-for="row in transactionRow" :key="row.value" class=" py-4 text-center">
							<h6 class="uppercase text-gray-200 text-xs font-medium">
								{{ row.name }}
							</h6>
							<h2 class="text-xl font-bold" :class="row.class">
								{{ row.value }}
							</h2>
						</div>
					</div>

					<ul class="py-3">
						<li v-for="col in transactionCol" :key="col.name" class="flex flex-wrap gap-4 justify-between items-center px-4 py-3  border-b text-sm">
							<span class="font-medium">{{ col.name }} </span>
							<span>{{ col.value }} </span>
						</li>
					</ul>
				</template>
			</div>
		</div>
	</main>
</template>

<script lang="ts" setup>
import { useGetTransactionById } from '@/composables/modules/transactions/fetch'
import { convertToCurrency } from '@/composables/utils/formatter'

const { getTransactionById, loading, transaction } = useGetTransactionById()

const id = useRoute().params.id as string

getTransactionById(id)

const transactionRow = computed(() => {
	if (!transaction.value) return []
	return [
		{ name: 'AMOUNT', value: convertToCurrency(transaction.value.amount), class: transaction.value.type === 'debit' ? 'text-red' : 'text-green' },
		{ name: 'TYPE', value: transaction.value.type, class: transaction.value.type === 'debit' ? 'text-red' : 'text-green' },
		{ name: 'BALANCE BEFORE', value: convertToCurrency(transaction.value.balance_before), class: null },
		{ name: 'BALANCE AFTER', value: convertToCurrency(transaction.value.balance_after), class: null }
	]
})

const transactionCol = computed(() => {
	if (!transaction.value) return []
	return [
		{ name: 'User', value: `${transaction.value.user.fname} ${transaction.value.user.lname}` },
		{ name: 'Reference', value: transaction.value.reference },
		{ name: 'Date', value: transaction.value.created_at },
		{ name: 'Payment Source', value: transaction.value.payment_source },
		{ name: 'Description', value: transaction.value?.title ?? 'N/A' }
	]
})

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
</script>

<style scoped></style>
