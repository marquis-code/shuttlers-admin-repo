<template>
	<main class="">
		<div class="mb-6">
			<button class="text text-xs bg-gray-200 text-gray-900 rounded-lg px-3 py-2" @click="$router.go(-1)">
				Go back
			</button>
		</div>
		<Table :show-search-bar="true" :show-options="true" :show-radio-buttons="false" :headers="tableFields"
			:table-data="tableData" />
	</main>
</template>
<script setup lang="ts">
definePageMeta({
	key: 'authentication',
	layout: 'dashboard',
	middleware: ['is-authenticated']
})
const tableFields = ref([
	{
		text: 'S/N',
		value: 's_n'
	},
	{
		text: 'Name',
		value: 'name'
	},
	{
		text: 'Start Date',
		value: 'start_date'
	},
	{
		text: 'End Date',
		value: 'end_date'
	},
	{
		text: 'Created At',
		value: 'created_at'
	},
	{
		text: 'status',
		value: 'status'
	}
])
const tableData = ref([
	{
		s_n: '1',
		name: 'Valentine Campaign',
		start_date: '07/02/2023',
		status: 'Active',
		created_at: 'July 18, 2023',
		end_date: '07/02/2023'
	}

])
</script>

<style scoped></style>

Jot something down
