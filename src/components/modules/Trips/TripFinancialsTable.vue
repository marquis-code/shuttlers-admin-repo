<template>
	<main class="">
		<Table :loading="loadingFinancials" :headers="tableFields" :table-data="tripFinancials" :has-options="true">
			<template #header>
				<h1 class="py-3 font-semibold rounded-t-md border pl-4 ">
					Deduction History
				</h1>
				<!-- <TableFilter class="border-none rounded-none" :filter-type="{ showDownloadButton: true}" /> -->
			</template>
			<template #item="{ item }">
				<div v-if="item.route_code">
					<p>{{ item?.data?.route_code ?? 'N/A' }}</p>
				</div>
				<div v-if="item.partner_revenue">
					<p>{{ item?.data?.partner_revenue ?? 'N/A' }}</p>
				</div>
				<div v-if="item.amount">
					<p>{{ convertToCurrency(item?.data?.amount) }}</p>
				</div>
				<span v-else-if="item.createdAt">
					{{ useDateFormat(item?.data?.createdAt, "DD, MMMM YYYY").value }}
				</span>
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { convertToCurrency } from '@/composables/utils/formatter'

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
const tableFields = ref([
    {
        text: 'DATE',
        value: 'createdAt'
    },
    {
        text: 'ROUTE CODE',
        value: 'route_code'
    },
    {
        text: 'PARTNER REVENUE',
        value: 'partner_revenue'
    },
    {
        text: 'DEDUCTED AMOUNT',
        value: 'amount'
    },
    {
        text: 'DESCRIPTION',
        value: 'description'
    }
])

const props = defineProps({
	tripFinancials: {
		type: Array,
		required: true,
		default: () => []
	},
	loadingFinancials: {
		type: Boolean,
		required: true,
		default: false
	}
})

</script>

<style scoped></style>
