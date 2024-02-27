<template>
	<main class="flex flex-col gap-4">
		<ButtonGoBack :url="`/partners/${id}/${accountSid}/partner-info`" />
		<div class="flex items-center gap-4">
			<div v-for="n in views" :key="n" class="flex items-center gap-2">
				<input v-model="active" :value="n" type="radio">
				<label>{{ n }}</label>
			</div>
		</div>

		<Table
			:loading="loading"
			:has-index="true"
			:headers="tableFields"
			:table-data="pastPayouts"
			:has-options="true"
			:page="page"
		>
			<template #header>
				<TableFilter
					:filter-type="{
						showDateRange: true
					}"
					@filter="onFilterUpdate"
				/>
			</template>
			<template #item="{ item }">
				<p v-if="item.date" class="text-sm whitespace-nowrap">
					{{ moment(item.data.createdAt).format('LL') }}
				</p>
				<p v-if="item.time" class="text-sm whitespace-nowrap">
					{{ moment.utc(item.data.createdAt).format('LT') }}
				</p>
				<p v-if="item.period && active === 'Payout'" class="text-sm whitespace-nowrap">
					{{ moment(item.data.periodStart).format('ll') }} - {{ moment(item.data.periodStart).format('ll') }}
				</p>
				<p v-if="item.bank_name" class="text-sm whitespace-nowrap">
					{{ item.data?.bankName || 'N/A' }}
				</p>
				<p v-if="item.acc_number" class="text-sm whitespace-nowrap">
					{{ item.data?.accountNumber || 'N/A' }}
				</p>
			</template>

			<template #footer>
				<TablePaginator
					:current-page="page"
					:total-pages="total"
					:loading="loading"
					@move-to="moveTo($event)"
					@next="next"
					@prev="prev"
				/>
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import moment from 'moment'
import { usePastPayouts } from '@/composables/modules/pastpayouts/fetch'

const id = useRoute().params.id as string
const accountSid = useRoute().params.accountSid as string
const { page, total, loading, moveTo, next, prev, pastPayouts, getPastPayouts, onFilterUpdate, views, active } = usePastPayouts()

const tableFields = ref([
	{ value: 'date', text: 'Date' },
	{ value: 'time', text: 'Time' },
	{ value: 'period', text: 'Payout period' },
	{ value: 'bank_name', text: 'Bank name' },
	{ value: 'acc_number', text: 'Account number' }
])

active.value = 'Payout'
getPastPayouts()
definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})
</script>

<style scoped>
label,span,p{
	margin: 0 !important;
}
</style>
