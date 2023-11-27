<template>
	<Modal
		modal="$atts.modal"
		title="Booking cancellations modal"
	>
		<form class="flex flex-col gap-6" @submit.prevent="processEnablingBookingCancellation">
			<div class="field relative space-y-6">
				<label for="enableCancelBooking">
					<input id="enableCancelBooking" v-model="form.checked" :checked="form.checked" type="checkbox" class="">
					Enable booking cancellation on admin
				</label>
			</div>
			<div class="flex justify-between items-center gap-x-6">
				<button class="rounded-md py-3 bg-gray-500 text-white w-full" @click="useCompaniesModal().closeCorporateBookingCancellation()">
					Cancel
				</button>
				<button class="btn-primary w-full" :disabled="isFormEmpty">
					<span class="flex justify-center text-sm items-center gap-2.5">
						Proceed
					</span>
				</button>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useCompaniesModal } from '@/composables/core/modals'
const form = reactive({
 checked: false
})

const isFormEmpty = computed(() => {
    return !form.checked
})

const processEnablingBookingCancellation = () => {

}
</script>
t
<style>

</style>
