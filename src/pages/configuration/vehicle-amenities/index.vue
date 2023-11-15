<template>
	<main class="space-y-16">
		<section>
			<ModulesConfigureAmenitiesCreateAmenities />
		</section>
		<section>
			<ModulesConfigureAmenitiesTableSection />
		</section>
	</main>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

</script>
