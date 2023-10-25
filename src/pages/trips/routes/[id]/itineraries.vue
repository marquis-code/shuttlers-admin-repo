<template>
	<main class="">
		<h1>Hello</h1>
	</main>
</template>
<script setup lang="ts">
definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

</script>

<style scoped></style>
