<template>
	<main class="">
		<Table :loading="loadingSos" :headers="tableFields" :table-data="formattedSosList" :has-index="true">
			<!-- <template #header>
				<TableFilter :filter-type="{showDownloadButton:true, showSearchBar:true, showStatus:true}" @filter="" />
			</template> -->
			<!-- <template #footer>
				<TablePagination />
			</template> -->
		</Table>
	</main>
</template>

<script setup lang="ts">
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
        value: 'corporate_phone'
    },
    {
        text: 'DATE',
        value: 'corporate_phone'
    },
    {
        text: 'TIME',
        value: 'corporate_phone'
    }

])

</script>

<style scoped></style>
