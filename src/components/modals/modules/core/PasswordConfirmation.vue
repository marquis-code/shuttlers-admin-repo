<template>
	<Modal
		modal="$atts.modal"
		title=""

		class="!text-sm"

	>
		<form class="flex flex-col items-center -mt-4 w-full gap-4 " autocomplete="off" @submit="call_function()">
			<h1 class="text-center text-lg font-medium">
				{{ title }}
			</h1>
			<div class="rounded-lg p-5 bg-[#EBEBFF] text-[#2323F0] flex gap-3">
				<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
					<circle cx="16" cy="16" r="16" fill="#2323F0" />
					<path d="M14.5746 8.3843L7.51643 20.1673C7.37091 20.4193 7.29391 20.7051 7.2931 20.9961C7.29228 21.2871 7.36768 21.5732 7.51179 21.826C7.6559 22.0789 7.8637 22.2895 8.11451 22.4371C8.36532 22.5847 8.6504 22.6641 8.9414 22.6672H23.0577C23.3487 22.6641 23.6338 22.5847 23.8846 22.4371C24.1354 22.2895 24.3432 22.0789 24.4873 21.826C24.6314 21.5732 24.7068 21.2871 24.706 20.9961C24.7052 20.7051 24.6282 20.4193 24.4826 20.1673L17.4245 8.3843C17.2759 8.13939 17.0668 7.93691 16.8172 7.79638C16.5676 7.65586 16.286 7.58203 15.9995 7.58203C15.7131 7.58203 15.4315 7.65586 15.1819 7.79638C14.9323 7.93691 14.7231 8.13939 14.5746 8.3843Z" fill="white" />
					<path d="M15.9994 13.2051V16.5383M15.9994 19.8716H16.0077" stroke="#2323F0" stroke-width="1.92495" stroke-linecap="round" stroke-linejoin="round" />
				</svg>

				<span>
					Please be sure you want to proceed with this action
				</span>
			</div>

			<p class="text-start">
				Provide your admin password in order to proceed
			</p>
			<div class="field relative">
				<label for="password" class="w-full">Enter password</label>
				<input id="password" v-model="password" autocomplete="false" :type="showPassword ? 'text' : 'Password'" class="input-field" required>
				<icon name="eye" class="w-6 absolute top-[53%] right-4" @click="toggleShow" />
			</div>
			<div class="grid grid-cols-2 gap-4  w-full">
				<button class="modal-btn" type="button" @click="closeAlert">
					cancel
				</button>
				<button class="modal-btn" :class="[buttonStyle]" :disabled="loading || password === ''">
					<span v-if="!loading"> Proceed</span>
					<Spinner v-else />
				</button>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { usePasswordConfirmationModal } from '@/composables/core/confirmation'

const { call_function, closeAlert, description, title, loading, type, password } = usePasswordConfirmationModal()

const showPassword = ref(false)
const toggleShow = () => {
	showPassword.value = !showPassword.value
}
const buttonStyle = computed(() => {
	if (type.value === 'DANGER') return 'border-red bg-[#fda29bb0] text-[#B01C23]'
	if (type.value === 'NORMAL') return 'border-dark bg-black text-light'
})

</script>

<style>

</style>
