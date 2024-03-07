<template>
	<main class="">
		<ButtonGoBack class="mb-6" />
		<Table :loading="loading" :headers="tableFields" :table-data="staffsData" :has-options="true" :option="(data)=>$router.push(`/admin/${data.id}/info`)">
			<template #header>
				<TableFilter :filter-type="{showStatus:true, showSearchBar:true}" @filter="onFilterUpdate" />
			</template>
			<template #item="{ item }">
				<span v-if="item.fname" class="flex items-center gap-4">
					<div>
						<Avatar :name="item.data.fname" bg="#B1C2D9" />
					</div>

					<span>{{ item?.data?.fname }} {{ item?.data?.lname }}</span>
				</span>
				<div v-else-if="item.active">
					<StatusBadge :name="item?.data?.active === '1' ? 'active' : 'inactive'" />
				</div>
				<div v-else-if="item.role">
					<span>{{ item?.data?.role.replace('_', ' ') }}</span>
				</div>
				<span v-else-if="item.created_at">
					{{ useDateFormat(item?.data?.created_at, "DD, MMMM YYYY").value }}
				</span>
				<span v-else-if="item.updated_at">
					{{ useDateFormat(item?.data?.updated_at, "DD, MMMM YYYY").value }}
				</span>
				<div v-else-if="item.ab_testing_role">
					<span>{{ item?.data?.ab_testing_role ?? '-' }}</span>
				</div>
			</template>
			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loading" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useGetStaffs } from '@/composables/modules/staffs/fetch'

const { getStaffs, loading, filteredStaffs, filterKeys, onFilterUpdate, total, staffsData, moveTo, next, prev, page } = useGetStaffs()
getStaffs()

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
const tableFields = ref([
    {
        text: 'Staff',
        value: 'fname'
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
    },
    {
        text: 'AB TESTING ROLE',
        value: 'ab_testing_role'
    }
])

</script>

<style scoped></style>
