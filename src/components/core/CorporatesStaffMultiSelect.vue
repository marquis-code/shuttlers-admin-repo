<template>
	<div>
		<VueMultiselect
			v-model="selectedStaff"
			:options="staffs"
			:multiple="true"
			:close-on-select="true"
			placeholder="Type to search"
			track-by="id"
			class="w-full"
			style="width: 100%"
			:taggable="false"
			:custom-label="fullName"
			:loading="loading"
			@open="is_droped_down = true"
			@close="is_droped_down = false"
			@search-change="asyncFind"
		>
			<template #noResult>
				Oops! No elements found. Consider changing the search query.
			</template>
		</VueMultiselect>
	</div>
	<!-- @select="handleSelection" -->
</template>

<script setup lang="ts">
import VueMultiselect from 'vue-multiselect'
import { watchDebounced } from '@vueuse/core'
import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
const id = useRoute().params.id as string
const emit = defineEmits(['selected', 'update:modelValue'])
const props = defineProps({
	label: { type: String, default: 'Select Staff' },
	modelValue: { type: Object, required: false, default: () => {} },
	multiple: { type: Boolean, default: false }
})

const is_droped_down = ref(false)
const loading = ref(false)
const search = ref('')
const staffs = ref([]) as Ref<any[]>

const getStaffs = async () => {
	loading.value = true
    const res = await corporates_api.$_get_corporates_staffs_for_selector_component(search.value, id) as CustomAxiosResponse
	if (res.type !== 'ERROR') {
		staffs.value = res.data.data?.length ? res.data.data : []
	}
	loading.value = false
}

const asyncFind = async (query: any) => {
    search.value = query
    loading.value = true
    const result = await corporates_api.$_get_corporates_staffs_for_selector_component(query, id) as CustomAxiosResponse
    if (result.type !== 'ERROR') {
        staffs.value = result.data.data?.length ? result.data.data : []
	}
    loading.value = false
  }

  const fullName = ({ fname, lname, email }) => {
  return `${fname} ${lname}`
}

const selectedStaff = ref() as Ref<any>

// const handleSelection = (val:any) => {
// 	emit('update:modelValue', selectedStaff.value)
// }

watch(selectedStaff, () => {
	emit('update:modelValue', selectedStaff.value)
})

watchDebounced(
  search,
  asyncFind,
  { debounce: 500, maxWait: 1000 }
)

getStaffs()
</script>
