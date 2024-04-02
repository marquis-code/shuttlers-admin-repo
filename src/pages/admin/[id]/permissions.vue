<template>
	<main>
		<ButtonGoBack url="/admin" class="mb-6" />
		<p class="text-gray-500 text-sm">
			All Super admins and Admins have all permissions by default
		</p>
	</main>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})
</script>

<style scoped>

</style>
