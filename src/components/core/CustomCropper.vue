<template>
	<Cropper
		ref="cropper"
		:src="src"
		:stencil-size="{
			width: 2021,
			height: 724
		}"
		:canvas-size="{
			maxWidth: 2021,
			maxHeight: 724
		}"
		:stencil-props="{
			handlers: {
				eastNorth: true,
				north: true,
				westNorth: true,
				west: true,
				westSouth: true,
				south: true,
				eastSouth: true,
				east: true,
			},
			movable: false,
			resizable: true,
			previewClass: 'preview'
		}"
		image-restriction="stencil"
		:background-wrapper-component="
			CustomBackgroundWrapper
		"
	/>
</template>

<script lang="ts" setup>
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import CustomBackgroundWrapper from './CustomBackgroundWrapper.vue'

const props = defineProps({
	src: {
		type: String,
		default: ''
	},
	save: {
		type: Boolean,
		default: false
	}
})
const emits = defineEmits(['onSave'])
const cropper = ref(null) as Ref<any>
const saveProp = toRef(props, 'save')
const processImage = (canvas: any) => {
	return new Promise((resolve) => {
        canvas.toBlob((blob: any) => {
			resolve(blob)
		}, 'image/jpeg', 0.80)
    })
}

watch(saveProp, async () => {
	if (!saveProp.value) return
	const { canvas } = cropper.value.getResult()
	const res = await processImage(canvas)
	emits('onSave', res)
})
</script>
