<template>
	<main class="">
		<Table :loading="loading" :headers="tableFields" :table-data="corporatesList" :has-index="true">
			<template #header>
				<TableFilter :filter-type="{showDownloadButton:true, showSearchBar:true}" @filter="onFilterUpdate" />
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useGetCorporateList } from '@/composables/modules/corporates/fetch'

const { getCorporatesList, loading, corporatesList } = useGetCorporateList()
getCorporatesList()

const onFilterUpdate = (data) => {
	console.log(data)
}

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
