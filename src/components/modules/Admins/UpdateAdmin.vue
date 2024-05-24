<template>
	<main v-if="!loading" class="card p-0 max-w-3xl">
		<h1 class="card-header text-sm px-6 py-5 border-b">
			Update Admin User
		</h1>
		<!-- {{ newData }} -->
		<form v-if="selectedAdmin" class="flex flex-col gap-4 px-6 py-12" @submit.prevent="editAdmin(id)">
			<div class="grid lg:grid-cols-2 gap-8">
				<div class="field relative">
					<label for="First">First name</label>
					<input id="First" v-model="selectedAdmin.fname" type="text" class="input-field" required>
				</div>

				<div class="field relative">
					<label for="Last">Last name</label>
					<input id="Last" v-model="selectedAdmin.lname" type="text" class="input-field" required>
				</div>
			</div>
			<div class="">
				<div class="field relative">
					<label for="Email">Email address</label>
					<input id="Email" v-model="selectedAdmin.email" type="email" class="input-field" required>
				</div>
			</div>
			<div class="grid lg:grid-cols-2 gap-8">
				<div class="field relative">
					<label for="Phone">Phone</label>
					<input id="Phone" v-model="selectedAdmin.phone" type="text" name="" class="input-field" required>
				</div>
				<div class="field">
					<label for="role">Staff Role</label>
					<select id="role" v-model="selectedAdmin.role" name="" class="input-field">
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
				<div class="field">
					<label for="role">Staff Role</label>
					<select v-model="selectedAdmin.ab_testing_role" :disabled="user.role === 'user'" name="ab-testing" class="input-field">
						<option v-if="user.role === 'super_admin'" value="A">
							A
						</option>
						<option v-if="user.role === 'super_admin'" value="B">
							B
						</option>
						<option value="">
							None
						</option>
					</select>
				</div>
			</div>
			<div>
				<button type="submit" class="btn-primary py-2.5 ml-auto mt-12">
					<span v-if="!createLoading" class="text-sm">Update User</span>
					<Spinner v-else />
				</button>
			</div>
		</form>
	</main>
	<Skeleton v-else height="300px" />
</template>

<script lang="ts" setup>
import { useCreateAdmin } from '@/composables/modules/staffs/create'
import { useGetStaffs } from '@/composables/modules/staffs/fetch'
import { useAdminIdDetails } from '@/composables/modules/staffs/id'
import { useUser } from '@/composables/auth/user'

const { user } = useUser()

const { selectedAdmin, loading } = useAdminIdDetails()
const { createForm, loading: createLoading, editAdmin, prePopulateForm } = useCreateAdmin()
const id = useRoute().params.id as string

watch(() => selectedAdmin, (val) => {
	const payload = {
        fname: val?.value?.fname,
        lname: val?.value?.lname,
        email: val?.value?.email,
        phone: val?.value?.phone,
        role: val?.value?.role,
        ab_testing_role: val?.value?.ab_testing_role
	}
	prePopulateForm(payload)
}, { deep: true })

</script>
