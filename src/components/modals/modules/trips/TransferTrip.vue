<template>
	<Modal
		modal="$atts.modal"
		title="Transfer trip"
	>
		<form class="flex flex-col gap-4 w-full" @submit.prevent="transferTrip">
			<PartnerSelector @selected="handleSelectedPartner" />
			<div class="flex flex-col gap-2">
				<label class="label">Select Vehicle</label>
				<Skeleton v-if="loading_vehicles" height="45px" radius="10px" />
				<select v-else v-model="vehicle_id" required class="input-field">
					<option v-for="n in vehicles" :key="n.id" :value="n.id">
						{{ n?.brand || '' }} {{ n?.name || '' }} ({{ n?.seats }} seats)
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

const { loading, vehicle_id, partner, clearObj, vehicles, transferTrip, loading_vehicles, enableButton } = useTransferTrip()
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
