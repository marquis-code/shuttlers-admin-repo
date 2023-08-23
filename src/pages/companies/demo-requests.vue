<template>
	<main class="">
		<Table :loading="loading" :headers="tableFields" :table-data="corporatesList">
			<template #header>
				<TableFilter :filter-type="{showDownloadButton:true, showSearchBar:true}" @filter="onFilterUpdate" />
			</template>

			<template #item="{ item }">
				<span v-if="item.contact_fname" class="flex items-center gap-4">
					<span>{{ item.data.contact_fname }} {{ item.data.contact_lname }}</span>
				</span>

				<span v-else-if="item.created_at">
					{{ useDateFormat(item.data.created_at, "MMMM d, YYYY").value }}
				</span>
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useGetDemoRequest } from '@/composables/modules/corporates/fetch'

const { getCorporatesDemoRequest, loading, corporatesList } = useGetDemoRequest()
getCorporatesDemoRequest()

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
const tableFields = ref([

    {
        text: 'FULL NAME',
        value: 'contact_fname'
    },
    {
        text: 'Email',
        value: 'corporate_email'
    },
    {
        text: 'PHONE NUMBER',
        value: 'corporate_phone'
    },
    {
        text: 'COMPANY NAME',
        value: 'corporate_name'
    },
    {
        text: 'STAFF STRENGTH',
        value: 'staff_strength'
    },
    {
        text: 'REQUEST DATE',
        value: 'created_at'
    }

])

</script>

<style scoped></style>
