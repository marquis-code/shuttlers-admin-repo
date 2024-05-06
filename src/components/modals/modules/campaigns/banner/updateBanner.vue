<template>
	<Modal
		modal="$atts.modal"
		title="Update Banner"
		:no-close-btn="true"
		class="text-center"
	>
		<form class="flex flex-col gap-4 mt-6" @submit.prevent="updateBannerCTA">
			<div class="flex flex-col">
				<label class="label">Banner CTA</label>
				<select v-model="action_type" required class="input-field">
					<option v-for="n, i in options" :key="i" :value="n.value">
						{{ n?.title }}
					</option>
				</select>
			</div>
			<div v-if="action_type !== 'open_route_discovery'" class="flex flex-col">
				<label class="label">
					{{ action_type === 'open_link' ? 'Link' : action_type === 'open_carousel' ? 'Select carousel' : 'Select route' }}
				</label>
				<Skeleton v-if="loading_carousels" height="50px" radius="10px" />
				<template v-else>
					<input v-if="action_type === 'open_link'" v-model="action_value" required type="url" class="input-field">
					<RouteSelector v-if="action_type === 'open_route'" :show-label="false" class="w-full" @selected="routeSelected" />
					<select v-if="action_type === 'open_carousel'" v-model="action_value" class="input-field">
						<option v-for="n, i in carouselsList" :key="i" :value="n?.id">
							{{ n?.name }}
						</option>
					</select>
				</template>
			</div>

			<button class="btn-primary w-full mt-6" :disabled="loading || !enableButton">
				{{ loading ? 'processing' : 'Update Banner' }}
			</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useUpdateBanner } from '@/composables/modules/campaigns/banner'
import { use_get_carousels } from '@/composables/modules/campaigns/carousels/fetch'

const { getCarousels, carouselsList, loading_carousels } = use_get_carousels()
const { action_type, action_value, updateBannerCTA, clearObj, loading } = useUpdateBanner()
const options = [
	{ title: 'Embed link', value: 'open_link' },
	{ title: 'Link to carousel', value: 'open_carousel' },
	{ title: 'Link to route', value: 'open_route' },
	{ title: 'Link to discovery page', value: 'open_route_discovery' }
]

const enableButton = computed(() => {
    if (action_type.value === 'open_route_discovery') return true
    return !!(action_type.value && action_value.value)
})

const routeSelected = (val:Record<string, any>) => {
    action_value.value = val?.id
}

watch(action_type, () => {
    action_value.value = ''
})

getCarousels()
onBeforeUnmount(() => clearObj())
</script>

<style>

</style>
