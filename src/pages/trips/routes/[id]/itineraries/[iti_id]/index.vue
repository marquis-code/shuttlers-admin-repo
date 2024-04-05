<template>
	<Skeleton v-if="loading_single_iti" height="300px" />
	<main v-else class="flex flex-col gap-4 2xl:flex-row">
		<ModulesRoutesItinerariesItinerarySidebar />
		<div class="w-full flex flex-col gap-4 2xl:w-[calc(100%-250px)]">
			<ModulesRoutesItinerariesEditableDetails />
			<ModulesRoutesItinerariesDriverTable />
			<ModulesRoutesItinerariesConfigurePayment v-if="!isProdEnv" />
		</div>
	</main>
</template>
<script setup lang="ts">
import { useItineraries } from '@/composables/modules/routes/itineraries'
import { isProdEnv } from '@/composables/utils/system'

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const { loading_single_iti, getSingleItinerary } = useItineraries()
getSingleItinerary(useRoute().params.iti_id as string)
</script>

<style scoped></style>
