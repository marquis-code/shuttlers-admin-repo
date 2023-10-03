<template>
	<Modal
		modal="$atts.modal"
		title=""
		class="!text-sm"

	>
		<div class="flex flex-col items-center -mt-4 w-full gap-4">
			<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect x="4" y="4" width="48" height="48" rx="24" fill="#FFF3AD" />
				<path d="M23.8826 24.679C23.8806 24.7274 23.8885 24.7758 23.9058 24.8211C23.9231 24.8664 23.9495 24.9076 23.9834 24.9423C24.0172 24.977 24.0578 25.0044 24.1027 25.0229C24.1475 25.0413 24.1957 25.0504 24.2441 25.0495H25.4816C25.6886 25.0495 25.8536 24.88 25.8806 24.6745C26.0156 23.6905 26.6906 22.9735 27.8936 22.9735C28.9226 22.9735 29.8646 23.488 29.8646 24.7255C29.8646 25.678 29.3036 26.116 28.4171 26.782C27.4076 27.5155 26.6081 28.372 26.6651 29.7625L26.6696 30.088C26.6712 30.1864 26.7114 30.2803 26.7816 30.3493C26.8517 30.4183 26.9462 30.457 27.0446 30.457H28.2611C28.3606 30.457 28.456 30.4175 28.5263 30.3472C28.5966 30.2768 28.6361 30.1815 28.6361 30.082V29.9245C28.6361 28.8475 29.0456 28.534 30.1511 27.6955C31.0646 27.001 32.0171 26.23 32.0171 24.6115C32.0171 22.345 30.1031 21.25 28.0076 21.25C26.1071 21.25 24.0251 22.135 23.8826 24.679ZM26.2181 33.3235C26.2181 34.123 26.8556 34.714 27.7331 34.714C28.6466 34.714 29.2751 34.123 29.2751 33.3235C29.2751 32.4955 28.6451 31.9135 27.7316 31.9135C26.8556 31.9135 26.2181 32.4955 26.2181 33.3235Z" fill="#CBAF02" />
				<rect x="4" y="4" width="48" height="48" rx="24" stroke="#FFF9D6" stroke-width="8" />
			</svg>

			<h1 class="text-center text-lg font-medium">
				{{ title }}
			</h1>
			<p class="text-center">
				{{ description }}
			</p>

			<div class="grid grid-cols-2 gap-4  w-full">
				<button class="modal-btn" @click="closeAlert">
					No
				</button>
				<button class="modal-btn" :class="[buttonStyle]" :disabled="loading" @click="call_functuon()">
					<span v-if="!loading"> Yes</span>
					<Spinner v-else />
				</button>
			</div>
		</div>
	</Modal>
</template>

<script setup lang="ts">
import { useConfirmationModal } from '@/composables/core/confirmation'

const { call_functuon, closeAlert, description, title, loading, type } = useConfirmationModal()

const buttonStyle = computed(() => {
	if (type.value === 'DANGER') return 'border-red bg-[#fda29bb0] text-[#B01C23]'
	if (type.value === 'NORMAL') return 'border-dark bg-black text-light'
})

</script>

<style>

</style>
