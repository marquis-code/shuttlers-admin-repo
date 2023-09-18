<template>
	<div>
		<ModulesUsersCreateUser :id="id" type="edit" />
	</div>
</template>

<script setup lang="ts">

const id = useRoute().params.id
definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})
</script>

<style scoped>

</style>
