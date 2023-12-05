<template>
	<Modal
		modal="$atts.modal"
		title="Booking cancellations modal"
	>
		<form class="flex flex-col gap-6" @submit.prevent="processEnablingBookingCancellation">
			<div v-if="activeStep === 'walletOptions'" class="space-y-6">
				<div class="field relative space-y-6">
					<!-- <label for="enableCancelBooking">
						<input id="enableCancelBooking" v-model="form.restrict_admin_bookings_cancellation" :checked="cancellationOptions?.restrict_admin_bookings_cancellation" type="checkbox" class="">
						Enable booking cancellation on admin
					</label> -->
					<label v-for="(val, key) in cancellationOptions" :key="key" :for="key">
						<input :id="key" v-model="checkedItems[key]" :checked="val" type="checkbox" class=" pr-4">
						{{ key.replace('_', ' ') }}
					</label>
				</div>
				<div class="flex justify-between items-center gap-x-6">
					<div class="rounded-md cursor-pointer text-center py-3 bg-gray-500 text-white w-full" @click="useCompaniesModal().closeCorporateBookingCancellation()">
						Cancel
					</div>
					<div class="btn-primary w-full" @click="activeStep = 'confirmation'">
						Proceed
					</div>
				</div>
			</div>
			<div v-if="activeStep === 'confirmation'" class="space-y-6">
				<div class="flex items-center gap-x-3 bg-indigo-300 rounded-2xl py-3 px-6">
					<img src="@/assets/icons/source/caution.svg" class="h-6 w-6" alt="">
					<p class="text-white text-sm">Are you sure you want to save this changes ?</p>
				</div>
				<div class="field relative">
					<label for="confirmation_password">Please enter your password to save your changes</label>
					<input id="confirmation_password" v-model="form.verification_password" type="password" class="input-field">
				</div>
				<div class="flex justify-between items-center gap-x-6">
					<button type="button" class="rounded-md py-3 bg-gray-500 text-white w-full" @click="activeStep = 'walletOptions'">
						Cancel
					</button>
					<button type="submit" class="btn-primary w-full">
						<span v-if="!loading" class="flex justify-center text-sm items-center gap-2.5">
							Proceed
						</span>
						<Spinner v-else />
					</button>
				</div>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useCorporateIdDetails } from '@/composables/modules/corporates/id'
import { useCoporateBookingCancellationOptions } from '@/composables/modules/corporates/configureBookingCancellation'
import { useCompaniesModal } from '@/composables/core/modals'
const { selectedCorporate } = useCorporateIdDetails()
const { populateBookingCancellationOptionForm, configureBookingCancellationOption, loading, corporateBookingCancellationForm } = useCoporateBookingCancellationOptions()
const form = reactive({
 restrict_admin_bookings_cancellation: false,
 verification_password: ''
})
const activeStep = ref('walletOptions')

const isFormEmpty = computed(() => {
    return !form.restrict_admin_bookings_cancellation
})

const cancellationOptions = computed(() => {
	return {
		restrict_admin_bookings_cancellation: selectedCorporate.value.restrict_admin_bookings_cancellation === 1
	}
})
const checkedItems = ref({}) as any
const processEnablingBookingCancellation = () => {
	const payload = {
		restrict_admin_bookings_cancellation: checkedItems?.value.restrict_admin_bookings_cancellation,
        verification_password: form.verification_password
	}
	populateBookingCancellationOptionForm(payload)
	configureBookingCancellationOption()
}
</script>

<style>

</style>
