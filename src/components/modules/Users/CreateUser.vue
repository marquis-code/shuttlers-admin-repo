<template>
	<ButtonGoBack class="mb-6" />

	<main class="card p-0 max-w-3xl">
		<h1 class="card-header px-6 py-5 border-b">
			Add a New User
		</h1>

		<form class="flex flex-col gap-4 px-6 py-12" @submit.prevent="createUser">
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
					<input id="Phone" v-model="createForm.phone.value" type="text" name="" class="input-field" required>
				</div>
			</div>
			<div class="grid lg:grid-cols-2 gap-8">
				<div class="field relative">
					<label for="password" class="w-full">Enter password</label>
					<input id="password" v-model="createForm.password.value" autocomplete="true" :type="showPassword ? 'text' : 'Password'" class="input-field" required>
					<icon name="eye" class="w-6 absolute top-[53%] right-4" @click="toggleShow" />
				</div>

				<div class="field relative">
					<label for="">Company (optional)</label>

					<InputMultiSelectCompanies obj-key="id" @updated="createForm.corporate_id.value = $event" />
				</div>
			</div>
			<div class="grid lg:grid-cols-2 gap-8">
				<div class="field">
					<label for="Date">Date of Birth</label>
					<InputDateInput id="Date" v-model="createForm.dob.value" class="font-light" placeholder="Filter by date" />
				</div>
				<div class="field">
					<label for="Date">Gender</label>
					<select id="gender" v-model="createForm.gender.value" name="" class="input-field">
						<option value="male">
							Male
						</option>
						<option value="female">
							Female
						</option>
					</select>
				</div>
			</div>

			<div>
				<button type="submit" class="btn-primary ml-auto mt-12" :disabled="createLoading">
					Add user
				</button>
			</div>
		</form>
	</main>
</template>

<script lang="ts" setup>
import { useGetCorporateList } from '@/composables/modules/corporates/fetch'
import { useCreateUsers } from '@/composables/modules/users/create'

const { createForm, createUser, loading: createLoading } = useCreateUsers()

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
const showPassword = ref(false)
const toggleShow = () => {
	showPassword.value = !showPassword.value
}

</script>
