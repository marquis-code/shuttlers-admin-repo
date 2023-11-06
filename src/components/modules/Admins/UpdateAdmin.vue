<template>
	<main v-if="!loadingStaffs" class="card p-0 max-w-3xl">
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
			</div>
			<div>
				<button type="submit" class="btn-primary py-0 ml-auto mt-12">
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
const { createForm, loading: createLoading, editAdmin, prePopulateForm } = useCreateAdmin()
const id = useRoute().params.id as string

const { getStaffs, loading: loadingStaffs, staffsData } = useGetStaffs()
getStaffs()
const selectedAdmin = computed(() => {
	if (loadingStaffs.value) return
	return staffsData.value.find((staff) => staff.id === Number(id))
})

watch(() => selectedAdmin, (val) => {
	const payload = {
        fname: val?.value?.fname,
        lname: val?.value?.lname,
        email: val?.value?.email,
        phone: val?.value?.phone,
        role: val?.value?.role
	}
	prePopulateForm(payload)
}, { deep: true })

</script>
