<template>
	<Modal
		modal="$atts.modal"
		title="Select reason"
	>
		<form class="flex flex-col gap-6" @submit.prevent="notify">
			<div class="field relative">
				<label for="Reason">Reason</label>
				<TagSelect v-model="sos_data.sos_request_ids.value" :options="selectedSosTrip?.requests" display-key="sos_reason" placeholder="Select reason" />
			</div>

			<div class="flex">
				<button class="btn-primary w-full" :disabled="loading || sos_data.sos_request_ids.value.length === 0">
					<span v-if="!loading" class="flex justify-center items-center gap-2.5">
						Notify
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
