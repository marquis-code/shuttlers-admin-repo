<template>
	<main class="">
		<Table :loading="loading" :headers="tableFields" :table-data="filteredStaffs">
			<template #header>
				<TableFilter :filter-type="{showStatus:true, showSearchBar:true}" @filter="onFilterUpdate" />
			</template>
			<template #item="{ item }">
				<span v-if="item.active" :class="[item.data.active == 1 ? 'text-green-500' : 'text-red-500']">
					{{ item.data.active == 1 ? 'Active' : 'Inactive' }}
				</span>
				<span v-else-if="item.created_at">
					{{ useDateFormat(item.data.created_at, "MMMM d, YYYY").value }}
				</span>
				<span v-else-if="item.updated_at">
					{{ useDateFormat(item.data.updated_at, "MMMM d, YYYY").value }}
				</span>
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useGetStaffs } from '@/composables/modules/staffs/fetch'

const { getStaffs, loading, filteredStaffs, filterKeys, onFilterUpdate } = useGetStaffs()
getStaffs()

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
const tableFields = ref([
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
        value: 'active'
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

</script>

<style scoped></style>
