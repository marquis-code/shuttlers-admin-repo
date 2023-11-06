<template>
	<main class="card p-0 max-w-3xl">
		<h1 class="card-header text-sm px-6 py-5 border-b">
			Update Admin User
		</h1>

		<form class="flex flex-col gap-4 px-6 py-12" @submit.prevent="editAdmin(id)">
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
			<div class="">
				<div class="field relative">
					<label for="Email">Email address</label>
					<input id="Email" v-model="createForm.email.value" type="email" class="input-field" required>
				</div>
			</div>
			<div class="grid lg:grid-cols-2 gap-8">
				<div class="field relative">
					<label for="Phone">Phone</label>
					<input id="Phone" v-model="createForm.phone.value" type="text" name="" class="input-field" required>
				</div>
				<div class="field">
					<label for="role">Staff Role</label>
					<select id="role" v-model="createForm.role.value" name="" class="input-field">
						<option value="super_admin">
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
			<div>
				<button type="submit" class="btn-primary ml-auto mt-12" :disabled="createLoading">
					<span v-if="!createLoading">Update User</span>
					<Spinner v-else />
				</button>
			</div>
		</form>
	</main>
</template>

<script lang="ts" setup>
import { useCreateAdmin } from '@/composables/modules/staffs/create'
// import { useUserIdDetails } from '@/composables/modules/staffs/id'

// const { selectedUser } = useUserIdDetails()

const { createForm, loading: createLoading, createAdmin, editAdmin, prePopulateForm } = useCreateAdmin()

 defineProps({
	id: {
		type: String,
		required: false,
		default: ''
	}
})
</script>
