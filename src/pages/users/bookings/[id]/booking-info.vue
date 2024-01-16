<template>
	<div class="space-y-6">
		<ButtonGoBack url="/users/bookings" />
		<div>
			<div v-if="!loading" class="lg:flex justify-between items-start space-y-10 lg:space-y-0 lg:gap-x-10">
				<div class="lg:w-6/12 rounded-md bg-white border p-6">
					<h1 class="border-b pb-3 font-semibold">
						Request
					</h1>
					<div v-for="(item, key, index) in bookingRequest" :key="index" class="flex justify-between items-center border-b py-5 text-sm">
						<p>{{ key }}</p>
						<p :class="[item === 'processed' ? 'bg-green-500 text-white rounded-md text-xs px-3 py-1.5' : null]">
							{{ item }}
						</p>
					</div>
				</div>
				<div class="lg:w-6/12 rounded-md bg-white border p-6">
					<div class="flex justify-between items-center border-b pb-3">
						<h1 class="font-semibold">
							Response
						</h1>
						<button :disabled="!selectedBooking?.processing_result?.data?.length"
							class="flex items-center cursor-pointer gap-x-2 disabled:cursor-not-allowed"
							@click="downloadBookings"
						>
							<img src="@/assets/icons/source/download.svg" alt="" class="inline">
							<p class="text-xs font-medium">
								Download report
							</p>
						</button>
					</div>
					<div v-if="selectedBooking?.processing_result && !selectedBooking?.processing_result?.success"
						class="text-white bg-red-500"
					>
						<p>
							Encountered error while processing batch booking.
						</p>
						<p>{{ selectedBooking?.processing_result?.error }}</p>
					</div>
					<div v-else class="overflow-auto">
						<div v-for="(item, index) in selectedBooking?.processing_result?.data" :key="index"
							class="flex justify-between items-center border-b py-5 text-sm min-w-[500px] gap-4"
						>
							<div class="flex justify-between gap-x-10">
								<p>{{ index + 1 }}</p>
								<p>{{ item.userId }}</p>
							</div>
							<div class="flex items-center gap-x-10">
								<p :class="[item.success ? 'bg-shuttlersGreen' : 'bg-red']" class="rounded-lg text-white text-xs px-2 py-1">
									{{ item.success ? 'completed' : 'failed' }}
								</p>
								<p class="cursor-pointer flex items-center gap-x-2" @click="useAlert().openAlert({ type: 'Alert', msg: item.error })">
									<img src="@/assets/icons/source/batch-booking-info.svg" alt="">
									details
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Skeleton v-else height="300px" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useAlert } from '@/composables/core/notification'
import { useBatchBookingIdDetails } from '@/composables/modules/batchBooking/id'
const { getBatchBookingById, loading, selectedBooking, downloadBookings } = useBatchBookingIdDetails()
const id = useRoute().params.id as string
getBatchBookingById(id)
const router = useRouter()

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})

const bookingRequest = computed(() => {
	return {
	'created at': useDateFormat(selectedBooking?.value.created_at, 'YYYY-MM-DD, hh:mm A').value ?? 'N/A',
	'Processing Status': selectedBooking?.value?.processing_completed_at ? 'processed' : 'pending',
	'Start Date': useDateFormat(selectedBooking?.value?.booking_data?.start_date, 'YYYY-MM-DD').value ?? 'N/A',
	'End Date': useDateFormat(selectedBooking?.value?.booking_data?.end_date, 'YYYY-MM-DD').value ?? 'N/A',
	'Payment Source': selectedBooking?.value?.booking_data?.payment_source ?? 'N/A',
	Pickup: JSON.parse(selectedBooking?.value.booking_data?.meta)?.pickup ?? 'N/A',
	Dropoff: JSON.parse(selectedBooking?.value.booking_data?.meta)?.destination ?? 'N/A',
	'Route Code': JSON.parse(selectedBooking?.value.booking_data.meta)?.route_code ?? 'N/A',
	'Route Itinerary': selectedBooking?.value?.booking_data?.itinerary_id
}
})

const emit = defineEmits(['filter'])

type FilterKeys = 'type' | 'value'
const onFilter = (item: Record<FilterKeys, string>) => {
	emit('filter', item)
}
</script>
