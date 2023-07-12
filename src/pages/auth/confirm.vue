<template>
	<main class="flex lg:justify-between justify-center items-start w-full px-4">
		<section class="flex flex-col max-w-[377px] gap-4 pc">
			<h1 class="text-[40px] font-bold">
				Login to your Shuttlers Account
			</h1>
			<p class="text-grey5">
				Please login to your Shuttlers account with your email address and
				password.
			</p>
		</section>

		<form class="auth-form" @submit.prevent="confirm_otp">
			<div class="flex flex-col mb-4">
				<h1 class="text-xl font-bold">
					Confirm OTP
				</h1>
				<p class="text-grey5">
					Please enter the 4-digit code sent to
					<b>{{ value }}</b>
				</p>
			</div>
			<nuxt-link to="/auth/login" class="text-xs text-green7 ml-auto -mb-2">
				Login with password
			</nuxt-link>
			<div>
				<v-otp-input
					ref="otpInput"
					v-model="credential.otp.value"
					input-classes="otp-input"
					separator=""
					:num-inputs="4"
					:should-auto-focus="true"
					:placeholder="['-', '-', '-', '-']"
					:is-input-num="true"
					@on-change="handleOnChange"
				/>
			</div>
			<div class="center-col">
				<span class="text-sm text-grey5 text-center">Didn’t receive code?</span>
				<p v-if="countdown > 0" class="text-sm text-neut9 text-center">
					Resend code in <span class="text-green7"> {{ countdown }} </span> seconds
				</p>
				<button v-else class="text-green7 text-sm" type="button" @click="resend_otp_code">
					Resend
				</button>
			</div>

			<button class="auth-form-btn mt-5 w-full" :disabled="disabled || loading">
				<span
					v-if="!loading"
					class="flex justify-center items-center gap-2.5"
				>Proceed <icon name="arrowRight" class="w-3" />
				</span>
				<Spinner v-else />
			</button>
		</form>
	</main>
</template>

<script setup lang="ts">
import VOtpInput from 'vue3-otp-input'
import { use_confirm_otp } from '@/composables/auth/index'

const id = useRoute().query.id as string
const value = useRoute().query.value as string

const { confirm_otp, credential, disabled, loading, resend_otp } = use_confirm_otp()
const otpInput = ref(null) as any
 const countdown = ref(0)

const resend_otp_code = () => {
	resend_otp()
	start_countdown()
}
onMounted(() => {
	credential.id.value = id
	start_countdown()
})

const start_countdown = () => {
	countdown.value = 60
		  const interval = setInterval(() => {
		if (countdown.value === 0) {
			clearInterval(interval)
		}
      countdown.value--
    }, 1000)
}
const handleOnChange = (value: string) => {
	credential.otp.value = value
}
const clearInput = () => {
	otpInput.value?.clearInput()
}
definePageMeta({
	layout: 'auth'
})
</script>

<style>

</style>
