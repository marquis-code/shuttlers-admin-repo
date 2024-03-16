e<template>
	<div>
		<ModulesAgentsCreateAgent id="" type="new" />
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
	preTitle: 'CREATE',
	title: 'Create Agent'

})
</script>

<style scoped>

</style>
