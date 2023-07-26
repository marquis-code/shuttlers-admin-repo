<template>
	<div>
		<TableDriversTable :table-data="tableData" :table-fields="tableFields" />
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})

const tableFields = ref([
	{
		name: 'Staff',
		key: 'staff'
	},
	{
		name: 'Phone',
		key: 'phone'
	},
	{
		name: 'Email',
		key: 'email'
	},
	{
		name: 'Status',
		key: 'status'
	},
	{
		name: 'Role',
		key: 'role'
	},
	{
		name: 'Created At',
		key: 'created_at'
	},
	{
		name: 'Updated At',
		key: 'updated_at'
	}
])
const tableData = ref([
	{
		staff: 'Paul Chukwuka',
		phone: '09094187040',
		email: 'paul.chukwuka@shuttlers.ng',
		status: 'Active',
		role: 'User',
		created_at: 'July 18, 2023',
		updated_at: 'July 19, 2023'
	}
])
</script>

<style scoped></style>
