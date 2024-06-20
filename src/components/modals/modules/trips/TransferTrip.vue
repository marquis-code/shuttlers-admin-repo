<template>
	<Modal
		modal="$atts.modal"
		:title="!is_multiple ? 'Transfer trip' : 'Transfer multiple trip'"
	>
		<form class="flex flex-col gap-4 w-full" @submit.prevent="transferTrip">
			<PartnerSelector @selected="handleSelectedPartner" />
			<div class="flex flex-col gap-2">
				<label class="label">Select Vehicle</label>
				<Skeleton v-if="loading_vehicles" height="45px" radius="10px" />
				<select v-if="!loading_vehicles && vehicles.length >0" v-model="vehicle" required class="input-field">
					<option v-for="n in vehicles" :key="n.id" :value="n">
						<span>
							{{ n?.brand || '' }} {{ n?.name || '' }} ({{ n?.seats }} seats) - {{ n?.registration_number || '' }}
						</span>
					</option>
				</select>
				<span v-if="!loading_vehicles && vehicles.length ===0" class="input-field">No vehicle found</span>
			</div>
			<!-- <div class="flex items-center gap-2">
				<input id="select_driver" v-model="select_driver" type="checkbox" class="disabled:cursor-not-allowed" :disabled="!vehicle.id">
				<label for="select_driver" class="text-sm">Select driver</label>
			</div> -->
			<div class="flex flex-col gap-2">
				<label class="label">Select Driver</label>
				<Skeleton v-if="loading_drivers" height="45px" radius="10px" />
				<select v-if="!loading_drivers && drivers.length>0" v-model="driver_id" required class="input-field">
					<option v-for="n,i in drivers" :key="i" :value="n?.driver?.id">
						<span>
							{{ n?.driver?.fname || '' }} {{ n?.driver?.lname || '' }}
						</span>
					</option>
				</select>
				<span v-if="!loading_drivers && drivers.length===0" class="input-field">No Driver Found</span>
			</div>
			<div class="flex flex-col gap-2">
				<label class="label">Cost of supply</label>
				<input v-model="cost_of_supply" type="number" required class="input-field">
			</div>
			<div class="field relative">
				<label for="reason" class="w-full">Select Reason</label>
				<select id="reason" v-model="reason" class="input-field">
					<option value="">
						Select Event
					</option>
					<option v-for="event in cancellation_reason_events" :key="event" :value="event">
						{{ event }}
					</option>
				</select>
			</div>

			<button type="submit" :disabled="loading || !enableButton" class="text-sm bg-black p-[16px] text-white text-center w-full mt-2 rounded disabled:cursor-not-allowed disabled:bg-[#E0E6ED]">
				{{ loading ? 'processing...' : 'Transfer trip' }}
			</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useTransferTrip } from '@/composables/modules/trips/transfer'
import { cancellation_reason_events } from '@/composables/utils/businesLogic'

const { loading, vehicle, partner, clearObj, vehicles, transferTrip, loading_vehicles, enableButton, loading_drivers, drivers, driver_id, cost_of_supply, is_multiple, reason } = useTransferTrip()
const handleSelectedPartner = (val:Record<string, any>) => {
	partner.value = val
}
onBeforeUnmount(() => clearObj())

</script>

<style scoped>
label{
	margin: 0;
}
</style>
