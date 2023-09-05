<template>
	<main class="">
		<Table :loading="loading" :headers="tableFields" :table-data="corporatesList" :has-index="true">
			<template #header>
				<TableFilter :filter-type="{showDownloadButton:true, showSearchBar:true, showStatus:true}" @filter="onFilterUpdate" />
			</template>
			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loading" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import { useGetCorporateList } from '@/composables/modules/corporates/fetch'

const { getCorporatesList, loading, corporatesList, onFilterUpdate, moveTo, next, prev, total, page } = useGetCorporateList()
getCorporatesList()

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
const tableFields = ref([

    {
        text: 'CORPORATE NAME',
        value: 'corporate_name'
    },
    {
        text: 'Email',
        value: 'email'
    },
    {
        text: 'CORPORATE PHONE',
        value: 'corporate_phone'
    }

])

</script>

<style scoped></style>
