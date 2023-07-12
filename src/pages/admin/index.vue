<template>
	<div>
		admin
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	 key: 'authentication',
	layout: 'dashboard',
	middleware: ['is-authenticated']
})
</script>

<style scoped>

</style>
