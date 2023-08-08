<template>
	<main class="">
		<Table :show-search-bar="false" :show-options="false" :show-radio-buttons="false" :headers="tableFields" :table-data="tableData" />
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
		text: 'ID',
		value: 'id'
	},
	{
		text: 'Campaign',
		value: 'campaign'
	},
	{
		text: 'Promo Code',
		value: 'promo_code'
	},
	{
		text: 'Maximum Number Of User',
		value: 'maximum_number_of_users'
	},
	{
		text: 'Expires At',
		value: 'expires_at'
	},
	{
		text: 'Status',
		value: 'status'
	}
])
const tableData = ref([
	{
		if: '1',
		campaign: 'Testing',
		promo_Code: 'SH3KTW',
		maximum_number_of_users: '10',
		expires_at: 'never',
		status: 'active'
	}

])
</script>

<style scoped></style>

Jot something down
