<template>
	<main>
		<ButtonGoBack url="/trips/routes" class="mb-6" />
		<section class="flex flex-col gap-4 lg:flex-row">
			<ModulesRoutesItinerariesItinerarySidebar />
			<div class="flex items-center justify-center flex-grow">
				Select an itinerary to view more details
			</div>
		</section>
	</main>
</template>
<script setup lang="ts">
definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

</script>

<style scoped></style>
