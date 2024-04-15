<template>
	<Modal
		modal="$atts.modal"
		title="Admin feedback"
	>
		<form class="flex flex-col gap-4 w-full" @submit.prevent="queryOrRejectEvent">
			<div class="flex flex-col">
				<label class="label">Description</label>
				<textarea v-model="feedback" class="resize-none input-field h-[100px]" />
			</div>

			<div class="flex items-center gap-2">
				<Icon name="info_2" class="w-6" />
				<p class="text-grey5 text-xs font-medium">
					Customers need to know why their request is being {{ type === 'query' ? 'queried' : 'rejected' }} so they can modify it.
				</p>
			</div>

			<button type="submit" :disabled="loading || !feedback?.length"
				class="mt-10 text-sm bg-dark p-4 text-white text-center w-full border-none outline-none rounded disabled:cursor-not-allowed disabled:bg-[#E0E6ED] capitalize"
			>
				{{ loading ? 'processing...' : `${type} request` }}
			</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useQueryOrRejectEvent } from '@/composables/modules/events'

const { feedback, loading, queryOrRejectEvent, type } = useQueryOrRejectEvent()
onBeforeUnmount(() => { feedback.value = '' })
</script>

<style scoped>
label{
	margin: 0;
}
</style>
