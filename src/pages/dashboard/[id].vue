<template>
	<div>
		{{ $route.params.id }}
	</div>
</template>

<script setup>
definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
</script>

<style lang="scss" scoped>

</style>
