<template>
	<main class="">
		<Table :loading="loading" :headers="tableFields" :table-data="sortedCorporateList" :has-index="true" :page="page" :option="onRowClicked" :has-options="true">
			<template #header>
				<TableFilter :filter-type="{showDownloadButton:true, showSearchBar:true, showStatus:true}" @filter="onFilterUpdate" @download="downloadReport" />
			</template>
			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loading" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import { useGetCorporateList } from '@/composables/modules/corporates/fetch'
import { useCorporateIdDetails } from '@/composables/modules/corporates/id'

const { getCorporatesList, loading, corporatesList, onFilterUpdate, moveTo, next, prev, total, page, downloadReport } = useGetCorporateList()
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

const sortedCorporateList = computed(() => {
  return corporatesList.value.map((itm:any) => {
    return {
      ...itm,
      application_date: itm.created_at.split(' ')[0]
    }
  }).sort((a, b) => new Date(b.application_date) - new Date(a.application_date))
})

const onRowClicked = (data) => {
	const { selectedCorporate } = useCorporateIdDetails()
    const status = data.active === 1 ? 'active' : 'inactive'
	useRouter().push(`/companies/${data.id}/${status}/company-info`)
	selectedCorporate.value = data
}

</script>

<style scoped></style>
