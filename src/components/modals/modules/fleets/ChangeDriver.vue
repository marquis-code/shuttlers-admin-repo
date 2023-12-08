<template>
	<Modal
		modal="$atts.modal"
		title="Change driver"
	>
		<form class="flex flex-col gap-4 w-full" @submit.prevent="updateVehicleDriver">
			<div class="">
				<div class="w-full">
					<DriverSelector v-model="driver" class="w-full" />
				</div>
			</div>
			<button type="submit" :disabled="loading"
				class="mt-10 bg-black p-[16px] text-white text-center w-full border-none outline-none rounded disabled:cursor-not-allowed disabled:bg-[#E0E6ED]"
			>
				{{ loading ? 'processing...' : 'update driver' }}
			</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useUpdateVehicle } from '@/composables/modules/fleets/updateFleetDriver'

const { loading, updateVehicleDriver } = useUpdateVehicle()

</script>

<style scoped>
label{
	margin: 0;
}
</style>
