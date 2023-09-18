<template>
	<main>
		<ButtonGoBack class="mb-6" />

		<div class="bg-white rounded-md border w-11/12 lg:w-8/12">
			<div class="px-6 py-5">
				<p class="font-medium">
					Add a New User
				</p>
			</div>
			<hr>
			<form class="space-y-6 p-6 mt-5" @submit.prevent="createUser">
				<div class="lg:flex justify-between items-center lg:gap-x-10 gap-y-10 lg:gap-y-0">
					<div class="field relative">
						<label for="First">First name</label>
						<input id="First" v-model="createForm.fname.value" type="text" class="input-field">
					</div>

					<div class="field relative">
						<label for="Last">Last name</label>
						<input id="Last" v-model="createForm.lname.value" type="text" class="input-field">
					</div>
				</div>
				<div class="lg:flex justify-between items-center lg:gap-x-10 gap-y-10 lg:gap-y-0">
					<div class="field relative">
						<label for="">
							Email address</label>
						<input v-model="createForm.email" type="email" name=""
							class="input-field">
					</div>

					<div class="field relative">
						<label for="">
							Phone</label>
						<input v-model="createForm.phone" type="number" name=""
							class="input-field">
					</div>
				</div>
				<div class="lg:flex justify-between items-center lg:gap-x-10 gap-y-10 lg:gap-y-0">
					<div class="w-full relative">
						<label for="">
							Password</label>
						<input v-model="createForm.password" :type="showPassword ? 'text' : 'password'" name=""
							class="input-field">
						<img v-if="showPassword" src="@/assets/icons/source/open-eye.svg" alt="open eye" class="absolute right-4 top-10 cursor-pointer" @click="showPassword = false">
						<img v-if="!showPassword" src="@/assets/icons/source/closed-eye.png" alt="" class="absolute right-4 top-10 cursor-pointer" @click="showPassword = true">
					</div>

					<div class="field relative">
						<label for="">
							Company (optional)</label>
						<!-- <InputDropdownList :children="corporatesList" /> -->
					</div>
				</div>
				<div class="w-full lg:w-6/12">
					<label for="">
						Date of Birth</label>
					<date-picker v-model:value="form.dob" style="width: 100%" class="font-light"
						placeholder="Filter by date" />
				</div>
				<div>
					<button type="submit" class="py-2.5 bg-black text-white w-3/12 rounded-lg">
						Add user
					</button>
				</div>
			</form>
		</div>
	</main>
</template>

<script lang="ts" setup>
import { useGetCorporateList } from '@/composables/modules/corporates/fetch'
import { useCreateUsers } from '@/composables/modules/users/create'

const { createForm, createUser, loading: createLoading } = useCreateUsers()

const { getCorporatesList, loading, corporatesList } = useGetCorporateList()
getCorporatesList()
const router = useRouter()
const showPassword = ref(false)

const form = ref({
	fname: '',
    lname: '',
    email: '',
    password: '',
    phone: '',
    company: '',
    dob: ''
})

</script>
