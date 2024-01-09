<template>
	<section>
		<Table :loading="loadingRouteDrivers" :headers="tableFields" :table-data="computedRouteDrivers " :has-options="true">
			<template #header>
				<h1 class="border bg-white py-3 text-sm pl-4">
					Drivers on this route
				</h1>
			</template>
			<template #item="{ item }">
				<div v-if="item.driver" class="space-y-1 text-blue-600 py-2">
					<NuxtLink :to="`/drivers/${item?.data?.id}/driver-info`" class="block text-xs">
						{{ item.data.driver }}
					</NuxtLink>
				</div>
				<div v-if="item.type" class="space-y-1 text-blue-600 py-2">
					<NuxtLink :to="`/fleet/${item?.data?.vehicle?.id}/vehicle-info`" class="block text-xs">
						{{ item.data.type }}
					</NuxtLink>
				</div>
				<div v-if="item.itinerary" class="space-y-1 py-2">
					<span class="block text-xs">{{ item.data.itinerary }}</span>
				</div>
			</template>
		</Table>
	</section>
</template>

<script setup lang="ts">
import { useRouteIdDetails, useRoutePaymentOptionsById, useTripStartTimeById, useRoutePassengersById, useRouteDriversById } from '@/composables/modules/routes/id'
const { loadingRouteDrivers, getRouteDriversById, routeDrivers } = useRouteDriversById()
const tableFields = ref([
	{
		text: 'DRIVER',
		value: 'driver'
	},
	{
		text: 'TYPE',
		value: 'type'
	},
	{
		text: 'ITINERARY',
		value: 'itinerary'
	}
])

const computedRouteDrivers = computed(() => {
	if (!routeDrivers.value.length) return []
    return routeDrivers.value.map((i) => {
         return {
             ...i,
             driver: `${i?.fname} ${i?.lname} - ${i?.email}`,
			 type: `${i?.vehicle?.type} . ${i?.vehicle?.seats} seater`,
			 itinerary: i?.itinerary?.trip_time
         }
    })
})
const id = useRoute().params.id as string
getRouteDriversById(id)
</script>

<style>

</style>
