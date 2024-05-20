<template>
	<Modal
		modal="$atts.modal"
		title="Link Vehicle"
	>
		<form class="flex flex-col gap-4 w-full" @submit.prevent="initlinkVehicle">
			<div class="flex flex-col gap-2">
				<p class="text-base text-dark font-medium">
					Select vehicle to link
				</p>
				<p class="text-sm text-grey5">
					You can select multiple vehicles
				</p>
			</div>

			<div class="field relative">
				<label class="label">Select Vehicle</label>
				<InputMultiSelectVehicle :multiple="true" @updated="vehicles = $event" />
			</div>

			<button type="submit" :disabled="loading || !enableButton" class="text-sm bg-black p-[16px] text-white text-center w-full mt-2 rounded disabled:cursor-not-allowed disabled:bg-[#E0E6ED]">
				{{ loading ? 'processing...' : 'Proceed' }}
			</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useLinkVehicle } from '@/composables/modules/partners'

const { loading, vehicles, initlinkVehicle } = useLinkVehicle()
const enableButton = computed(() => {
	return !!(vehicles.value.length)
})

onBeforeUnmount(() => vehicles.value = [])
</script>

<style scoped>
label{
	margin: 0;
}
</style>
