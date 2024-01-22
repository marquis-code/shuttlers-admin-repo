<template>
	<div class="space-y-6">
		<div>
			<p class="font-bold">
				Admin Information
			</p>
			<p class="text-sm text-gray-600">
				Information about the key personnel that will manage the company account.
			</p>
		</div>
		<form class="space-y-6">
			<div>
				<label for="firstName" class="text-sm text-gray-700">First name</label>
				<input id="firstName" v-model="form.fname" type="text" name="firstName" class="input-field">
			</div>
			<div>
				<label for="lastName" class="text-sm text-gray-700">Last name</label>
				<input id="lastName" v-model="form.lname" type="text" name="lastName" class="input-field">
			</div>
			<div>
				<label for="email" class="text-sm text-gray-700">Email address</label>
				<input id="email" v-model="form.person_email" type="email" name="email" class="input-field">
			</div>
			<div>
				<label for="person_phone" class="text-sm text-gray-700">Phone</label>
				<input id="person_phone" v-model="form.person_phone" type="tel" name="person_phone" class="input-field">
			</div>
			<div>
				<label for="password" class="text-sm text-gray-700">Password</label>
				<input id="password" v-model="form.password" type="password" name="password"
					class="input-field">
			</div>
			<div v-if="$route.params.id" class="space-y-4">
				<p class="border-t border-gray-200 pt-3 font-semibold">Other Settings</p>
				<div>
					<label for="password" class="text-sm text-gray-700">Check-in/Check-out option</label>
					<select id="other-settings" v-model="form.cico_option" class="input-field" name="other-settings">
						<option value="manual">
							Manual
						</option>
						<option value="automatic">
							Automatic
						</option>
					</select>
				</div>
			</div>
		</form>
		<div class="flex justify-end items-end mt-6">
			<button :disabled="!$route.params.id ? !isAdminInfoFormEmpty : false"
				class="bg-black disabled:cursor-not-allowed disabled:opacity-25 text-white rounded-md text-sm w-3/12 py-3"
				@click="createCompany">
				{{ $route.params.id ? 'Update Company' : 'Create' }}
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
  const props = defineProps({
    form: {
        type: Object,
        required: true
    }
  })

  const isAdminInfoFormEmpty = computed(() => {
    return !!(props.form.fname && props.form.lname && props.form.person_email && props.form.password && props.form.person_phone)
})
const emits = defineEmits(['complete'])
const createCompany = () => {
    emits('complete')
}

</script>
