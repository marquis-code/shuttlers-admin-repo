<template>
	<main class="">
		<Table :loading="loading" :headers="tableFields" :table-data="filteredStaffs" :has-options="true" :option="(data)=>$router.push(`/admin/${data.id}/info`)">
			<template #header>
				<TableFilter :filter-type="{showStatus:true, showSearchBar:true}" @filter="onFilterUpdate" />
			</template>
			<template #item="{ item }">
				<span v-if="item.fname" class="flex items-center gap-4">
					<div>
						<Avatar :name="item.data.fname" bg="#B1C2D9" />
					</div>

					<span>{{ item.data.fname }} {{ item.data.lname }}</span>
				</span>
				<span v-else-if="item.active" :class="[item.data.active == 1 ? 'text-green-500' : 'text-red-500']">
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
        text: 'S/N',
        value: 'fname'
    },
    {
        text: 'TRIP DATE',
        value: 'phone'
    },
    {
        text: 'ROUTE CODE (START TIME)',
        value: 'email'
    },
    {
        text: 'ROUTE',
        value: 'active'
    },
    {
        text: 'PARTNERS NAME',
        value: 'role'
    },
    {
        text: 'VEHICLE NAME',
        value: 'created_at'
    },
    {
        text: 'DRIVER',
        value: 'updated_at'
    },
    {
        text: 'AVERAGE RATING',
        value: 'updated_at'
    },
    {
        text: 'ACTION',
        value: 'updated_at'
    },
    {
        text: 'PASSENGERS',
        value: 'updated_at'
    }
])

</script>

<style scoped></style>
