<template>
	<HeadersHeaderSlot :title="`Batch Booking Request - ${selectedBooking.id}`" pre-title="DETAILS" :loading="Object.keys(selectedBooking).length === 0" />
</template>

<script setup lang="ts">
import { useBatchBookingIdDetails } from '@/composables/modules/batchBooking/id'

const { selectedBooking, getBatchBookingById } = useBatchBookingIdDetails()

if (Object.keys(selectedBooking.value).length === 0) {
    const id = useRoute().params.id as string
    getBatchBookingById(id)
}

</script>
