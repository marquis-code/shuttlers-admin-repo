<template>
	<HeadersHeaderSlot :title="headstate.title.value" :pre-title="headstate.preTitle.value" />
</template>

<script setup lang="ts">
import { usePageHeader } from '@/composables/utils/header'

const { headstate } = usePageHeader()
</script>

<style scoped>

</style>
