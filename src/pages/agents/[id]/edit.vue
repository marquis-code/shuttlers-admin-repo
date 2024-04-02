<template>
	<div>
		<ModulesAgentsCreateAgent :id="id" type="edit" />
	</div>
</template>

<script setup lang="ts">
import { usePageHeader } from '@/composables/utils/header'

const id = useRoute().params.id as string

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
