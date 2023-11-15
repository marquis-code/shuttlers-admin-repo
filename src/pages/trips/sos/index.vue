<template>
	<main class="">
		<Table :loading="loadingSos" :headers="tableFields" :table-data="formattedSosList" :has-index="true" :has-options="true" :option="(data)=> $router.push(`/trips/sos/${data.trip_id}`)">
			<template #header>
				<TableFilter :filter-type="{showSearchBar:true }" />
			</template>

			<template #item="{ item }">
				<div v-if="item.location">
					<RouteDescription :pickup="item.data.trip.route.pickup" :destination="item.data.trip.route.destination" />
				</div>
				<span v-else-if="item.created_at">
					{{ useDateFormat(item.data.created_at, "MMMM D, YYYY").value }}
				</span>
				<span v-else-if="item.status" class="flex">
					<StatusBadge :name="item.data.status" />
				</span>
				<div v-else-if="item.trip_id" class="flex">
					<button class="btn-primary-xs" :disabled="item.data.sos_provider_ref" @click.stop="openNotifier(item.data)">
						{{ item.data.sos_provider_ref ? 'Notified' : 'Notify' }}
					</button>
				</div>
			</template>
			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loadingSos" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import moment from 'moment'
import { useDateFormat } from '@vueuse/core'
import { useSosList } from '@/composables/modules/commute/sos/fetch'
import { useNotifySos } from '@/composables/modules/commute/sos/create'

const { openNotifier } = useNotifySos()

const { getSosList, loadingSos, sosList, page, total, prev, next, moveTo } = useSosList()
getSosList()

const formattedSosList = computed(() =>
     sosList.value.map((i) => {
         return {
             ...i,
             route: i.trip.route.route_code,
             vehicle: `${i.trip?.vehicle?.brand} ${i.trip?.vehicle?.name}  (${i.trip?.vehicle?.registration_number})`,
             partner: `${i.trip.vehicle?.partner?.company_name || 'N/A'}`,
             time: useDateFormat(i.created_at, 'HH:mm:ss AA').value
         }
    })
)

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
const tableFields = ref([

    {
        text: 'ROUTE',
        value: 'location'
    },
    {
        text: 'ROUTE Code',
        value: 'route'
    },
    {
        text: 'VEHICLE ',
        value: 'vehicle'
    },
    {
        text: 'VEHICLE PARTNER',
        value: 'partner'
    },
    {
        text: 'DATE',
        value: 'created_at'
    },
    {
        text: 'STATUS',
        value: 'status'
    },
    {
        text: '',
        value: 'trip_id'
    }

])

</script>

<style scoped></style>
