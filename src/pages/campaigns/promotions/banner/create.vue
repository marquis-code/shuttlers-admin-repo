<template>
	<main class="flex flex-col gap-4">
		<ButtonGoBack url="/campaigns/promotions/banner" />
		<div class="flex flex-col lg:flex-row items-start gap-4 w-full max-w-[1500px]">
			<form class="w-full lg:max-w-[500px] lg:shrink-0 flex flex-col gap-4 p-4 rounded-lg bg-light border" @submit.prevent="createBanner">
				<div class="flex flex-col">
					<label class="label">Title</label>
					<input v-model="title" type="text" required placeholder="Enter title" class="input-field">
				</div>
				<div class="flex flex-col gap-0">
					<FileUpload class="mx-auto" :emit-actual-file="true" :show-preview="false" :height="2021" :width="724" @on-file-change="handleFileChange" @invalid-dimension="dimensionError = true" />
					<div class="flex items-center justify-center gap-2">
						<Icon name="info" class="w-4" />
						<p class="text-xs text-grey5">
							Images to be uploaded must have a dimension of 2021 x 724px
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
					<label class="label">Banner CTA</label>
					<select v-model="banner_cta" required class="input-field">
						<option v-for="n, i in options" :key="i" :value="n.value">
							{{ n?.title }}
						</option>
					</select>
				</div>
				<div v-if="banner_cta !== 'open_route_discovery'" class="flex flex-col">
					<label class="label">
						{{ banner_cta === 'open_link' ? 'Link' : banner_cta === 'open_carousel' ? 'Select carousel' : 'Select route' }}
					</label>
					<input v-if="banner_cta === 'open_link'" v-model="link" required type="url" class="input-field">
					<RouteSelector v-if="banner_cta === 'open_route'" :show-label="false" class="w-full" @selected="routeSelected" />
					<select v-if="banner_cta === 'open_carousel'" v-model="carousel" class="input-field">
						<option v-for="n, i in carouselsList" :key="i" :value="n">
							{{ n?.name }}
						</option>
					</select>
				</div>
				<div class="flex justify-end mt-6">
					<button type="submit" class="btn-primary w-fit" :disabled="!enableButton || loading">
						{{ loading ? 'processing' : 'Add banner' }}
					</button>
				</div>
			</form>
			<div class="w-full lg:flex-grow bg-light border rounded-lg">
				<div v-if="!image" class="flex items-center justify-center p-4 py-8">
					<div class="flex flex-col gap-2 text-center">
						<!-- <p>image icon</p> -->
						<p class="text-dark text-sm font-bold">
							No image to preview
						</p>
						<p class="text-sm text-grey5">
							Start uploading images
						</p>
					</div>
				</div>
				<img v-else :src="image" alt="" class="w-full max-h-[400px] object-cover rounded-lg">
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import { useBase64 } from '@vueuse/core'
import { useCreateBanner } from '@/composables/modules/campaigns/banner'
import { use_get_carousels } from '@/composables/modules/campaigns/carousels/fetch'

const dimensionError = ref(false)
const file = ref() as Ref<File>
const { base64: fileBase64 } = useBase64(file)
const { getCarousels, carouselsList } = use_get_carousels()
const { title, image, banner_cta, link, route, carousel, loading, createBanner, clearObj } = useCreateBanner()
const handleFileChange = (event:Record<string, any>) => {
    file.value = event.target?.files[0]
}

const enableButton = computed(() => {
	if (banner_cta.value === 'open_carousel' && !carousel.value?.id) return false
	if (banner_cta.value === 'open_route' && !route.value?.id) return false
	return !!(title.value && banner_cta.value && image.value)
})

const routeSelected = (val: Record<string, any>) => {
	route.value = val
}

watch(fileBase64, () => {
	image.value = fileBase64.value
})

const options = [
	{ title: 'Embed link', value: 'open_link' },
	{ title: 'Link to carousel', value: 'open_carousel' },
	{ title: 'Link to route', value: 'open_route' },
	{ title: 'Link to discovery page', value: 'open_route_discovery' }
]

getCarousels()

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
</script>
