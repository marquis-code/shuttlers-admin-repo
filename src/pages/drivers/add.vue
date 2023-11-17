<template>
	<main>
		<ButtonGoBack class="mb-6" />

		<div class="w-8/12 bg-white border rounded-md">
			<div class="px-6 py-5">
				<p class="font-medium">
					Add a New Driver
				</p>
			</div>
			<hr>
			<form class="p-6 mt-5 space-y-6" @submit.prevent="createDriver">
				<div class="flex items-center justify-between gap-x-10">
					<div class="w-full">
						<label for="firstName"
							class="text-sm font-light text-gray ">
							First name</label>
						<input v-model="createForm.fname.value" type="text" name="firstName" class="w-full px-3 py-2 border rounded-md outline-none focus:border-gray-900 input-field">
					</div>
					<div class="w-full">
						<label for="lastName"
							class="text-sm font-light text-gray ">
							Last name</label>
						<input v-model="createForm.lname.value" type="text" name="lastName" class="w-full px-3 py-2 border rounded-md outline-none focus:border-gray-900 input-field">
					</div>
				</div>

				<div class="flex items-center justify-between gap-10">
					<div class="w-full">
						<label for="emailAddress"
							class="text-sm font-light text-gray ">
							Email address</label>
						<input v-model="createForm.email.value" type="email" name="emailAddress" class="w-full px-3 py-2 border rounded-md outline-none focus:border-gray-900 input-field">
					</div>
					<div class="w-full">
						<label for="phone"
							class="text-sm font-light text-gray ">
							Phone</label>
						<input v-model="createForm.phone.value" type="tel" name="phone" class="w-full px-3 py-2 border rounded-md outline-none focus:border-gray-900 input-field">
					</div>
				</div>

				<div class="w-">
					<label for="password"
						class="text-sm font-light text-gray ">
						Password </label>
					<input v-model="createForm.password.value" type="password" name="password" class="w-6/12 px-3 py-2 border rounded-md outline-none focus:border-gray-900 input-field">
				</div>

				<div>
					<button type="submit" class="text-white disabled:cursor-not-allowed disabled:opacity-25 bg-black rounded-md px-6 py-2.5 text-xm" :disabled="!isFormEmpty">
						<span v-if="!loading" class="text-sm">Add Driver</span>
						<Spinner v-else />
					</button>
				</div>
			</form>
		</div>
	</main>
</template>

<script setup lang="ts">
import { useCreateDriver } from '@/composables/modules/drivers/create'
const { createForm, loading, createDriver } = useCreateDriver()
definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const isFormEmpty = computed(() => {
	return !!(createForm.fname.value && createForm.lname.value && createForm.email.value && createForm.phone.value && createForm.password.value)
})
</script>

<style></style>
