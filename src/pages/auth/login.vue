<template>
	<main class="flex center w-full min-h-screen  px-4">
		<section class="flex flex-col w-full max-w-[405px] mx-auto gap-4 center-col">
			<div class="flex  gap-4 items-end">
				<img src="@/assets/images/core/logo.svg" alt="logo" class="w-60">
				<span class="bg-black text-light text-[10px] p-1 rounded-full px-2">Admin</span>
			</div>
			<p class="text-lg text-center font-medium">
				Log in to your account
			</p>
			<div class="flex items-center justify-center gap-4 mb-4">
				<span class="auth_tab" :class="{ 'auth_tab_active': auth_type == 'email' }"
					@click="auth_type = 'email'">Email address</span>
				<span class="auth_tab" :class="{ 'auth_tab_active': auth_type == 'phone' }"
					@click="auth_type = 'phone'">Phone number</span>
			</div>
			<form class="auth-form" @submit.prevent="login">
				<div class="flex flex-col mb-2 mobile">
					<h1 class="text-[32px] font-bold">
						Login to your Shuttlers Account
					</h1>
					<p class="text-gray-500">
						Please login to your Shuttlers account with your email address and password.
					</p>
				</div>

				<div v-if="auth_type == 'email'" class="field relative">
					<label for="email">Email address</label>
					<input id="email" v-model="credential.email.value" autocomplete="true" type="email"
						class="input-field" required>
				</div>
				<ShPhoneInput v-else v-model="credential.phone.value" />
				<div class="field relative">
					<label for="password" class="w-full">Password
						<span class="text-green7 text-xs ml-auto font-normal cursor-pointer"
							@click="sign_in_with_otp">Login with OTP</span>
					</label>
					<input id="password" v-model="credential.password.value" autocomplete="true"
						:type="showPassword ? 'text' : 'Password'" class="input-field" required>
					<icon name="eye" class="w-6 absolute top-[53%] right-4" @click="toggleShow" />
				</div>

				<button class="auth-form-btn mt-5" :disabled="disabled || loading">
					<span v-if="!loading" class="flex justify-center items-center gap-2.5">Login to Shuttlers
						<icon name="arrowRight" class="w-3" />
					</span>
					<Spinner v-else />
				</button>
				<NuxtLink to="/auth/forgot-password"
					class="text-center flex justify-center items-center font-semibold text-gray-500 text-sm">
					Forgot
					password?
				</NuxtLink>
			</form>
		</section>
	</main>
</template>

<script setup lang="ts">

import { ShPhoneInput } from '@shuttlershq/shuttlers-ui'

import { use_auth_login } from '@/composables/auth/index'

const { credential, disabled, loading, login, auth_type, sign_in_with_otp } = use_auth_login()

const showPassword = ref(false)
const toggleShow = () => {
	showPassword.value = !showPassword.value
}
definePageMeta({
	layout: 'auth',
	middleware: 'is-not-authenticated'
})
</script>

<!-- <style scoped lang='scss'>

</style> -->
