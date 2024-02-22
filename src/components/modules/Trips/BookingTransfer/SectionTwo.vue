<template>
	<main>
		<Table :loading="loading" :headers="tableFields" :table-data="passengers">
			<template #item="{ item }">
				<span v-if="item.passenger_name" class="flex items-center gap-4">
					<span>{{ item?.data?.passenger_name ?? 'N/A' }}</span>
				</span>

				<span v-if="item.old_pickup" class="flex items-center gap-4">
					<span>{{ item?.data?.old_pickup ?? 'N/A' }}</span>
				</span>
				<div v-if="item.new_pickup" class="w-full">
					<select v-model="item.data.new_pickup" class="input-field w-full">
						<option disabled value="">
							Select Pickup
						</option>
						<option v-for="itm in pickups" :key="itm.id" :value="itm.id">
							{{ itm.name }}
						</option>
					</select>
				</div>
				<span v-if="item.old_dropoff" class="flex items-center gap-4">
					<span>{{ item?.data?.old_dropoff ?? 'N/A' }}</span>
				</span>
				<div v-if="item.new_dropoff" class="gap-4 w-full">
					<select v-model="item.data.new_dropoff" class="input-field w-full">
						<option disabled value="">
							Select Drop-off
						</option>
						<option v-for="itm in dropoffs" :key="itm.id" :value="itm.id">
							{{ itm.name }}
						</option>
					</select>
				</div>
			</template>
		</Table>
		<div class="flex justify-between items-center gap-x-6 mt-10">
			<button type="button" class="bg-gray-500 rounded-md w-full text-white py-2.5" @click="goBack">
				Back
			</button>
			<button :disabled="processing" :class="[processing ? 'opacity-25 cursor-not-allowed' : null]" class="font-[700] w-full py-2.5 text-white flex justify-center items-center rounded-md bg-[#000005]" @click="proceedToAddPassengers">
				<span v-if="!processing" class="flex justify-center text-sm items-center gap-2.5">Transfer</span>
				<Spinner v-else />
			</button>
		</div>
	</main>
</template>

<script setup lang="ts">
import { useBookingTransfer } from '@/composables/modules/trips/transferBooking'
const { loading: processing, setBookingTransferPayload, transferPassengers } = useBookingTransfer()
    const props = defineProps({
		loading: {
			type: Boolean
		},
		passengers: {
			type: Array,
			required: true
		},
		pickups: {
			type: Array,
			required: true
		},
		dropoffs: {
			type: Array,
			required: true
		}
})

const tableFields = ref([
    {
        text: 'PASSENGER NAME',
        value: 'passenger_name'
    },
    {
        text: 'OLD PICKUP',
        value: 'old_pickup'
    },
    {
        text: 'NEW PICKUP',
        value: 'new_pickup'
    },
    {
        text: 'OLD DROPOFF',
        value: 'old_dropoff'
    },
    {
        text: 'NEW DROPOFF',
        value: 'new_dropoff'
    }

])
const emits = defineEmits(['goBack', 'passengers'])
const goBack = () => {
	emits('goBack')
}

const proceedToAddPassengers = () => {
	const modifiedPassengers = props.passengers.map((itm:any) => {
		return {
			dropoff_id: Number(itm.new_dropoff),
			pickup_id: Number(itm.new_pickup),
			user_id: itm.id
		}
	})

	const schedule_bus_stops = { schedule_bus_stops: modifiedPassengers }
	emits('passengers', schedule_bus_stops)
}
</script>
