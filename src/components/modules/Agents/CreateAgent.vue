<template>
	<ButtonGoBack class="mb-6" />

	<main class="card p-0 ">
		<h1 class="card-header px-6 py-5 border-b">
			{{ type === 'new' ? 'Enter agents details' : 'Edit' }}  User
		</h1>

		<form class="flex flex-col gap-4 px-6 py-12" @submit.prevent="type === 'new' ? createUser() : editUser(id)">
			<FileUpload
				v-model="createForm.fname.value"
				@update:value="null"
				@reset="null"
				@file-selected="null"
			/>

			<div class="grid lg:grid-cols-2 gap-8">
				<div class="field relative">
					<label for="First">First name</label>
					<input id="First" v-model="createForm.fname.value" type="text" class="input-field" required>
				</div>

				<div class="field relative">
					<label for="Last">Last name</label>
					<input id="Last" v-model="createForm.lname.value" type="text" class="input-field" required>
				</div>
			</div>
			<div class="grid lg:grid-cols-2 gap-8">
				<div class="field relative">
					<label for="Email">Email address</label>
					<input id="Email" v-model="createForm.email.value" type="email" class="input-field" required>
				</div>

				<div class="field relative">
					<label for="Phone">Phone</label>
					<input id="Phone" v-model="createForm.phone.value" type="tel" name="" class="input-field" required>
				</div>
			</div>

			<div class="grid lg:grid-cols-2 gap-8">
				<div class="field relative">
					<label for="nin">NIN (Optional)</label>
					<input id="nin" v-model="createForm.phone.value" type="number" name="" class="input-field">
				</div>
				<div v-if="type === 'new'" class="field relative">
					<label for="password" class="w-full">Enter password</label>
					<input id="password" v-model="createForm.password.value" autocomplete="true" :type="showPassword ? 'text' : 'Password'" class="input-field" required>
					<icon name="eye" class="w-6 absolute top-[53%] right-4" @click="toggleShow" />
				</div>
			</div>
			<div class="grid  gap-4">
				<span class="text-lg font-medium">Location information</span>
				<div class="field relative">
					<label for="address">Address</label>
					<input id="address" v-model="createForm.phone.value" type="tel" name="" class="input-field" required>
				</div>
			</div>

			<div>
				<button type="submit" class="btn-primary ml-auto mt-12" :disabled="createLoading">
					<span v-if="!createLoading">{{ type === 'new' ? 'Create' : 'Edit' }}	 Agent</span>
					<Spinner v-else />
				</button>
			</div>
		</form>
	</main>
</template>

<script lang="ts" setup>
import { useCreateUsers } from '@/composables/modules/users/create'
import { useUserIdDetails } from '@/composables/modules/users/id'

const { selectedUser } = useUserIdDetails()

const { createForm, createUser, editUser, loading: createLoading } = useCreateUsers()

 defineProps({
	id: {
		type: String,
		required: false,
		default: ''
	},
	type: {
		type: String,
		required: false,
		default: 'new'
	}
})
const showPassword = ref(false)
const toggleShow = () => {
	showPassword.value = !showPassword.value
}
const preventDisableDate = (date) => {
	date < new Date().setHours(0, 0, 0, 0) || (date > new Date(new Date().getTime() + 28 * 24 * 3600 * 1000))
}

</script>
