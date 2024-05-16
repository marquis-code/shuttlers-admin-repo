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
		type: [Array],
		default: () => [0],
		required: false
	},
	width: {
	type: [Array],
	default: () => [0],
		required: false
	}
})

const image_ref = ref(props.modelValue)

watch(props, () => {
	image_ref.value = props.modelValue
}, { immediate: true })

// Async function to check image dimensions
const isFileDimensionOkay = (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = function() {
      const width = img.width
		const height = img.height
      // Check if the dimensions match the criteria
      if (props.height.includes(height) || props.width.includes(width)) {
        resolve(true)
      } else {
        useAlert().openAlert({ type: 'ERROR', msg: 'Invalid image dimension' })
        emit('invalidDimension')
        resolve(false)
      }
    }
    img.onerror = reject
    img.src = URL.createObjectURL(file)
  })
}

const onChange = async (e) => {
  const file = e.target.files[0]
  if (!file) return

  // Wait for dimension check to complete
  const dimensionsOkay = await isFileDimensionOkay(file)
  if (!dimensionsOkay) return

  if (props.emitActualFile) {
    emit('onFileChange', e)
    return
  }

  const reader = new FileReader()
  reader.onloadend = async (e) => {
    const image = e.target?.result as string
    const url = await use_file_upload().upload(image)
    image_ref.value = url
    emit('onUploadFile', url)
    emit('update:modelValue', url)
  }
  reader.readAsDataURL(file)
}
</script>

<style scoped>

</style>
