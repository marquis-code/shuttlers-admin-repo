<template>
	<div class="flex flex-col gap-2">
		<label class="text-xs text-[#6E717C] font-medium">
			{{ label }}
		</label>
		<!-- :custom-label="customLabel" label="fname" -->
		<VueMultiselect v-model="selectedPartner" placeholder="Search partner" :searchable="true" :internal-search="false"
			:options="partners" :multiple="false" :taggable="false" track-by="id" :loading="loading" label=" "
			@search-change="searching" @select="handleSelection" @open="is_droped_down = true" @close="is_droped_down = false"
		>
			<template v-if="selectedPartner?.id && !is_droped_down" #selection="">
				<div class="flex gap-2 w-full overflow-hidden max-w-[300px]">
					<img v-if="selectedPartner.owner.avatar" :src="selectedPartner.owner.avatar" class="w-10 h-10 rounded-full object-cover border" alt="">
					<img v-else src="@/assets/images/avatar.png" class="w-10 h-10 rounded-full object-cover border" alt="">
					<div class="flex flex-col gap-1">
						<p class="text-sm">
							{{ selectedPartner.owner.fname || '' }} {{ selectedPartner.owner.lname || '' }}
						</p>
					</div>
				</div>
			</template>
			<template #option="{ option }">
				<div class="flex gap-2 w-full overflow-hidden max-w-[300px]">
					<img v-if="option.avatar" :src="option.avatar" class="w-10 h-10 rounded-full object-cover border" alt="">
					<img v-else src="@/assets/images/avatar.png" class="w-10 h-10 rounded-full object-cover border" alt="">
					<div class="flex flex-col gap-1">
						<p class="text-sm">
							{{ option.owner.fname || '' }} {{ option.owner.lname || '' }}
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
import { partners_api, CustomAxiosResponse } from '@/api_factory/modules'

const emit = defineEmits(['selected', 'update:modelValue'])
const props = defineProps({
	label: { type: String, default: 'Select Partner' },
	modelValue: { type: Object, required: true }
})

const is_droped_down = ref(false)
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

const handleSelection = (val:any) => {
}

watchDebounced(
  search,
  getPartners,
  { debounce: 500, maxWait: 1000 }
)

getPartners()
</script>
