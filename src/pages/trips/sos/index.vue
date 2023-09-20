<template>
	<main class="">
		<Table :loading="loadingSos" :headers="tableFields" :table-data="formattedSosList" :has-index="true">
			<template #header>
				<TableFilter :filter-type="{showSearchBar:true }" />
			</template>

			<template #item="{ item }">
				<span v-if="item.created_at">
					{{ useDateFormat(item.data.created_at, "MMMM d, YYYY").value }}
				</span>
				<span v-else-if="item.status" class="flex">
					<StatusBadge :name="item.data.status" />
				</span>
			</template>
			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loadingSos" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useSosList } from '@/composables/modules/commute/fetch'

const { getSosList, loadingSos, sosList, page, total, prev, next, moveTo } = useSosList()
getSosList()

const formattedSosList = computed(() =>
     sosList.value.map((i) => {
         return {
             ...i,
             name: `${i.initiator.fname} ${i.initiator.lname}`,
             route: i.trip.route.route_code,
             vehicle: `${i.trip?.vehicle?.brand} ${i.trip?.vehicle?.name}  (${i.trip?.vehicle?.registration_number})`,
             time: useDateFormat(i.created_at, 'HH:mm:sss AA').value
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
        text: 'REASON',
        value: 'sos_reason'
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
        value: 'time'
    }

])

</script>

<style scoped></style>
