<template>
	<main class="space-y-10">
		<ModulesDashboardSectionOne />
		<ModulesDashboardSectionTwo />
		<ModulesDashboardSectionThree />
		<ModulesDashboardSectionFour />
		<ModulesDashboardSectionFive />
	</main>
</template>
<script setup lang="ts">
definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

</script>
