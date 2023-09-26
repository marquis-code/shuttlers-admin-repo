import { formToJSON } from 'axios';
<template>
	<Modal
		modal="$atts.modal"
		title="Configure point"
		:no-close-btn="false"
		class="text-center"
	>
		<div class="flex flex-col items-center justify-center">
			<div class="field relative">
				<label for="email">Email address</label>
				<input id="email" v-model="form.amount" autocomplete="true" type="email" class="input-field" required>
			</div>
			<button class="auth-form-btn mt-5" :disabled="disabled || loading">
				<span v-if="!loading" class="flex justify-center items-center gap-2.5">Configure</span>
				<Spinner v-else />
			</button>
			<!-- <icon name="warning" class="w-24 mb-9" />
			<h1 class="text-2xl font-bold">
				Logout
			</h1>

			<p class="mt-2 text-gray-400">
				Are you sure you want to logout?
			</p>

			<div class="flex flex-col w-full">
				<button class="w-full modal-btn border-red bg-red text-light hover:bg-red" @click="logOut">
					Logout
				</button>
				<button class="w-full mt-3 modal-btn text-dark" @click="useAuthModal().closeLogout()">
					Cancel
				</button>
			</div> -->
		</div>
	</Modal>
</template>

<script setup lang="ts">
import { useAuthModal } from '@/composables/core/modals'
import { useUser } from '@/composables/auth/user'
const { logOut } = useUser()
const disabled = ref(false)
const loading = ref(false)

const form = reactive({
    amount: ''
})

</script>

<style>

</style>
