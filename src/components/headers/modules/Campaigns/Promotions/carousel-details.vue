<template>
	<HeadersHeaderSlot :loading="loading" :title="carousel_details?.name" pre-title="overview" />
</template>

<script setup lang="ts">
import { useCarouselDetails } from '@/composables/modules/campaigns/carousels'

const { loading, carousel_details } = useCarouselDetails()
</script>
