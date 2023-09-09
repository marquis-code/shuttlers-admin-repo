<template>
	<main class="">
		<Table :loading="loadingFleets" :headers="tableFields" :table-data="fleetsList">
			<template #header>
				<TableFilter :filter-type="{showSearchBar:true, showDownloadButton: true, showStatus: true, showDatePicker: true}" />
			</template>
			<template #item="{ item }">
				<div v-if="item.vehicle">
					<span class="text-blue-600">{{ item.data.vehicle }}</span>
				</div>
				<div v-if="item.registration_number" class="">
					<p class="text-blue-600">
						{{ item.data.registration_number }}
					</p>
				</div>
				<div v-if="item.seats">
					<p>
						{{ item.data.seats }}
					</p>
				</div>
				<div v-if="item.type">
					<span>{{ item.data.type }}</span>
				</div>

				<div v-if="item.rating">
					<span>{{ item.data.rating }}</span>
				</div>
				<div>
					<div v-if="item.amenities">
						<p>
							{{ item.data.amenities }}
						</p>
					</div>
				</div>
				<div>
					<div v-if="item.drivers">
						<p v-for="(i, index) in item.data.drivers" :key="index" class="text-blue-600">
							{{ i?.fname ?? 'N/A' }} {{ i?.lname ?? 'N/A' }}
						</p>
					</div>
				</div>
				<span v-if="item.created_at">
					{{ useDateFormat(item.data.createdAt, "MMMM d, YYYY").value }}
				</span>
			</template>
		</Table>
	</main>
</template>
<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useGetFleets } from '@/composables/modules/fleets/fetch'

const { getFleetsList, loadingFleets, fleetsList } = useGetFleets()
getFleetsList()

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
        value: 'registration_number'
    },
    {
        text: 'CAPACITY',
        value: 'seats'
    },
    {
        text: 'TYPE',
        value: 'type'
    },
    {
        text: 'VEHICLE AMENITIES',
        value: 'amenities'
    },
	{
        text: 'AVERAGE RATING',
        value: 'rating'
    },
    {
        text: 'DRIVER',
        value: 'drivers'
    },
	{
        text: 'DATE ADDED',
        value: 'created_at'
    }
])

</script>

<style scoped></style>
