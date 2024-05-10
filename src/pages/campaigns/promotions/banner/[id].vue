<template>
	<main class="">
		<ButtonGoBack class="mb-6" url="/campaigns/promotions/banner" />
		<Skeleton v-if="loading" height="300px" radius="15px" />
		<div v-else class="w-full max-w-[1500px] flex flex-col lg:flex-row gap-4 lg:items-start">
			<div class="flex w-full lg:w-1/2 flex-col rounded-lg border">
				<h3 class="p-4 text-sm text-dark font-bold">
					Banner Information
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

			<div class="flex w-full lg:w-1/2 flex-col rounded-lg border">
				<h3 class="p-4 text-sm text-dark font-bold">
					Banner Image
				</h3>
				<div class="p-4">
					<img :src="banner_details?.image_url" class="w-full object-cover" alt="">
				</div>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import moment from 'moment'
import { useBannerDetails } from '@/composables/modules/campaigns/banner'

const { loading, getBannerDetails, banner_details } = useBannerDetails()
const banner_id = useRoute().params.id as string
getBannerDetails(banner_id)

const info = computed(() => {
	const res = [
		{ title: 'title', value: banner_details.value?.title },
		{ title: 'date created', value: moment(banner_details.value?.created_at).format('ll') },
		{ title: 'status', value: banner_details.value?.status === 'active' ? 'Enabled' : 'Disabled' }
	]
	if (banner_details.value?.action_type === 'open_link') {
		res.push({ title: 'embed link', value: banner_details.value?.action_value })
	}
	if (banner_details.value?.action_type === 'open_route') {
		res.push({ title: 'route', value: banner_details.value?.action_value })
	}
	if (banner_details.value?.action_type === 'open_carousel') {
		res.push({ title: 'carousel', value: 'YES' })
	}
	return res
})

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

</script>
