<template>
	<main class="">
		<Table :show-search-bar="true" :show-options="true" :show-radio-buttons="true" :headers="tableFields"
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
        text: 'Staff',
        value: 'staff'
    },
    {
        text: 'Phone',
        value: 'phone'
    },
    {
        text: 'Email',
        value: 'email'
    },
    {
        text: 'Status',
        value: 'status'
    },
    {
        text: 'Role',
        value: 'role'
    },
    {
        text: 'Created At',
        value: 'created_at'
    },
    {
        text: 'Updated At',
        value: 'updated_at'
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

Jot something down
