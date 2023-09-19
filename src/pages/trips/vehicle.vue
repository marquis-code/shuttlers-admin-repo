<template>
	<div class="flex justify-center items-center h-screen">
		<div class="flex justify-center items-center flex-col">
			<img src="@/assets/icons/source/bus_placeholder.svg" alt="track vehicle empty state">
			<p>There are currently no active trips</p>
		</div>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})
</script>

<style scoped>

</style>
