<template>
	<main class="">
		<Table :show-search-bar="true" :show-options="true" :show-radio-buttons="false" :headers="tableFields" :show-date-picker="true"
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
        text: 'Event Title',
        value: 'event_title'
    },
    {
        text: 'Customer Name',
        value: 'customer_name'
    },
    {
        text: 'Date',
        value: 'date'
    },
    {
        text: 'Event Location',
        value: 'event_location'
    },
    {
        text: 'Trip type',
        value: 'trip_type'
    },
    {
        text: 'No Of Attendees',
        value: 'no_of_attendees'
    },
    {
        text: 'Status',
        value: 'status'
    }
])
const tableData = ref([
    {
        event_title: 'Testing Even ts',
        customer_name: 'Anthony Akpan',
        date: 'Jul 11th 2023',
        event_location: 'IIupeju, Ikeja Nigeria',
        trip_type: 'one way',
        no_of_attendees: '1000',
        status: 'accepted'
    }

])
</script>

<style scoped></style>

Jot something down
