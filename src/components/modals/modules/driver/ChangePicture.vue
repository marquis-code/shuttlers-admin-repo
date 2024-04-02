<template>
	<Modal modal="$atts.modal" title="Change profile picture">
		<form class="flex flex-col gap-4 w-full" @submit.prevent="changePicture">
			<div class="space-y-4">
				<section class="flex justify-center items-center">
					<img :src="imageUrl" alt="Profile Picture" class="rounded-md h-32 w-full object-cover object-center">
				</section>
				<section class="flex justify-center items-center">
					<label for="image" class="w-full mt-3 tracking-wide text-sm font-bold  cursor-pointer flex justify-center items-center">
						<img src="@/assets/icons/source/previewUrl.svg" alt="preview icon">Click to Update Image
						<input id="image" name="image" class="hidden" type="file" accept="image/*" @change="handleFileChange">
					</label>
				</section>
			</div>

			<button type="submit" :disabled="loading || !imageUri"
				class="mt-10 text-sm bg-black p-[16px] text-white text-center w-full border-none outline-none rounded disabled:cursor-not-allowed disabled:bg-[#E0E6ED]">
				{{ loading ? 'processing...' : 'Upload' }}
			</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import defaultImage from '@/assets/images/avatar.png'
import { useDriverIdDetails } from '@/composables/modules/drivers/id'
import { useDriverPicture } from '@/composables/modules/drivers'
const { selectedDriver } = useDriverIdDetails()

const { loading, imageUri, changePicture, clearObj } = useDriverPicture()

onBeforeUnmount(() => {
	clearObj()
})

const imageUrl = ref<string>(defaultImage)
const selectedFile = ref<string>('')

onMounted(async () => {
	if (selectedDriver.value.avatar) {
		imageUrl.value = selectedDriver.value.avatar
	}
})

// Handle file selection
function handleFileChange(event: Event) {
	const target = event.target as HTMLInputElement
	if (target.files && target.files[0]) {
    const file = target.files[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      selectedFile.value = reader.result as string
	  imageUri.value = reader.result as string
      imageUrl.value = reader.result as string
    }
    reader.readAsDataURL(file)
  }
}
</script>

<style scoped>
label {
	margin: 0;
}
</style>
