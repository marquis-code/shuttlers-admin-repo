<template>
	<main>
		<ButtonGoBack class="mb-6" />
		<section class="lg:flex justify-between items-start lg:gap-x-6 space-y-6 lg:space-y-0">
			<ModulesAuditTrailAuditList />
			<ModulesAuditTrailAuditDetail />
		</section>
	</main>
</template>

<script setup lang="ts">

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})

</script>

<style></style>
