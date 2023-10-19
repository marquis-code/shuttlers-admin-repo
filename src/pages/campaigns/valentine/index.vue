<template>
	<main class="">
		<Table :loading="loading_campaigns" :headers="tableFields" :table-data="campaignsList" :has-index="true" :page="page" :has-options="true" :option="onRowClicked">
			<template #header>
				<TableFilter :filter-type="{showStatus:true, showSearchBar:true, showDownloadButton: true, showDatePicker: true}" :selected="log_ids" :checkbox="true" @filter="onFilterUpdate" @checked="log_ids = ($event)" />
			</template>
			<template #item="{ item }">
				<span v-if="item.created_at">
					{{ useDateFormat(item.data.created_at, "MMMM d, YYYY").value }}
				</span>
				<span v-if="item.start_date">
					{{ useDateFormat(item.data.start_date, "MMMM d, YYYY").value }}
				</span>
				<span v-if="item.end_date">
					{{ useDateFormat(item.data.end_date, "MMMM d, YYYY").value }}
				</span>
				<span v-else-if="item.is_active">
					<StatusBadge :name="item.data.is_active === 1 ? 'active' : 'inactive'" />
				</span>
			</template>

			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loading_campaigns" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { use_get_campaigns } from '@/composables/modules/campaigns/fetch'
// import { useDriverIdDetails } from '@/composables/modules/drivers/id'

const { getCampaigns, loading_campaigns, campaignsList, moveTo, next, prev, total, page } = use_get_campaigns()

// filterData.status.value = useRoute().query.status === '1' ? 'active' : 'inactive'
getCampaigns()

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
        text: 'NAME',
        value: 'name'
    },
    {
        text: 'START DATE',
        value: 'start_date'
    },
    {
        text: 'END DATE',
        value: 'end_date'
    },
    {
        text: 'CREATED AT',
        value: 'created_at'
    },
    {
        text: 'STATUS',
        value: 'is_active'
    }
])

</script>
