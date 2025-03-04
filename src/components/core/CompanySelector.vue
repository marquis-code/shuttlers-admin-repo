<template>
	<div class="flex flex-col gap-2">
		<label class="text-xs text-[#6E717C] font-medium">
			{{ label }}
		</label>
		<VueMultiselect v-model="selectedCorporate" placeholder="Search corporate" :searchable="true" :internal-search="false"
			:options="corporates" :multiple="multiple" :taggable="false" track-by="id" :loading="loading" label=" " select-label=""
			@search-change="searching" @select="handleSelection" @open="is_droped_down = true" @close="is_droped_down = false"
		>
			<template v-if="selectedCorporate?.id && !is_droped_down" #selection="">
				<div class="flex gap-2 w-full overflow-hidden max-w-[300px]">
					<div class="flex flex-col gap-1">
						<p class="text-sm">
							{{ selectedCorporate.corporate_name || '' }}
						</p>
					</div>
				</div>
			</template>
			<template #option="{ option }">
				<div class="flex gap-2 w-full overflow-hidden max-w-[300px]">
					<div class="flex flex-col gap-1">
						<p class="text-sm">
							{{ option.corporate_name || '' }}
						</p>
					</div>
				</div>
			</template>
		</VueMultiselect>
	</div>
</template>

<script setup lang="ts">
import VueMultiselect from 'vue-multiselect'
import { watchDebounced } from '@vueuse/core'
import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'

const emit = defineEmits(['selected', 'update:modelValue'])
const props = defineProps({
	label: { type: String, default: 'Select Company' },
	modelValue: { type: Object, required: true },
	multiple: { type: Boolean, required: false, default: false }
})

const is_droped_down = ref(false)
const loading = ref(false)
const search = ref('')
const corporates = ref([]) as Ref<any[]>

const getCorporate = async () => {
	loading.value = true
	const res = await corporates_api.$_get_corporates_for_selector_component(search.value) as CustomAxiosResponse
	if (res.type !== 'ERROR') {
		corporates.value = res.data.data?.length ? res.data.data : []
	}
	loading.value = false
}

const searching = (val:string) => {
	search.value = val
}

const selectedCorporate = ref(props.modelValue) as Ref<any>

const handleSelection = (val:any) => {
	emit('update:modelValue', val)
}

watchDebounced(
  search,
  getCorporate,
  { debounce: 500, maxWait: 1000 }
)

getCorporate()
</script>
