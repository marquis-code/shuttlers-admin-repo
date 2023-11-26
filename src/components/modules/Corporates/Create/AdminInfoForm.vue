<template>
	<div class="space-y-6">
		<div>
			<p class="font-bold">
				Admin Information
			</p>
			<p class="text-sm text-gray-600">
				Information about the key personnel that will manage the companny account.
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
				<input id="email" v-model="form.email" type="email" name="email" class="input-field">
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
		</form>
		<div class="flex justify-end items-end mt-6">
			<button :disabled="!isAdminInfoFormEmpty"
				class="bg-black disabled:cursor-not-allowed disabled:opacity-25 text-white rounded-md text-sm w-3/12 py-3"
				@click="createCompany">
				Create
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
    return !!(props.form.fname && props.form.lname && props.form.email && props.form.password && props.form.person_phone)
})
const emits = defineEmits(['complete'])
const createCompany = () => {
    emits('complete')
}

</script>
