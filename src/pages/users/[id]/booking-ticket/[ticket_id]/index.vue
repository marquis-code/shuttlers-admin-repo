<template>
	<main class="flex flex-col gap-4">
		hello booking ticket
	</main>
</template>

<script setup lang="ts">
import moment from 'moment'

const ticket_id = useRoute().params.ticket_id as string

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})
</script>

<style scoped>
label,span,p{
	margin: 0 !important;
}
</style>
