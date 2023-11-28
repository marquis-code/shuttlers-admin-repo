<template>
	<Skeleton v-if="loading_single_iti" height="300px" />
	<main v-else class="flex flex-col gap-4 lg:flex-row">
		<ModulesRoutesItinerariesItinerarySidebar />
		<div class="w-full flex flex-col gap-4 lg:w-[calc(100%-250px)]">
			<ModulesRoutesItinerariesEditableDetails />
			<ModulesRoutesItinerariesDriverTable />
			<ModulesRoutesItinerariesConfigurePayment />
		</div>
	</main>
</template>
<script setup lang="ts">
import { useItineraries } from '@/composables/modules/routes/itineraries'

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const { loading_single_iti, getSingleItinerary } = useItineraries()
getSingleItinerary(useRoute().params.iti_id as string)
</script>

<style scoped></style>
