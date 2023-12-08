<template>
	<Modal
		modal="$atts.modal"
		title="Change profile picture"
	>
		<form class="flex flex-col gap-4 w-full" @submit.prevent="changePicture">
			<div class="flex flex-col gap-1">
				<label class="label">Upload Image</label>
				<CustomImageFileInput
					v-model="imageUri"
					:label="'Select an image to upload'"
					:value="bannerURL"
					@update:value="setBannerUrl"
					@file-selected="setCropperImage"
					@reset="resetFileInput"
				/>
			</div>

			<button type="submit" :disabled="loading || !imageUri"
				class="mt-10 text-sm bg-black p-[16px] text-white text-center w-full border-none outline-none rounded disabled:cursor-not-allowed disabled:bg-[#E0E6ED]"
			>
				{{ loading ? 'processing...' : 'Upload' }}
			</button>
		</form>
	</Modal>
	<!--
		:value="bannerURL"
		@update:value="setBannerUrl"
		@reset="resetFileInput"
		@file-selected="setCropperImage"
	 -->
</template>

<script setup lang="ts">
import { useDriverPicture } from '@/composables/modules/drivers'
import { use_image_upload } from '@/composables/core/upload'

const { loading, imageUri, changePicture, clearObj } = useDriverPicture()
const { uploadProgress, bannerURL, bannerBase64 } = use_image_upload()

const setCropperImage = (image: string) => {
	bannerBase64.value = image
}
const setBannerUrl = (value: any) => {
	bannerURL.value = value
}
const resetFileInput = () => {
	setBannerUrl('')
	uploadProgress.value = 0
}

onBeforeUnmount(() => {
	clearObj()
	resetFileInput()
})
</script>

<style scoped>
label{
	margin: 0;
}
</style>
