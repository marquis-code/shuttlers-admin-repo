<template>
	<Modal
		modal="$atts.modal"
		title="Change Profile Picture"
		:no-close-btn="false"
		class="text-center"
	>
		<form class="flex flex-col gap-6 mt-4" @submit.prevent="changeProfile">
			<div class="field relative space-y-3">
				<div>
					<label for="oldPassword">Upload Image</label>
				</div>
				<label v-if="!previewUrl" for="image" class="w-full p-4 shadow-sm rounded-md border-[0.4px] h-40 space-y-3 border-gray-700 bg-red-500 border-dotted tracking-wide  cursor-pointer grid place-content-center">
					<p class="flex justify-center items-center gap-x-2">Click to select image</p>
					<input id="image" name="image" class="hidden h-full w-full" type="file" accept="image/*" @change="onFileSelected">
				</label>
				<div v-else class="w-full h-40 rounded-md">
					<img :src="previewUrl" alt="previewAmenity" class="h-40 w-full object-cover rounded-md">
				</div>
			</div>
			<div class="flex justify-between items-center gap-x-10 mt-6">
				<button type="submit" class="bg-gray-600 py-3 rounded-md text-xs text-white w-full" @click="useUserModal().closeChangeProfile()">
					Cancel
				</button>
				<button type="submit" class="btn btn-primary py-3 text-xs w-full disabled:cursor-not-allowed disabled:opacity-25" :disabled="!isButtonEnabled">
					<span v-if="!loading" class="text-sm">Upload</span>
					<Spinner v-else />
				</button>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useUserModal } from '@/composables/core/modals'
import { useCreateUsers } from '@/composables/modules/users/create'
import { useUserIdDetails } from '@/composables/modules/users/id'
const { getUserById } = useUserIdDetails()
const user_id = Number(useRoute().params.id)
const { updateUserAvatar, loading } = useCreateUsers()
const form = ref({
    imgUrl: '' as any
})

const route = useRoute()
const id = String(route.params.id)

const previewUrl = ref(null) as any

const onFileSelected = (e) => {
	const file = e.target.files[0]
	if (file) {
		const fileReader = new FileReader()

		fileReader.onload = (e) => {
			form.value.imgUrl = e?.target?.result
		}
		previewUrl.value = URL.createObjectURL(e.target.files[0])
		fileReader.readAsDataURL(file)
	}
}

const isButtonEnabled = computed(() => {
	return form.value.imgUrl
})

const changeProfile = () => {
	const payload = {
        avatar: form.value.imgUrl
    }
	// populateUserProfileUpdateForm(payload)
	// updateProfilePicture(id)'
	updateUserAvatar(payload).then(() => {
		getUserById(String(user_id))
	})
}
</script>

<style>

</style>
