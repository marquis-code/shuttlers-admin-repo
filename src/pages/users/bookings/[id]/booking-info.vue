<template>
	<div class="space-y-6">
		<button
			v-if="!loading"
			class="text-xs bg-gray-200 rounded-md px-3 py-1.5 font-medium"
			@click="router.go(-1)"
		>
			Go back
		</button
		>
		<div class="lg:flex justify-between items-start space-y-10 lg:space-y-0 lg:gap-x-10">
			<div v-if="bookingRequest" class="lg:w-6/12 rounded-md bg-white border p-6">
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
					<button class="flex items-center cursor-pointer gap-x-2" @click="onFilter({type:'download', value:selectedBooking?.processing_result?.data})">
						<img src="@/assets/icons/source/download.svg" alt="" class="inline">
						<p class="text-xs font-medium">
							Download report
						</p>
					</button>
				</div>
				<div
					v-if="
						selectedBooking?.processing_result &&
							!selectedBooking?.processing_result?.success
					"
					class="text-white bg-red-500"
				>
					<p>
						Encountered error while processing batch booking.
					</p>
					<p>{{ selectedBooking?.processing_result?.error }}</p>
				</div>
				<div v-else>
					<div v-for="(item, index) in selectedBooking?.processing_result?.data" :key="index" class="flex justify-between items-center border-b py-5 text-sm">
						<div class="flex justify-between gap-x-10">
							<p>{{ index + 1 }}</p>
							<p>{{ item.userId }}</p>
						</div>
						<p :class="[item.success ? 'bg-green-500' : 'bg-red-400']" class="rounded-lg text-white text-xs px-2 py-1">
							{{ item.success ? 'completed' : 'failed' }}
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useBatchBookingIdDetails } from '@/composables/modules/batchBooking/id'
const { getBatchBookingById, loading, selectedBooking } = useBatchBookingIdDetails()
const id = useRoute().params.id as string
getBatchBookingById(id)
const router = useRouter()

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})

let parsedData = {}
if (selectedBooking.value && selectedBooking.value?.booking_data) {
	parsedData = JSON.parse(selectedBooking.value?.booking_data?.meta)
}
const bookingRequest = ref({
	'created at': selectedBooking?.value.created_at,
	'Processing Status': selectedBooking?.value?.processing_completed_at ? 'processed' : 'pending',
	'Start Date': selectedBooking?.value?.booking_data?.start_date,
	'End Date': selectedBooking?.value?.booking_data?.end_date,
	'Payment Source': selectedBooking?.value?.booking_data?.payment_source,
	Pickup: parsedData?.pickup ?? 'N/A',
	Dropoff: parsedData?.destination ?? 'N/A',
	'Route Code': parsedData?.route_code ?? 'N/A',
	'Route Itinerary': selectedBooking?.value?.booking_data?.itinerary_id
})

const emit = defineEmits(['filter'])

type FilterKeys = 'type' | 'value'
const onFilter = (item: Record<FilterKeys, string>) => {
	emit('filter', item)
}
</script>
