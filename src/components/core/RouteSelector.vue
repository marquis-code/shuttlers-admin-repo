<template>
	<div class="flex flex-col gap-2">
		<label v-if="showLabel" class="text-xs text-[#6E717C] font-medium">
			{{ label }}
		</label>
		<VueMultiselect v-model="selectedRoute" placeholder="Search route" :searchable="true" :internal-search="false"
			:options="routes" :multiple="multiple" :taggable="false" track-by="id" select-label="" :loading="loading"
			:custom-label="(data)=>`${data.route_code} - ${data.pickup} - (${data.destination})`"
			@search-change="searching"
		>
			<template #option="{ option }">
				<div class="flex flex-col gap-2 w-full overflow-hidden max-w-[300px]">
					<p class="w-full text-sm whitespace-normal">
						{{ option.route_code }} - {{ option.pickup }}
					</p>
					<p class="w-full text-sm whitespace-normal">
						{{ option.destination }}
					</p>
				</div>
			</template>
		</VueMultiselect>
	</div>
</template>

<script setup lang="ts">
import VueMultiselect from 'vue-multiselect'
import { watchDebounced } from '@vueuse/core'
import { routes_api, CustomAxiosResponse } from '@/api_factory/modules'

const emit = defineEmits(['selected'])
const props = defineProps({
	label: { type: String, default: 'Select Route' },
	multiple: { type: Boolean, default: false },
	showLabel: { type: Boolean, default: true, required: false }
})

const loading = ref(false)
const search = ref('')
const routes = ref([]) as Ref<any[]>
const selectedRoute = ref(null) as Ref<any>

const getRoutes = async () => {
	loading.value = true
	const res = await routes_api.$_get_routes(search.value) as CustomAxiosResponse
	if (res.type !== 'ERROR') {
		routes.value = res.data?.length ? res.data : []
	}
	loading.value = false
}

const searching = (val:string) => {
	search.value = val
}

watch(selectedRoute, () => {
	emit('selected', selectedRoute.value)
})

watchDebounced(
  search,
  getRoutes,
  { debounce: 500, maxWait: 1000 }
)

getRoutes()
</script>
