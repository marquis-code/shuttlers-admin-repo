<template>
	<HeadersHeaderSlot :title="`${selectedTripRating.name}`" pre-title="CATEGORY OVERVIEW" :loading="Object.keys(selectedTripRating).length === 0" />
</template>

<script setup lang="ts">
import { useTripRatingIdDetails } from '@/composables/modules/configure/id'

const { selectedTripRating, loading, getTripRatingById } = useTripRatingIdDetails()

if (Object.keys(selectedTripRating.value).length === 0) {
    const id = useRoute().params.id as string
    getTripRatingById(id)
}
</script>
