<template>
	<main class="">
		<ButtonGoBack class="mb-6" url="/campaigns/promotions/carousel" />
		<Skeleton v-if="loading" height="300px" radius="15px" />
		<div v-else class="w-full max-w-[1500px] flex flex-col lg:flex-row gap-4 lg:items-start">
			<div class="flex w-full lg:w-1/2 lg:shrink-0 flex-col rounded-lg border">
				<h3 class="p-4 text-sm text-dark font-bold">
					Carousel Information
				</h3>
				<div class="flex flex-col">
					<div v-for="n, i in info" :key="i" class="flex items-center gap-4 justify-between p-3 border-b">
						<p class="uppercase text-sm text-grey5 font-medium">
							{{ n.title }}
						</p>
						<p class="text-dark text-sm font-medium">
							{{ n.value }}
						</p>
					</div>
				</div>
			</div>

			<div class="w-full lg:flex-grow bg-light border rounded-lg">
				<h3 class="p-4 text-dark border-b font-medium">
					Carousel Images
				</h3>
				<div v-if="!carousel_details?.assets?.length" class="flex items-center justify-center p-4 py-8">
					<div class="flex flex-col gap-2 text-center">
						<p class="text-dark text-sm font-bold">
							No image to preview
						</p>
						<p class="text-sm text-grey5">
							Start uploading images
						</p>
					</div>
				</div>
				<div v-else class="p-3 grid grid-cols-2 gap-2 w-full">
					<img v-for="n,i in carousel_details?.assets" :key="i" :src="n?.url" alt="" class=" object-contain h-full">
				</div>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import moment from 'moment'
import { useCarouselDetails } from '@/composables/modules/campaigns/carousels'

const { loading, getCarouselDetails, carousel_details } = useCarouselDetails()
const carousel_id = useRoute().params.id as string
getCarouselDetails(carousel_id)

const info = computed(() => {
	const res = [
		{ title: 'title', value: carousel_details.value?.name },
		{ title: 'date created', value: moment(carousel_details.value?.created_at).format('ll') },
		{ title: 'status', value: carousel_details.value?.status === 'active' ? 'Enabled' : 'Disabled' },
		{ title: 'end date', value: moment(carousel_details.value?.end_date).format('ll') },
		{ title: 'linked banner', value: 'N/A' }
	]
	return res
})

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

</script>
