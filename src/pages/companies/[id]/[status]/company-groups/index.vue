<template>
	<main class="">
		<ButtonGoBack url="/companies" class="mb-6" />
		<Table :loading="loading" :headers="tableFields" :page="page" :has-index="true" :table-data="groups" :option="onRowClicked">
			<template #header>
				<TableFilter :filter-type="{showSearchBar:true}" @filter="onFilterUpdate" />
			</template>
			<template #item="{ item }">
				<span v-if="item.created_at" class="flex items-center gap-4">
					<span>{{ useDateFormat(item?.data?.created_at, "DD, MMMM YYYY").value }}</span>
				</span>
			</template>
			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total_pages" :loading="loading" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useCorporateGroupByGroupId } from '@/composables/modules/corporates/getCorporateGroupByGroupId'
import { useCorporateGroups } from '@/composables/modules/corporates/id'
import { useFetchGroup } from '@/composables/modules/corporates/group'
// const { corporateGroupList, loading, getCorporateGroups, filterData, onFilterUpdate, next, prev, moveTo, total, page } = useCorporateGroups()
const { loading, fetchGroup, groups, onFilterUpdate, next, prev, moveTo, total_pages, page } = useFetchGroup()
// getCorporateGroups()
fetchGroup()

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
const tableFields = ref([
    {
        text: 'GROUP NAME',
        value: 'name'
    },
    {
        text: 'NUMBER OF STAFFS',
        value: 'staff_count'
    },
    {
        text: 'DATE CREATED',
        value: 'created_at'
    }
])

const onRowClicked = (data) => {
    const route = useRoute()
	const { selectedCorporateGroup } = useCorporateGroupByGroupId()
    useRouter().push(`/companies/${route.params.id}/${route.params.status}/company-groups/${data.id}`)
	selectedCorporateGroup.value = data
}

</script>

<style scoped></style>
