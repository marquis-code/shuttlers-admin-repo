<template>
	<main>
		<ButtonGoBack />
		create new partner
	</main>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})
</script>
