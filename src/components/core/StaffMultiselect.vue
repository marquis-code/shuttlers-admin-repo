<template>
	<div>
		<VueMultiselect
			v-model="selectedUsers"
			:options="users"
			:multiple="true"
			:close-on-select="true"
			placeholder="Type to search"
			track-by="id"
			:taggable="false"
			:custom-label="fullName"
			:loading="loading"
			@select="handleSelection"
			@open="is_droped_down = true"
			@close="is_droped_down = false"
			@search-change="asyncFind"
		>
			<template #noResult>
				Oops! No elements found. Consider changing the search query.
			</template>
		</VueMultiselect>
	</div>
</template>

<script setup lang="ts">
import VueMultiselect from 'vue-multiselect'
import { watchDebounced } from '@vueuse/core'
import { staffs_api, CustomAxiosResponse } from '@/api_factory/modules'

const emit = defineEmits(['selected', 'update:modelValue'])
const props = defineProps({
	label: { type: String, default: 'Select User' },
	modelValue: { type: Object, required: false, default: () => {} },
	multiple: { type: Boolean, default: false }
})

const is_droped_down = ref(false)
const loading = ref(false)
const search = ref('')
const users = ref([]) as Ref<any[]>

const getUsers = async () => {
	loading.value = true
    const res = await staffs_api.$_get_staffs_for_selector_component(search.value) as CustomAxiosResponse
	if (res.type !== 'ERROR') {
		users.value = res.data.data?.length ? res.data.data : []
	}
	loading.value = false
}

  const fullName = ({ fname, lname, email }) => {
  return `${fname} ${lname} - ${email}`
}

const searching = (val:string) => {
	search.value = val
}

const selectedUsers = ref(props.modelValue) as Ref<any>

const handleSelection = (val:any) => {
	emit('update:modelValue', val)
}

watchDebounced(
  search,
  asyncFind,
  { debounce: 500, maxWait: 1000 }
)

getUsers()
</script>
