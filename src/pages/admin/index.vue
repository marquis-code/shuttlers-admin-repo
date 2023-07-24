<template>
	<main class="">
		<button class="text-gray-900 mb-6 flex justify-center items-center bg-gray-200 rounded-lg px-5 py-2.5 hover:bg-gray-300  text-xs" @click="$router.go(-1)">
			Go back
		</button>
		<TableAdminTable :table-fields="tableFields" :table-data="tableData" />
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
        key: 'staff',
        value: 'Paul Chukwuka'
    },
    {
        key: 'phone',
        value: '09094187040'
    },
    {
        key: 'email',
        value: 'paul.chukwuka@shuttlers.ng'
    },
    {
        key: 'status',
        value: 'Active'
    },
    {
        key: 'role',
        value: 'User'
    },
    {
        key: 'created_at',
        value: 'July 18, 2023'
    },
    {
        key: 'updatd_at',
        value: 'July 19, 2023'
    }
])
</script>
<style scoped>
</style>

Jot something down
