<template>
	<Modal
		modal="$atts.modal"
		title="Reject Rental"
	>
		<form class="flex flex-col gap-6" @submit.prevent="reject">
			<div class="field relative">
				<label for="reason" class="w-full">Rejection Reason</label>
				<textarea
					id="reason"
					v-model="rejection_reason"
					class="input-field"
					rows="4"
					required
				/>
			</div>
			<div class="flex justify-end">
				<button type="submit" class="btn-primary" :disabled="loading">
					{{ loading ? 'Rejecting...' : 'Reject Rental' }}
				</button>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useUpdateCharter } from '@/composables/modules/Rentals'

const { rejection_reason, loading, updateCharterOrder, charterStatus } = useUpdateCharter()

const reject = () => {
charterStatus.value = 'rejected'
updateCharterOrder()
}

</script>
