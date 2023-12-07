<template>
	<Modal
		modal="$atts.modal"
		title="Crop image"
	>
		<p class="text-neut6 mt-4 text-xs md:text-sm w-full">
			Adjust image to fit cropper window as desired.
		</p>

		<div class="h-[209px] my-4 md:my-9 py-6 border border-grey9 rounded-lg">
			<CustomCropper
				:src="banner"
				:save="save"
				@on-save="onSave"
			/>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-y-3 md:gap-x-3 w-full mt-6 md:mt-8">
			<button
				class="btn btn-outline-primary"
				type="button"
				:disabled="processingBannner"
				@click="close"
			>
				Cancel
			</button>
			<button
				class="btn btn-primary"
				type="button"
				:disabled="processingBannner"
				@click="saveCroppedImageTrigger"
			>
				{{ processingBannner ? 'Processing...' : 'Save' }}
			</button>
		</div>
	</Modal>
</template>

<script setup lang="ts">
import { useCoreModal } from '@/composables/core/modals'
import Modal from '@/components/core/modal/Modal.vue'
import { use_image_upload } from '@/composables/core/upload'

const { bannerBase64, bannerURL, uploadApi } = use_image_upload()
const banner = bannerBase64
const save = ref(false)
const close = () => {
    useCoreModal().closeImageCropper()
    bannerBase64.value = ''
}
const saveCroppedImageTrigger = () => {
    processingBannner.value = true
	save.value = true
}
const onSave = (e: any) => {
    save.value = false
	uploadApi()
}
const processingBannner = ref(false)

watch(bannerURL, () => {
    if (bannerURL.value) {
        processingBannner.value = false
        close()
    }
})

</script>

<style lang="scss">
.image-cropper {
    & .modal {
        width: 100%;
        max-width: 589px;
        gap: 0 !important;
        border-radius: 12px;
    }
    & .modal-title {
        & span {
            text-align: start !important;
        }
    }
}
</style>
