<template>
	<main class="flex">
		<ButtonGoBack />
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
