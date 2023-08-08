<template>
	<div>
		<Table :show-search-bar="true" :show-date-picker="true" :show-download-button="true" :show-options="true" :show-radio-buttons="true" :headers="tableFields"
			:table-data="tableData" />
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})

const tableFields = ref([
	{
		text: 'Vehicle',
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
