<template>
	<main class="flex flex-col gap-4">
		<ButtonGoBack url="/campaigns/promotions/carousel" />
		<div class="flex flex-col lg:flex-row items-start gap-4 w-full max-w-[1500px]">
			<form class="w-full lg:max-w-[500px] lg:shrink-0 flex flex-col gap-4 p-4 rounded-lg bg-light border" @submit.prevent="createCarousel">
				<div class="flex flex-col">
					<label class="label">Title</label>
					<input v-model="title" type="text" required placeholder="Enter title" class="input-field">
				</div>
				<div class="flex flex-col gap-0">
					<label class="label">You can add multiple carousel at a time</label>
					<FileUpload class="mx-auto" dimension="max. 2480 x 1146px" :height="[2480, 724]" :width="[2021, 1146]" :show-preview="false" @on-upload-file="handleImageUrl" @invalid-dimension="dimensionError = true" />
					<div class="flex items-center justify-center gap-2">
						<Icon name="info" class="w-4" />
						<p class="text-xs text-grey5">
							Images to be uploaded must be Rectangular (Vertical)
						</p>
					</div>
					<div v-if="dimensionError" class="bg-red text-light flex items-start justify-between gap-4 mt-4 p-3 rounded-md">
						<p class="text-sm">
							Image does not meet the size requirements, upload a new image
						</p>
						<icon name="close" class="w-4 text-light" @click="dimensionError = false" />
					</div>
				</div>
				<div class="flex flex-col">
					<label class="label">Select dynamic Urls</label>
					<div :key="key" class="flex items-center flex-wrap gap-4">
						<div v-for="n,i in dynamic_urls" :key="i" class="flex items-center gap-2">
							<label :for="n" class="lowercase m-0">{{ n }}</label>
							<input :id="n" :checked="urls.includes(n)" type="checkbox" @click.prevent="handleDynamicUrls(n)">
						</div>
					</div>
				</div>
				<div class="flex flex-col">
					<label class="label">End date</label>
					<InputDateInput v-model="end_date" />
				</div>
				<div class="flex justify-end mt-6">
					<button type="submit" class="btn-primary w-fit" :disabled="!enableButton || loading">
						{{ loading ? 'processing' : 'Add carousel' }}
					</button>
				</div>
			</form>
			<div class="w-full lg:flex-grow bg-light border rounded-lg">
				<h3 class="p-4 text-dark border-b font-medium">
					Carousel Images
				</h3>
				<div v-if="!images.length" class="flex items-center justify-center p-4 py-8">
					<div class="flex flex-col gap-2 text-center">
						<p class="text-dark text-sm font-bold">
							No image to preview
						</p>
						<p class="text-sm text-grey5">
							Start uploading images
						</p>
					</div>
				</div>
				<div v-else class="p-3 flex flex-col gap-2 w-full">
					<div v-for="n,i in images" :key="i" class="flex items-center gap-2 w-full">
						<img :src="n" alt="" class="flex-grow max-h-[200px] object-cover rounded-lg">
						<Icon name="close" class="w-5 shrink-0 text-red cursor-pointer" @click="removeImage(i)" />
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import { useCreateCarousel } from '@/composables/modules/campaigns/carousels'

const key = ref(0)
const dimensionError = ref(false)
const { getDynamicUrls, dynamic_urls, title, images, urls, end_date, createCarousel, loading, clearObj } = useCreateCarousel()

const enableButton = computed(() => {
	return !!(title.value && end_date.value && images.value.length)
})

const handleImageUrl = (image_url: string) => {
	images.value.push(image_url)
}

const removeImage = (index: number) => {
	images.value.splice(index, 1)
}

const handleDynamicUrls = (url: string) => {
	if (!urls.value.includes(url)) {
		urls.value.push(url)
	} else {
		const index = urls.value.indexOf(url)
		urls.value.splice(index, 1)
	}
	key.value++
}

getDynamicUrls()
onBeforeUnmount(() => clearObj())
definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
</script>
