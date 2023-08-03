<template>
	<div>
		<Table :show-two-layer-filter="true" :has-options="true" :headers="tableFields" :table-data="tableData" />
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})

const tableFields = ref([
	{
		text: 'Name',
		value: 'name'
	},
	{
		text: 'Email',
		value: 'email'
	},
	{
		text: 'Number Of Vehicles',
		value: 'number_of_vehicles'
	},
	{
		text: 'Date Created',
		value: 'date_created'
	},
	{
		text: 'Status',
		value: 'status'
	}
])
const tableData = ref([
	{
		name: 'Precious Obasi',
		email: 'precious@mailinator.com',
		number_of_vehicles: '8',
		date_created: 'June 21, 2023',
		status: 'Active'
	}
])
</script>

<style scoped></style>
