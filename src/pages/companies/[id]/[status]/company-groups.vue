<template>
	<main class="">
		<Table :loading="loading" :headers="tableFields" :page="page" :has-index="true" :table-data="corporateGroupList">
			<template #header>
				<TableFilter :filter-type="{showSearchBar:true}" @filter="onFilterUpdate" />
			</template>
			<template #item="{ item }">
				<span v-if="item.group_name" class="flex items-center gap-4">
					<span>{{ item.group_name }}</span>
				</span>
			</template>
			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loading" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import { useCorporateGroups } from '@/composables/modules/corporates/id'
const { corporateGroupList, loading, getCorporateGroups, filterData, onFilterUpdate, next, prev, moveTo, total, page } = useCorporateGroups()
getCorporateGroups()
definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
const tableFields = ref([
    {
        text: 'GROUP NAME',
        value: 'group_name'
    },
    {
        text: 'NUMBER OF STAFFS',
        value: 'number_of_staffs'
    },
    {
        text: 'DATE CREATED',
        value: 'createdAt'
    }
])

</script>

<style scoped></style>
