<template>
	<main>
		<ButtonGoBack class="mb-6" />

		<div class="bg-white rounded-md border w-8/12">
			<div class="px-6 py-5">
				<p class="font-medium">
					Add a New Staff
				</p>
			</div>
			<hr>
			<form class="space-y-6 p-6 mt-5" @submit.prevent="createAdmin">
				<div class="flex justify-between items-center gap-x-10">
					<div class="w-full">
						<label for="firstName" class="label"
						>First name</label
						>
						<input
							v-model="createForm.fname.value"
							:disabled="user.role === 'user'"
							type="text"
							name="firstName"
							class="input-field"
						>
					</div>
					<div class="w-full">
						<label for="lastName" class="label"
						>Last name</label
						>
						<input
							v-model="createForm.lname.value"
							:disabled="user.role === 'user'"
							type="text"
							name="lastName"
							class="input-field"
						>
					</div>
				</div>

				<div class="flex justify-between items-center gap-10">
					<div class="w-full">
						<label for="emailAddress" class="label"
						>Email address</label
						>
						<input
							v-model="createForm.email.value"
							:disabled="user.role === 'user'"
							type="email"
							name="emailAddress"
							class="input-field"
						>
					</div>
					<div class="w-full">
						<label for="phone" class="label"
						>Phone</label
						>
						<input
							v-model="createForm.phone.value"
							:disabled="user.role === 'user'"
							type="tel"
							name="phone"
							class="input-field"
						>
					</div>
				</div>

				<div class="flex justify-between items-center gap-10">
					<div class="w-full">
						<label for="password" class="label"
						>Password
						</label>
						<input
							v-model="createForm.password.value"
							:disabled="user.role === 'user'"
							type="password"
							name="password"
							class="input-field"
						>
					</div>
					<div class="w-full">
						<label for="phone" class="label"
						>Staff Role</label
						>
						<select v-model="createForm.role.value" :disabled="user.role === 'user'" class="input-field">
							<option v-if="user.role === 'super_admin'" value="super_admin">
								Super Admin
							</option>
							<option value="admin">
								Admin
							</option>
							<option value="user">
								User
							</option>
						</select>
					</div>
				</div>
				<div class="w-6/12">
					<label for="ab-testing" class="label"
					>A/B testing role</label
					>
					<select v-model="createForm.ab_testing_role.value" :disabled="user.role === 'user'" name="ab-testing" class="input-field">
						<option v-if="user.role === 'super_admin'" value="">
							A
						</option>
						<option v-if="user.role === 'super_admin'" value="A">
							B
						</option>
						<option value="B">
							None
						</option>
					</select>
				</div>

				<div>
					<button v-if="user.role !== 'user'" type="submit" class="text-white disabled:cursor-not-allowed disabled:opacity-25 bg-black rounded-md px-6 py-2.5 text-xm" :disabled="!isFormEmpty">
						<span v-if="!loading" class="text-sm">Add Staff</span>
						<Spinner v-else />
					</button>
				</div>
			</form>
		</div>
	</main>
</template>

<script setup lang="ts">
import { useUser } from '@/composables/auth/user'
import { useCreateAdmin } from '@/composables/modules/staffs/create'
const { createForm, loading, createAdmin } = useCreateAdmin()
const { user } = useUser()
definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})

const isFormEmpty = computed(() => {
	return !!(createForm.fname.value && createForm.lname.value && createForm.email.value && createForm.phone.value && createForm.password.value && createForm.role.value)
})
</script>

<style></style>
