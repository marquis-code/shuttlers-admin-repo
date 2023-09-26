<template>
	<div>
		<ModulesUsersCreateUser id="" type="new" />
	</div>
</template>

<script setup lang="ts">
import { usePageHeader } from '@/composables/utils/header'
definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})
usePageHeader
usePageHeader().setPageHeader({
	preTitle: 'OVERVIEW',
	title: 'Add User'

})
</script>

<style scoped>

</style>
