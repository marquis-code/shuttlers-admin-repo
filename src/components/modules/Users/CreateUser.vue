<template>
	<main>
		<main class="card p-0 max-w-3xl">
			<h1 class="card-header px-6 py-5 border-b">
				{{ type === 'new' ? 'Add a New' : 'Edit' }} User
			</h1>

			<form class="flex flex-col gap-4 px-6 py-12" @submit.prevent="type === 'new' ? createUser() : editUser(id)">
				<div class="grid lg:grid-cols-2 gap-8">
					<div class="field relative">
						<label for="First">First name</label>
						<input id="First" v-model="createForm.fname.value" name="first_name" type="text"
							class="input-field" required>
					</div>

					<div class="field relative">
						<label for="Last">Last name</label>
						<input id="Last" v-model="createForm.lname.value" name="last_name" type="text"
							class="input-field" required>
					</div>
				</div>
				<div class="grid lg:grid-cols-2 gap-8">
					<div class="field relative">
						<label for="Email">Email address</label>
						<input id="Email" v-model="createForm.email.value" name="email_address" type="email"
							class="input-field" required>
					</div>

					<div class="field relative">
						<label for="Phone">Phone</label>
						<input id="Phone" v-model="createForm.phone.value" name="phone" type="tel" class="input-field"
							required>
					</div>
				</div>
				<div class="grid lg:grid-cols-2 gap-8">
					<div class="field">
						<label for="Date">Date of Birth</label>
						<InputDateInput id="Date" v-model="createForm.dob.value" name="date_of_birth"
							:disabled-date="preventDisableDate" class="font-light" placeholder="Filter by date" />
					</div>
					<div class="field">
						<label for="Date">Gender</label>
						<select id="gender" v-model="createForm.gender.value" name="gender" class="input-field">
							<option value="male">
								Male
							</option>
							<option value="female">
								Female
							</option>
						</select>
					</div>
				</div>
				<div class="grid lg:grid-cols-2 gap-8">
					<div v-if="type === 'new'" class="field relative">
						<label for="password" class="w-full">Enter password</label>
						<input id="password" v-model="createForm.password.value" name="password" autocomplete="true"
							:type="showPassword ? 'text' : 'Password'" class="input-field" required>
						<icon name="eye" class="w-6 absolute top-[53%] right-4" @click="toggleShow" />
					</div>

					<div class="field relative">
						<label for="company">Company (optional)</label>
						<InputMultiSelectCompanies name="company" obj-key="id" :value="selectedUser.company" @updated="createForm.corporate_id.value = $event" />
					</div>
				</div>

				<div>
					<button type="submit" class="btn-primary ml-auto mt-12" :disabled="createLoading">
						<span v-if="!createLoading">{{ type === 'new' ? 'Add' : 'Edit' }} user</span>
						<Spinner v-else />
					</button>
				</div>
			</form>
		</main>
	</main>
</template>

<script lang="ts" setup>
import { useGetCorporateList } from '@/composables/modules/corporates/fetch'
import { useCreateUsers } from '@/composables/modules/users/create'
import { useUserIdDetails } from '@/composables/modules/users/id'
const { corporatesList: companies, getCorporatesList } = useGetCorporateList()
const { selectedUser } = useUserIdDetails()

const { createForm, createUser, editUser, loading: createLoading } = useCreateUsers()

onMounted(() => {
	getCorporatesList()
})
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
