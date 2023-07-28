<template>
	<div>
		<Table :show-two-layer-filter="true" :has-options="true" :headers="tableFields" :table-data="tableData" :checkbox="true" />
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})

const tableFields = ref([
	{
		text: 'User',
		value: 'user'
	},
	{
		text: 'Average Rating',
		value: 'average_rating'
	},
	{
		text: 'Avatar',
		value: 'avatar'
	},
	{
		text: 'Date Joined',
		value: 'date_joined'
	},
	{
		text: 'Status',
		value: 'status'
	}
])
const tableData = ref([
	{
		user: 'Paul Chukwuka',
		average_rating: '0 (0 trips)',
		avatar: 'PC',
		date_joined: '24/07/2023',
		status: 'Active'
	}
])
</script>

<style scoped></style>
