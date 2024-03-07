<template>
	<main class="">
		<ButtonGoBack class="mb-6" />
		<Table :loading="loading_banners" :headers="tableFields" :table-data="banersList" :has-options="true" :option="onRowClicked">
			<template #header>
				<TableFilter :filter-type="{showStatus:true, showSearchBar:true, showDownloadButton: true, showDatePicker: true}" :selected="log_ids" :checkbox="true" @filter="onFilterUpdate" @checked="log_ids = ($event)" />
			</template>
			<template #item="{ item }">
				<span v-if="item.id">
					<button>Delete</button>
				</span>
			</template>

			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loading_banners" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import { use_get_baners } from '@/composables/modules/campaigns/fetch'
import { useDriverIdDetails } from '@/composables/modules/drivers/id'

const { getBaners, loading_banners, banersList, moveTo, next, prev, total, page } = use_get_baners()
getBaners()

// const onRowClicked = (data) => {
// 	const { selectedDriver } = useDriverIdDetails()
// 	useRouter().push(`/drivers/${data.id}/driver-info`)
// 	selectedDriver.value = data
// }

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
const tableFields = ref([
    {
        text: 'DATE',
        value: 'created_at'
    },
    {
        text: 'BANNER TITLE',
        value: 'title'
    },
    {
        text: 'ENABLE',
        value: 'statue'
    },
    {
        text: 'ACTIONS',
        value: 'id'
    }
])

</script>
