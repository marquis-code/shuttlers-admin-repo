<template>
	<Modal
		modal="$atts.modal"
		title="Refund amount"
		:no-close-btn="false"
		class="text-center"
	>
		<form class="flex flex-col gap-6" @submit.prevent="">
			<div class="field relative">
				<label for="percentage">Refund percentage</label>

				<select id="percentage" class="input-field" required>
					<option value="">
						Select Percentage
					</option>
					<option v-for="item in percentageArray" :key="item.value" :value="item.value">
						{{ item.name }}
					</option>
				</select>
			</div>

			<div class="field relative">
				<label for="Reason">Reason</label>
				<textarea id="Reason" autocomplete="true" type="text" class="input-field" required />
			</div>

			<div class="flex justify-end">
				<button class="btn-primary" :disabled="loading">
					<span v-if="!loading" class="flex justify-center items-center gap-2.5">
						Log refund
					</span>
					<Spinner v-else />
				</button>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useAuthModal } from '@/composables/core/modals'

const loading = ref(false)

const percentageArray = ref([
	{ name: '10%', value: 10 },
	{ name: '20%', value: 20 },
	{ name: '30%', value: 30 },
	{ name: '40%', value: 40 },
	{ name: '50%', value: 50 },
	{ name: '60%', value: 60 },
	{ name: '70%', value: 70 },
	{ name: '80%', value: 80 },
	{ name: '90%', value: 90 },
	{ name: '100%', value: 100 }
])
</script>

<style>

</style>
