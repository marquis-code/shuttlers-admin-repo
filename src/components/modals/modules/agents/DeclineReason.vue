<template>
	<Modal
		modal="$atts.modal"
		title="Decline route"
	>
		<form class="flex flex-col gap-6" @submit.prevent="decline">
			<div class="field relative">
				<label for="Reason">Reason</label>
				<textarea
					v-model="reason"
					class="w-full p-3 resize-none border outline-none rounded-md"
					rows="3"
					cols="3"
					placeholder="Enter Reason"
				/>
			</div>

			<div class="flex">
				<button class="btn-primary w-full" :disabled="loading || !reason">
					<span v-if="!loading" class="flex justify-center items-center gap-2.5">
						Decline route
					</span>
					<Spinner v-else />
				</button>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useDeclineRouteSuggestion } from '@/composables/modules/agents/decline'
const { decline, loading, reason } = useDeclineRouteSuggestion()

</script>

<style>

</style>
