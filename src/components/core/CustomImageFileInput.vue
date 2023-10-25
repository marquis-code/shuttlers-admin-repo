<template>
	<div>
		<p class="mb-2 text-xs font-medium text-gray-500 text-start">
			{{ label }}
		</p>
		<div class="flex items-center justify-between gap-4">
			<div
				class="drop-zone relative overflow-hidden h-[120px] rounded-lg"
				:class="{
					'w-full': !valueProps,
					'w-11/12': valueProps,
				}"
			>
				<label
					for="dropzone-file"
					class="flex items-center justify-center w-full h-full border border-dashed rounded-lg cursor-pointer"
				>
					<div class="flex flex-col items-center">
						<svg
							aria-hidden="true"
							class="w-10 h-10 mb-3 text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
							/>
						</svg>
						<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
							<span class="font-semibold text-green7">Click to upload</span>
							or drag and drop
						</p>
						<p class="text-xs text-gray-500 dark:text-gray-400">
							SVG, PNG, JPG or GIF (Dimension. 2021x724px)
						</p>
					</div>
				</label>
				<input
					id="dropzone-file"
					ref="bannerInputElement"
					type="file"
					:multiple="false"
					accept=".png, .jpg, .jpeg, .gif, .svg"
					class="absolute top-0 h-full opacity-0"
					:class="{ 'z-10': !valueProps }"
					@change="onChange"
				>
				<div
					v-if="valueProps"
					class="absolute inset-0 flex items-center justify-center w-full h-full font-semibold text-white rounded-lg bg-grey2 shadow-banner"
					:class="{'no-image': valueProps === 'null' || valueProps === 'undefined'}"
					:style="{backgroundImage: `url('${valueProps}')`,
						backgroundColor: '#b9bcc8',
						backgroundSize: '100% 100%',
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center',
						filter: 'blur(8px)'
					}"
				/>
				<div
					v-if="valueProps"
					class="absolute inset-0 flex items-center justify-center w-full h-full font-semibold text-white rounded-lg bg-grey2 shadow-banner"
					:class="{'no-image': valueProps === 'null' || valueProps === 'undefined'}"
					:style="{backgroundImage: `url('${valueProps}')`,
						backgroundColor: 'transparent',
						backgroundSize: 'contain',
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center',
					}"
				/>
			</div>
			<button class="p-4 bg-gray-100 rounded-full grey" :class="{ hidden: !valueProps, block: valueProps }" type="button" @click.prevent="clearBanner">
				<icon name="cancel" class="w-2" alt="cancel" />
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useAlert } from '@/composables/core/notification'
import { use_image_upload } from '@/composables/core/upload'

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    value: {
        type: String,
        required: false,
        default: ''
    },
	label: {
		type: String,
        required: true
	},
    uploadProgress: {
        type: Number,
        required: false,
        default: 0
    }
})
const { bannerBase64, bannerURL } = use_image_upload()
const emits = defineEmits(['update:modelValue', 'update:value', 'change', 'imageProps', 'reset', 'fileSelected'])
const bannerInputElement = ref(null)
const valueProps = toRef(props, 'value')
const modelValueProp = toRef(props, 'modelValue')
const banner = ref('')
// }
const onChange = (e: any) => {
    const selectedFile = e.target.files[0]
    const reader = new FileReader()
	const image = new Image()
	banner.value = ''

    if (!selectedFile) return

	image.addEventListener('load', () => {
		emits('imageProps', {
			height: image.height,
			width: image.width
		})
		// useAlert().openAlert({ type: 'Alert', msg: 'Please edit banner image.' })
		// useDashboardModal().openImageCropper()
	})

    reader.addEventListener('load', () => {
        if (reader.result) {
            banner.value = reader.result as string
			image.src = banner.value
        }
    },
    false)

    reader.readAsDataURL(selectedFile)
}

watch(banner, () => {
	if (!banner.value) return
	emits('fileSelected', banner.value)
})

watch(valueProps, () => {
    emits('update:modelValue', valueProps.value)
})

watch(bannerBase64, () => {
	if (!bannerURL.value) {
		(bannerInputElement.value as unknown as HTMLInputElement).value = ''
	}
})

const clearBanner = () => {
    (bannerInputElement.value as unknown as HTMLInputElement).value = ''
	banner.value = ''
	emits('reset')
}

onMounted(() => {
	if (!(['null', 'undefined', ''].includes(modelValueProp.value))) {
		emits('update:value', modelValueProp.value)
	}
})
</script>

<style scoped>
</style>
