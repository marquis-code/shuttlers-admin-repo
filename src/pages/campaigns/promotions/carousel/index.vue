<template>
	<main class="">
		<ButtonGoBack class="mb-6" />
		<Table :loading="loading_carousels" :headers="tableFields" :table-data="carouselsList" :has-options="true" :option="onRowClicked">
			<template #header>
				<TableFilter :filter-type="{showStatus:true, showSearchBar:true, showDownloadButton: true, showDatePicker: true}" :selected="log_ids" :checkbox="true" @filter="onFilterUpdate" @checked="log_ids = ($event)" />
			</template>
			<template #item="{ item }">
				<span v-if="item.id">
					<button>Delete</button>
				</span>
			</template>

			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loading_carousels" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import { use_get_carousels } from '@/composables/modules/campaigns/fetch'
// import { useDriverIdDetails } from '@/composables/modules/drivers/id'

const { getCarousels, loading_carousels, carouselsList, moveTo, next, prev, total, page } = use_get_carousels()
getCarousels()

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
        text: 'CAROUSEL TITLE',
        value: 'title'
    },
	{
        text: 'MULTPLE IMAGES',
        value: 'statue'
    },
    {
        text: 'ENABLE',
        value: 'statue'
    }
])

</script>
