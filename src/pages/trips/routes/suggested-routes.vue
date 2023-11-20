<template>
	<main class="">
		<Table :loading="loadingSuggestedRoutes" :has-index="true" :page="page" :headers="tableFields" :table-data="suggestedRoutesList">
			<template #header>
				<TableFilter :filter-type="{showSearchBar:true, showDownloadButton: true, showStatus: false, showDatePicker: true}" />
			</template>
			<template #item="{ item }">
				<span v-if="item.created_at">
					{{ useDateFormat(item?.data?.createdAt, "MMMM d, YYYY, HH:MM A").value }}
				</span>
				<div v-if="item.name" class="space-y-2">
					<span class="text-sm">{{ item?.data?.name }}</span><br>
					<span class="text-sm">{{ item?.data?.email?.replace('Email:', '') }}</span><br>
					<span class="text-sm">{{ item?.data?.phone?.replace('Phone:', '') }}</span>
				</div>
				<span v-if="item.departure_time">
					<span>{{ item?.data?.departure_time }} {{ item?.data?.time_of_day }}</span>
				</span>
				<span v-if="item.pickup">
					<span>{{ item?.data?.pickup }}</span>
				</span>
				<span v-if="item.destination">
					<span>{{ item?.data?.destination }}</span>
				</span>
			</template>
			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loadingSuggestedRoutes" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>
<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useGetSuggestedRoutes } from '@/composables/modules/routes/fetch'

const { getSuggestedRoutesList, loadingSuggestedRoutes, suggestedRoutesList, filterData, next, prev, moveTo, page, total } = useGetSuggestedRoutes()
getSuggestedRoutesList()

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
        text: 'USER',
        value: 'name'
    },
    {
        text: 'DEPARTURE TIME',
        value: 'departure_time'
    },
    {
        text: 'FROM',
        value: 'pickup'
    },
    {
        text: 'TO',
        value: 'destination'
    }
])

</script>

<style scoped></style>
