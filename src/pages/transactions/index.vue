<template>
	<main class="space-y-10">
		<div class="lg:flex space-y-6 lg:space-y-0 lg:space-x-6 justify-start">
			<div class="rounded-lg bg-white  h-[300px] lg:w-8/12 border">
				<ModulesTransactionsCharts />
			</div>
			<div class="rounded-lg bg-white  lg:w-4/12">
				<ModulesTransactionsDistribution />
			</div>
		</div>

		<!-- <div>
			<Table :show-search-bar="true" :show-options="true" :show-radio-buttons="false" :headers="tableFields" :show-date-range="true"
				:table-data="tableData" />
		</div> -->
	</main>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})

const tableFields = ref([
	{
		text: 'Transaction Date',
		value: 'transactions_date'
	},
	{
		text: 'Description',
		value: 'description'
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
		value: 'source'
	}
])

const tableData = ref([
	{
		transactions_date: '10:00 AM Aug 3, 2023',
		description: 'Payment for AIK from Agege pen cinema bridge, Ogba Road, Ikeja, Nigeria to Ikeja City Mall, Obafemi Awolowo Way, Ojodu, Nigeria for 1 trip on Tuesday, 2023-08-01',
		user: 'Temitope Daoduu',
		amount: '₦340.00',
		source: 'Main Balance'
	}
])

</script>
