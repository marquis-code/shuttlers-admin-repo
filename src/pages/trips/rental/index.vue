<template>
	<main class="">
		<Table :loading="loadingInspectionDays" :headers="tableFields" :table-data="fleetInspectionDaysList">
			<template #header>
				<TableFilter :filter-type="{showSearchBar:true, showDownloadButton: true}" />
			</template>
			<template #item="{ item }">
				<div v-if="item.vehicle">
					<span class="text-blue-500">{{ item.data.vehicle }}</span>
				</div>
				<div v-if="item.registrationNumber" class="">
					<p>
						{{ item.data.registrationNumber }}
					</p>
				</div>
				<div v-if="item.seats">
					<p>
						{{ item.data.seats }}
					</p>
				</div>
				<div v-if="item.inspectionSite">
					<span>{{ item.data.inspectionSite }}</span>
				</div>
				<div v-if="item.inspectionDateAndTime">
					<span>{{ item.data.inspectionDateAndTime }}</span>
				</div>

				<div v-if="item.partner">
					<span class="text-blue-500">{{ item.data.partner }}</span>
				</div>
				<span v-if="item.created_at">
					{{ useDateFormat(item.data.createdAt, "MMMM d, YYYY, HH:MM A").value }}
				</span>
			</template>
		</Table>
	</main>
</template>
<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useGetFleetInspectionDays } from '@/composables/modules/fleets/fetch'

const { getFleetsInspectionDaysList, loadingInspectionDays, fleetInspectionDaysList } = useGetFleetInspectionDays()
getFleetsInspectionDaysList()

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const tableFields = ref([
    {
        text: 'VEHICLE',
        value: 'vehicle'
    },
    {
        text: 'PLATE NUMBER',
        value: 'registrationNumber'
    },
    {
        text: 'CAPACITY',
        value: 'seats'
    },
    {
        text: 'INSPECTION SITE',
        value: 'inspectionSite'
    },
    {
        text: 'INSPECTION DATE AND TIME',
        value: 'inspectionDateAndTime'
    },
	{
        text: 'PARTNER',
        value: 'partner'
    },
    {
        text: 'CREATED AT',
        value: 'created_at'
    }
])

</script>

<style scoped></style>
