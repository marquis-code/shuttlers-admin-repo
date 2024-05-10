<template>
	<section class="relative w-auto flex ">
		<label class="flex items-center gap-5 mb-4 !cursor-pointer" for="upload">
			<img v-if="showPreview" :src="image_ref || `/user2.svg`" name="user" class="w-32 border rounded-full max-h-[126px] max-w-[126px] min-h-[126px] min-w-[126px] cursor-pointer">
			<div

				class="flex center  border py-4 px-6 rounded-lg cursor-pointer max-w-[366px]"
			>
				<div class="flex flex-col items-center">
					<Icon name="upload" class="w-12" />
					<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
						<span class="font-semibold text-green7">Click to upload</span>
						or drag and drop
					</p>
					<p class="text-xs text-gray-500 dark:text-gray-400">
						SVG, PNG, JPG or GIF ({{ dimension }})
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
import { useAlert } from '@/composables/core/notification'

const emit = defineEmits(['update:modelValue', 'onFileChange', 'onUploadFile', 'invalidDimension'])
const props = defineProps({
	modelValue: {
		type: String,
		default: null
	},
	showPreview: {
		type: Boolean,
		default: true,
		required: false
	},
	emitActualFile: {
		type: Boolean,
		default: false,
		requried: false
	},
	dimension: {
		type: String,
		default: 'Dimension. 2021x724px',
		required: false
	},
	height: {
		type: Number,
		default: 0,
		required: false
	},
	width: {
		type: Number,
		default: 0,
		required: false
	}
})

const image_ref = ref(props.modelValue)

watch(props, () => {
	image_ref.value = props.modelValue
}, { immediate: true })

const isFileDimensionOkay = (event: Record<string, any>) => {
	const width = ref(0)
	const height = ref(0)
	const file = event.target?.files[0]
    if (file) {
        const img = new Image()
        img.onload = function() {
            width.value = img.width
            height.value = img.height
			if (height.value !== props.height || width.value !== props.width) {
				useAlert().openAlert({ type: 'ERROR', msg: 'Invalid image dimension' })
				emit('invalidDimension')
				return false
			} else {
				return true
			}
        }
        img.src = URL.createObjectURL(file)
    } else {
		return false
	}
}

const onChange = (e) => {
	if (props.height || props.width) {
		if (!isFileDimensionOkay(e)) return
	}

	if (props.emitActualFile) {
		emit('onFileChange', e)
		return
	}

	const files = e.target?.files
	if (files.length > 0) {
		const file = files[0]
		const reader = new FileReader()
		reader.onloadend = async (e) => {
			const image = e.target?.result
			const url = await use_file_upload().upload(image as string)
			image_ref.value = url
			emit('onUploadFile', url)
			emit('update:modelValue', url)
		}
		reader.readAsDataURL(file)
	}
}
</script>

<style scoped>

</style>
