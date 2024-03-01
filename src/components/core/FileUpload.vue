<template>
	<section>
		<label class="flex gap-5 mb-4 !cursor-pointer" for="upload">
			<img :src="image_ref || `/user.svg`" name="user" class="w-32 border rounded-full max-h-[126px] max-w-[126px] min-h-[126px] min-w-[126px] cursor-pointer">
			<div

				class="flex center  border py-4 px-6 rounded-lg cursor-pointer   max-w-[366px]"
			>
				<div class="flex flex-col items-center">
					<Icon name="upload" class="w-12" />
					<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
						<span class="font-semibold text-green7">Click to upload</span>
						or drag and drop
					</p>
					<p class="text-xs text-gray-500 dark:text-gray-400">
						SVG, PNG, JPG or GIF (Dimension. 2021x724px)
					</p>
				</div>
			</div>
		</label>
		<input
			id="upload"
			type="file"
			:multiple="false"
			accept=".png, .jpg, .jpeg, .gif, .svg"
			class="absolute top-0 h-full opacity-0"
			@change="onChange"
		>
	</section>
</template>

<script setup lang="ts">
import { use_file_upload } from '@/composables/core/upload'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
	modelValue: {
		type: String,
		default: null
	}
})

const image_ref = ref(props.modelValue)

watch(props, () => {
	image_ref.value = props.modelValue
}, { immediate: true })

const onChange = (e) => {
	const files = e.target?.files
	if (files.length > 0) {
		const file = files[0]
		const reader = new FileReader()

		reader.onloadend = async (e) => {
			const image = e.target?.result
			const url = await use_file_upload().upload(image as string)
			image_ref.value = url
			emit('update:modelValue', url)
		}
		 reader.readAsDataURL(file)
	}
}
</script>

<style scoped>

</style>
