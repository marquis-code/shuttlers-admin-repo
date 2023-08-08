<template>
	<div>
		<Table :show-search-bar="true" :show-date-picker="true" :show-download-button="true" :show-options="true"
			:show-radio-buttons="true" :headers="tableFields" :table-data="tableData" />
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
		value: 'vehicle'
	},
	{
		text: 'Plate Number',
		value: 'plate_number'
	},
	{
		text: 'Capacity',
		value: 'capacity'
	},
	{
		text: 'Type',
		value: 'type'
	},
	{
		text: 'Average Rating',
		value: 'average_rating'
	},
	{
		text: 'Driver',
		value: 'driver'
	},
	{
		text: 'Date Addes',
		value: 'date_added'
	}
])
const tableData = ref([
	{
		vehicle: 'Toyota Hiace',
	    plate_number: 'JJK-012GS',
		capacity: '16',
		type: 'Mini Bus',
		vehicle_amenities: '',
		average_rating: '0 (0 trips)',
		driver: 'N/A',
		date_added: '2023-08-02'
	}
])
</script>

<style scoped></style>
