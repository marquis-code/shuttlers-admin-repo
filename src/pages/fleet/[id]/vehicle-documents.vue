<template>
	<main class="">
		<ButtonGoBack class="mb-6" />
		<Table :loading="loading" :headers="tableFields" :table-data="fleetDocuments" :has-options="true" :option="(data)=>$router.push(`/admin/${data.id}/info`)">
			<template #header>
				<TableFilter :filter-type="{showStatus:false, showSearchBar:false}" />
			</template>
			<template #item="{ item }">
				<p v-if="item.type" class="flex items-center gap-4">
					{{ item?.data?.document_type }}
				</p>
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useGetFleetDocuments } from '@/composables/modules/fleets/id'

const { getFleetsDocuments, loading, fleetDocuments, moveTo, total, page, next, prev } = useGetFleetDocuments()
getFleetsDocuments()

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
const tableFields = ref([
    {
        text: 'TYPE',
        value: 'type'
    },
    {
        text: 'CATEGORY',
        value: 'category'
    },
    {
        text: 'DOCUMENT',
        value: 'document'
    },
    {
        text: 'EXPIRY DATE',
        value: 'expiry_date'
    },
    {
        text: 'STATUS',
        value: 'status'
    },
    {
        text: 'DATE CREATED',
        value: 'created_at'
    },
    {
        text: 'ACTIONS',
        value: 'actions'
    }
])

</script>

<style scoped></style>
