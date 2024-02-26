<template>
	<Modal
		modal="$atts.modal"
		title="Cancel Booking"
	>
		<form class="flex flex-col gap-[16px] w-full" @submit.prevent="cancelBooking">
			<div class="flex flex-col gap-2">
				<label class="label">Select days to cancel</label>
				<Skeleton v-if="loading" height="60px" radius="10px" />
				<div v-else class="w-full flex gap-3 flex-wrap">
					<button v-for="n in booked_days" :key="n.id" type="button" class="border p-2 text-sm text-dark font-medium rounded-md"
						:class="[selected_days.includes(n.trip_date) ? 'border-green' : '']"
						@click="onSelectDates(n?.trip_date)"
					>
						{{ n?.trip_date }}
					</button>
				</div>
			</div>

			<button type="submit" :disabled="cancelling || !enableButton" class="text-sm bg-black p-[16px] text-white text-center w-full mt-2 rounded disabled:cursor-not-allowed disabled:bg-[#E0E6ED]">
				{{ cancelling ? 'processing...' : 'Cancel booking' }}
			</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useCancelBooking } from '@/composables/modules/users/booking-ticket/cancel'

const { loading, booked_days, selected_days, fetchBookedDays, cancelBooking, cancelling } = useCancelBooking()

const enableButton = computed(() => {
	return !!(selected_days.value.length)
})

const onSelectDates = (date:string) => {
	if (!selected_days.value.includes(date)) {
		selected_days.value.push(date)
	} else {
		const index = selected_days.value.indexOf(date)
		selected_days.value.splice(index, 1)
	}
}

fetchBookedDays()
onBeforeUnmount(() => selected_days.value = [])
</script>

<style scoped>
label{
	margin: 0;
}
</style>
