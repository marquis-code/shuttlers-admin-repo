<template>
	<Modal
		modal="$atts.modal"
		title="Change profile picture"
	>
		<form class="flex flex-col gap-4 w-full" @submit.prevent="changePicture">
			<div class="flex flex-col gap-1">
				<label class="label">Upload Image</label>
				<!-- <CustomImageFileInput
					v-model="imageUri"
					:label="'Select an image to upload'"
					:value="bannerURL"
					@update:value="setBannerUrl"
					@file-selected="setCropperImage"
				/> -->
			</div>
			{{ imageUri }}

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

const { loading, imageUri, changePicture, clearObj } = useDriverPicture()

onBeforeUnmount(() => clearObj())
</script>

<style scoped>
label{
	margin: 0;
}
</style>
