<template>
	<main class="flex center w-full min-h-screen  px-4">
		<section class="flex flex-col w-full max-w-[405px] mx-auto gap-4 center-col">
			<div class="flex  gap-4 items-end">
				<img src="@/assets/images/core/logo.svg" alt="logo" class="w-60">
				<span class="bg-black text-light text-[10px] p-1 rounded-full px-2">Admin</span>
			</div>
			<div>
				<div class="space-y-2">
					<p class="text-lg text-center font-medium">
						{{ route.query.email ? 'Check your email' : 'Forgot your password?' }}
					</p>
					<p class="text-sm text-center text-gray-500">
						{{ route.query.email ? 'Check your email for password reset instructions' : 'Don\'t worry, it happens to the best of us' }}
					</p>
				</div>
			</div>
			<form v-if="!route.query.email" class="auth-form" @submit.prevent="forgot_password">
				<div class="flex flex-col mb-2 mobile">
					<h1 class="text-[32px] font-bold">
						Forgot your password?
					</h1>
					<p class="text-gray-500">
						Don't worry, it happens to the best of us.
					</p>
				</div>

				<div v-if="auth_type == 'email'" class="field relative">
					<label for="email">Email address</label>
					<input id="email" v-model="credential.email.value" autocomplete="true" type="email"
						class="input-field" required>
				</div>

				<button class="auth-form-btn mt-5" :disabled="disabled || loading">
					<span v-if="!loading" class="flex justify-center items-center gap-2.5">Recover password
						<icon name="arrowRight" class="w-3" />
					</span>
					<Spinner v-else />
				</button>
				<NuxtLink to="/auth/login"
					class="text-center flex justify-center items-center font-semibold text-gray-500 text-sm">
					Back to Login
				</NuxtLink>
			</form>
			<div v-else class="w-full mt-4">
				<NuxtLink to="/auth/login"
					class="text-center flex rounded-md justify-center py-2.5 text-white items-center bg-black font-semibold text-sm">
					Back to Login
				</NuxtLink>
			</div>
		</section>
	</main>
</template>

<script setup lang="ts">

import { use_auth_forgot_password } from '@/composables/auth/forgot'

const { credential, forgot_password, loading, disabled, auth_type } = use_auth_forgot_password()

definePageMeta({
    layout: 'auth',
    middleware: 'is-not-authenticated'
})
const route = useRoute()

</script>

<!-- <style scoped lang='scss'>

</style> -->
