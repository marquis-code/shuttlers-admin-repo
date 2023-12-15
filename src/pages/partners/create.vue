<template>
	<main class="flex flex-col gap-4">
		<ButtonGoBack />
		<form class="border bg-light p-4 rounded-md flex flex-col gap-4 max-w-[500px]" @submit.prevent="createPartner">
			<div class="flex flex-col gap-0">
				<h3 class="text-xl font-medium text-dark">
					Create a new partner
				</h3>
				<p class="text-sm text-grey5 font-medium">
					Kindly input the correct informations
				</p>
			</div>
			<div class="flex items-center gap-4 justify-between p-3 bg-[rgb(249,251,253)] rounded-md">
				<div class="flex items-center gap-2">
					<input id="existing" v-model="type" type="radio" value="existing">
					<label for="existing" class="label">Existing User</label>
				</div>
				<div class="flex items-center gap-2">
					<input id="new" v-model="type" type="radio" value="new">
					<label for="new" class="label">New User</label>
				</div>
			</div>

			<InputMultiSelectUsers v-if="type === 'existing'" v-model="selected_user" />
			<div v-else class="grid grid-cols-1 gap-4">
				<div class="flex flex-col gap-1">
					<label class="label">First Name</label>
					<input v-model="fname" type="text" class="input-field" placeholder="Enter first name" :required="isNew">
				</div>
				<div class="flex flex-col gap-1">
					<label class="label">Last Name</label>
					<input v-model="lname" type="text" class="input-field" placeholder="Enter last name" :required="isNew">
				</div>
				<div class="flex flex-col gap-1">
					<label class="label">Email</label>
					<input v-model="email" type="email" class="input-field" placeholder="Enter email address" :required="isNew">
				</div>
				<div class="flex flex-col gap-1">
					<label class="label">Phone</label>
					<input v-model="phone" type="number" class="input-field" placeholder="Enter phone number" :required="isNew">
				</div>
				<div class="flex flex-col gap-1">
					<label class="label">Password</label>
					<input v-model="password" type="password" class="input-field" placeholder="Enter password" :required="isNew">
				</div>
				<div class="flex flex-col gap-1">
					<label class="label">company (Optional)</label>
					<InputMultiSelectCompanies v-model="company" />
				</div>
				<div class="flex flex-col gap-1">
					<label class="label">Date of birth</label>
					<InputDateInput v-model="dob" placeholder="Select date of birth" :disabled-date="() => false" />
				</div>
				<div class="flex items-center gap-4 justify-between p-2">
					<div class="flex items-center gap-2">
						<input id="male" v-model="gender" type="radio" value="male">
						<label for="male" class="label">Male</label>
					</div>
					<div class="flex items-center gap-2">
						<input id="female" v-model="gender" type="radio" value="female">
						<label for="female" class="label">Female</label>
					</div>
				</div>
			</div>

			<p>Select category</p>
			<div class="flex items-center gap-4 justify-between p-3 bg-[rgb(249,251,253)] rounded-md">
				<div class="flex items-center gap-2">
					<input id="individual" v-model="category" type="radio" value="individual">
					<label for="individual" class="label">An Individual</label>
				</div>
				<div class="flex items-center gap-2">
					<input id="business" v-model="category" type="radio" value="business">
					<label for="business" class="label">Registered Business</label>
				</div>
			</div>

			<div v-if="category === 'business'" class="grid grid-cols-1 gap-4">
				<p class="text-sm text-grey5">
					Company Information
				</p>
				<div class="flex flex-col gap-1">
					<label class="label">Company Name</label>
					<input v-model="company_name" type="text" class="input-field" placeholder="Enter company name" :required="isBusiness">
				</div>
				<div class="flex flex-col gap-1">
					<label class="label">Company Email</label>
					<input v-model="company_email" type="email" class="input-field" placeholder="Enter company email address" :required="isBusiness">
				</div>
				<div class="flex flex-col gap-1">
					<label class="label">Company Phone</label>
					<input v-model="company_phone" type="number" class="input-field" placeholder="Enter company phone" :required="isBusiness">
				</div>
				<div class="flex flex-col gap-1">
					<label class="label">Company RC Number</label>
					<input v-model="company_rc_number" type="text" class="input-field" placeholder="Enter company RC number" :required="isBusiness">
				</div>
				<div class="flex flex-col gap-1">
					<label class="label">Business Type</label>
					<select v-model="business_type" class="input-field" :required="isBusiness">
						<option v-for="n in business_options" :key="n" :value="n">
							{{ n }}
						</option>
					</select>
				</div>
				<div class="flex flex-col gap-1">
					<label class="label">Company Address</label>
					<input v-model="company_address" type="text" class="input-field" placeholder="Enter company address" :required="isBusiness">
				</div>
				<div class="flex flex-col gap-1">
					<label class="label">Years of experience</label>
					<InputDateInput v-model="experience_start_date" placeholder="" :disabled-date="() => false" />
				</div>
			</div>

			<div class="flex flex-col gap-1">
				<label class="label">Cities</label>
				<InputMultiSelect v-if="allCityNames.length"
					id="select_cities_input"
					v-model="cities" track-by="id" placeholder="Select cities"
					:custom-label="(city)=>`${city.name}`"
					open-direction="bottom" :options="allCityNames" :multiple="true"
					:searchable="true" :loading="false"
					:internal-search="true"
					:show-no-results="false" :hide-selected="true" />
				<Skeleton v-else height="45px" radius="10px" />
			</div>

			<button class="bg-dark text-light text-sm mt-5 w-fit px-4 py-2 disabled:bg-grey2 disabled:cursor-not-allowed rounded-md" type="submit" :disabled="loading || !enableButton">
				{{ loading ? 'Processing' : 'Create' }}
			</button>
		</form>
	</main>
</template>

<script setup lang="ts">
import { useCreatePartner } from '@/composables/modules/partners/create'
import { useCityAndCountry } from '@/composables/modules/configure/charges/utils'

const { type, selected_user, category, fname, lname, email, phone, password, company, dob, gender, company_name, company_email, company_phone, company_rc_number, experience_start_date, company_address, cities, isNew, isBusiness, clearObj, createPartner, business_type, loading, enableButton } = useCreatePartner()
const { fetchAllCityNames, allCityNames } = useCityAndCountry()
const business_options = [
	'Business Name',
	'Company',
	'Incorporated Trustee',
	'Limited Partnership',
	'Limited Liability Partnership'
]

clearObj()
fetchAllCityNames()
definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})
</script>

<style scoped>
label,p,h3,span{
	margin: 0;
}
</style>
