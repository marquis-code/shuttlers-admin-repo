<template>
	<section class="w-5/12 p-4 flex flex-col gap-3 h-full overflow-auto">
		<article v-for="data in activeTripsList" :key="data.id" class="bg-grey10 p-1.5 rounded-2xl flex-col gap-1.5 flex ">
			<div class="flex justify-between flex-wrap md:flex-nowrap gap-1">
				<RouteDescription :destination="data.route.destination" :pickup="data.route.pickup" class="w-7/12" />
				<AvailabiltyBadge :available="data.vehicle_status" class=" ml-auto" />
			</div>

			<div class="bg-light flex flex-col border rounded-xl p-3">
				<div class="flex flex-col border-b pb-3">
					<span class="font-bold">{{ data.driver.fname }} {{ data.driver.lname }}</span>
					<span class="text-grey5 text-sm">{{ data.vehicle.brand }} {{ data.vehicle.name }} ● {{ data.vehicle.registration_number }}</span>
				</div>
				<div class="flex flex-wrap gap-3 mt-3 items-start text-xs">
					<span class="rounded-2xl bg-[#F7F7F7] text-grey3 font-bold px-3 py-1 ">{{ data.route.route_code }}</span>
					<span class="rounded-2xl bg-[#F7F7F7] text-grey3 font-bold px-3 py-1">Started at {{ moment(data.trip_start_time).format('LL') }} {{ moment.utc(data.trip_start_time).format('LT') }}</span>
				</div>
			</div>
		</article>
	</section>
</template>

<script setup lang="ts">
import moment from 'moment'

const props = defineProps({
	activeTripsList: {
		type: Array as PropType<any[]>,
		required: true

	}
})

</script>

<style scoped>

</style>
