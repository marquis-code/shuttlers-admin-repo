<template>
	<ButtonGoBack class="mb-6" />

	<main class="card p-0 ">
		<h1 class="card-header px-6 py-5 border-b">
			{{ type === 'new' ? "Enter agent's details" : "Edit agent's details" }}
		</h1>

		<form class="flex flex-col gap-4 px-6 py-12" @submit.prevent="type === 'new' ? createAgent() : editAgent()">
			<FileUpload
				v-model="createForm.avatar.value"
			/>

			<div class="grid lg:grid-cols-2 gap-8">
				<div class="field relative">
					<label for="First">First name</label>
					<input id="First" v-model="createForm.fname.value" type="text" class="input-field" required pattern="^[A-Za-z]+$" oninvalid="this.setCustomValidity('Please enter a valid name')" oninput="this.setCustomValidity('')">
				</div>

				<div class="field relative">
					<label for="Last">Last name</label>
					<input id="Last" v-model="createForm.lname.value" type="text" class="input-field" required pattern="^[A-Za-z]+$" oninvalid="this.setCustomValidity('Please enter a valid name')" oninput="this.setCustomValidity('')">
				</div>
			</div>
			<div class="grid lg:grid-cols-2 gap-8">
				<div class="field relative">
					<label for="Email">Email address</label>
					<input id="Email" v-model="createForm.email.value" type="email" class="input-field" required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" title="Please enter a valid email address">
				</div>

				<div class="field relative">
					<label for="Phone">Phone</label>
					<input id="Phone" v-model="createForm.phone.value" type="text" name="" class="input-field" required
						pattern="^(07|08|09)[0-9]{9}$"
						oninvalid="this.setCustomValidity('Please enter a valid 11-digit Nigerian phone number')"
						oninput="this.setCustomValidity('')"
						:maxlength="13"
						:minlength="10"
					>
				</div>
			</div>

			<div class="grid lg:grid-cols-2 gap-8">
				<div class="field relative">
					<label for="nin">NIN (Optional)</label>
					<input id="nin" disabled type="text" name="" class="input-field">
				</div>
				<div v-if="type === 'new'" class="field relative">
					<label for="password" class="w-full">Enter password</label>
					<input id="password" v-model="createForm.password.value" :type="showPassword ? 'text' : 'Password'" class="input-field" required>
					<icon name="eye" class="w-6 absolute top-[53%] right-4" @click="toggleShow" />
				</div>
			</div>
			<div class="grid  gap-4">
				<span class="text-lg font-medium">Location information</span>
				<div class="field relative">
					<label for="address">Address</label>
					<LocationInput id="address" v-model="createForm.location.value" class="input-field" required autocomplete="off" />
				</div>
			</div>

			<div>
				<button type="submit" class="btn-primary ml-auto mt-12" :disabled="createLoading || editLoading">
					<span v-if="!createLoading && !editLoading">{{ type === 'new' ? 'Create' : 'Edit' }}	 Agent</span>
					<Spinner v-else />
				</button>
			</div>
		</form>
	</main>
</template>

<script lang="ts" setup>
import { useCreateAgents } from '@/composables/modules/agents/create'
import { useEditAgents } from '@/composables/modules/agents/edit'

const { createAgent, createForm, loading: createLoading } = useCreateAgents()
const { editAgent, loading: editLoading, initForm } = useEditAgents()

const props = defineProps({
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

if (props.type === 'edit') {
	initForm(props.id)
}
const showPassword = ref(false)
const toggleShow = () => {
	showPassword.value = !showPassword.value
}
const preventDisableDate = (date) => {
	date < new Date().setHours(0, 0, 0, 0) || (date > new Date(new Date().getTime() + 28 * 24 * 3600 * 1000))
}

</script>
