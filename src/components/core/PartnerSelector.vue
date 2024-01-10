<template>
	<div class="flex flex-col gap-1">
		<label class="text-xs text-[#6E717C] font-medium m-0">
			{{ label }}
		</label>
		<!-- :custom-label="customLabel" label="fname" -->
		<VueMultiselect v-model="selectedPartner" placeholder="Search partner" :searchable="true" :internal-search="false"
			:options="partners" :multiple="false" :taggable="false" track-by="id" :loading="loading"
			:custom-label="(data)=>`${data.owner.fname} ${data.owner.lname}`"
			@search-change="searching"
		/>
	</div>
</template>

<script setup lang="ts">
import VueMultiselect from 'vue-multiselect'
import { watchDebounced } from '@vueuse/core'
import { partners_api, CustomAxiosResponse } from '@/api_factory/modules'

const emit = defineEmits(['selected', 'update:modelValue'])
const props = defineProps({
	label: { type: String, default: 'Select Partner' },
	modelValue: { type: Object, required: false, default: () => {} }
})

const loading = ref(false)
const search = ref('')
const partners = ref([]) as Ref<any[]>

const getPartners = async () => {
	loading.value = true
	const res = await partners_api.$_get_partners_for_selector_component(search.value) as CustomAxiosResponse
	if (res.type !== 'ERROR') {
		partners.value = res.data.data?.length ? res.data.data : []
	}
	loading.value = false
}

const searching = (val:string) => {
	search.value = val
}
const selectedPartner = ref(props.modelValue) as Ref<any>

watch(selectedPartner, () => {
	emit('selected', selectedPartner.value)
})

watchDebounced(
  search,
  getPartners,
  { debounce: 500, maxWait: 1000 }
)

getPartners()
</script>
