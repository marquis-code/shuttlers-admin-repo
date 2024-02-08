<template>
	<Modal
		modal="$atts.modal"
		title="Change Profile Picture"
		:no-close-btn="false"
		class="text-center"
	>
		<form class="flex flex-col gap-6 mt-4" @submit.prevent="changeProfile">
			<div class="flex flex-col items-center justify-center space-y-4">
				<div class="w-full h-20">
					<img :src="imageSrc || placeholder" alt="Preview" class="rounded-lg h-20 p-3 w-full border border-dotted border-gray-400 object-center object-cover">
				</div>
				<input
					type="file"
					accept="image/*"
					class="file:mr-4 file:py-2 file:px-4
				  file:rounded-full file:border-0
				  file:text-sm file:font-semibold
				  file:bg-violet-50 file:text-violet-700
				  hover:file:bg-violet-100"
					@change="handleFileChange"
				>
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
import placeholder from '@/assets/icons/source/upload-cloud.svg'
import { useUserModal } from '@/composables/core/modals'
import { useCreateUsers } from '@/composables/modules/users/create'
import { useUserIdDetails } from '@/composables/modules/users/id'
const { getUserById, loading: loadingUser, selectedUser } = useUserIdDetails()
const user_id = Number(useRoute().params.id)
const { updateUserAvatar, loading } = useCreateUsers()
const form = ref({
    imgUrl: '' as any
})

const route = useRoute()
const isButtonEnabled = computed(() => {
	return form.value.imgUrl
})

const changeProfile = () => {
	const payload = {
        avatar: form.value.imgUrl
    }
	updateUserAvatar(payload).then(() => {
		getUserById()
	})
}

const imageSrc = ref('') as any

onMounted(async () => {
  getUserById()
  if (selectedUser?.value?.avatar) {
    imageSrc.value = selectedUser?.value.avatar
  } else {
    imageSrc.value = placeholder
  }
})

function handleFileChange(event) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      imageSrc.value = e?.target?.result
	  form.value.imgUrl = e?.target?.result
    }
    reader.readAsDataURL(file)
  }
}
</script>

<style>

</style>
