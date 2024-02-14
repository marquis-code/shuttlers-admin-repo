<template>
	<Modal
		modal="$atts.modal"
		title="Configure commission"
	>
		<form class="flex flex-col gap-6" @submit.prevent="notify">
			<div class="flex justify-between items-center bg-neut1 text-black input-field">
				<span>Current commission</span>
				<span>N/A</span>
			</div>
			<div class="field relative">
				<label for="Reason">Commission (%) </label>
				<input id="First" v-model="sos_data.sos_request_ids.value" type="number" class="input-field" placeholder="Enter value" required>
			</div>

			<div class="flex">
				<button class="btn-primary w-full" :disabled="loading || sos_data.sos_request_ids.value.length === 0">
					<span v-if="!loading" class="flex justify-center items-center gap-2.5">
						Configure
					</span>
					<Spinner v-else />
				</button>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useNotifySos } from '@/composables/modules/commute/sos/create'

const { sos_data, loading, selectedSosTrip, notify } = useNotifySos()

</script>

<style>

</style>
