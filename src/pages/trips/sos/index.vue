<template>
	<main class="">
		<Table :loading="loadingSos" :headers="tableFields" :table-data="formattedSosList" :has-index="true">
			<!-- <template #header>
				<TableFilter :filter-type="{showDownloadButton:true, showSearchBar:true, showStatus:true}" @filter="" />
			</template> -->
			<!-- <template #footer>
				<TablePagination />
			</template> -->

			<template #item="{ item }">
				<span v-if="item.created_at">
					{{ useDateFormat(item.data.created_at, "MMMM d, YYYY").value }}
				</span>
				<span v-else-if="item.updated_at">
					{{ useDateFormat(item.data.updated_at, "HH:MM AA").value }}
				</span>
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useSosList } from '@/composables/modules/commute/fetch'

const { getSosList, loadingSos, sosList } = useSosList()
getSosList()

const formattedSosList = computed(() =>
     sosList.value.map((i) => {
         return {
             ...i,
             name: `${i.trip.driver.fname} ${i.trip.driver.lname}`,
             route: i.trip.route.route_code,
             vehicle: `${i.trip?.vehicle?.brand} ${i.trip?.vehicle?.name}  (${i.trip?.vehicle?.registration_number})`
         }
    })
)

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
const tableFields = ref([

    {
        text: 'USER  TYPE',
        value: 'initiator_type'
    },
    {
        text: 'NAME',
        value: 'name'
    },
    {
        text: 'ROUTE',
        value: 'route'
    },
    {
        text: 'VEHICLE ',
        value: 'vehicle'
    },
    {
        text: 'STATUS',
        value: 'status'
    },
    {
        text: 'DATE',
        value: 'created_at'
    },
    {
        text: 'TIME',
        value: 'updated_at'
    }

])

</script>

<style scoped></style>
