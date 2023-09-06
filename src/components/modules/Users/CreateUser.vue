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
			<form class="space-y-6 p-6 mt-5" @submit="createUser">
				<div class="lg:flex justify-between items-center lg:gap-x-10 gap-y-10 lg:gap-y-0">
					<div class="w-full">
						<label for="" class="text-sm font-light text-gray">
							First name</label>
						<input v-model="form.fname" type="text" name=""
							class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900">
					</div>

					<div class="w-full">
						<label for="" class="text-sm font-light text-gray">
							Last name</label>
						<input v-model="form.lname" type="text" name=""
							class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900">
					</div>
				</div>
				<div class="lg:flex justify-between items-center lg:gap-x-10 gap-y-10 lg:gap-y-0">
					<div class="w-full">
						<label for="" class="text-sm font-light text-gray">
							Email address</label>
						<input v-model="form.email" type="email" name=""
							class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900">
					</div>

					<div class="w-full">
						<label for="" class="text-sm font-light text-gray">
							Phone</label>
						<input v-model="form.phone" type="number" name=""
							class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900">
					</div>
				</div>
				<div class="lg:flex justify-between items-center lg:gap-x-10 gap-y-10 lg:gap-y-0">
					<div class="w-full relative">
						<label for="" class="text-sm font-light text-gray">
							Password</label>
						<input v-model="form.password" :type="showPassword ? 'text' : 'password'" name=""
							class="w-full outline-none px-3 py-2 rounded-md border focus:border-gray-900">
						<img v-if="showPassword" src="@/assets/icons/source/open-eye.svg" alt="open eye" class="absolute right-4 top-10 cursor-pointer" @click="showPassword = false">
						<img v-if="!showPassword" src="@/assets/icons/source/closed-eye.png" alt="" class="absolute right-4 top-10 cursor-pointer" @click="showPassword = true">
					</div>

					<div class="w-full">
						<label for="" class="text-sm font-light text-gray">
							Company (optional)</label>
						<!-- <InputDropdownList :children="corporatesList" /> -->
					</div>
				</div>
				<div class="w-full lg:w-6/12">
					<label for="" class="text-sm font-light text-gray">
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

const createUser = () => {}
</script>
