<template>
	<div>
		<ModulesUsersCreateUser id="" type="new" />
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
