<template>
	<div class="flex flex-col gap-2">
		<label class="text-xs text-[#6E717C] font-medium">
			{{ label }}
		</label>
		<VueMultiselect v-model="selectedUser" placeholder="Search user" :searchable="true" :internal-search="false"
			:options="users" :multiple="multiple" :taggable="false" track-by="id" :loading="loading" label=" " select-label=""
			@search-change="searching" @select="handleSelection" @open="is_droped_down = true" @close="is_droped_down = false"
		>
			<template v-if="selectedUser?.id && !is_droped_down" #selection="">
				<div class="flex gap-2 w-full overflow-hidden max-w-[300px]">
					<div class="flex flex-col gap-1">
						<p class="text-sm">
							{{ selectedUser.fname || '' }} {{ selectedUser.lname || '' }} - {{ selectedUser.email || '' }}
						</p>
					</div>
				</div>
			</template>
			<template #option="{ option }">
				<div class="flex gap-2 w-full overflow-hidden max-w-[300px]">
					<div class="flex flex-col gap-1">
						<p class="text-sm">
							{{ option.fname || '' }} {{ option.lname || '' }} -  - {{ selectedUser.email || '' }}
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
import { users_api, CustomAxiosResponse } from '@/api_factory/modules'

const emit = defineEmits(['selected', 'update:modelValue'])
const props = defineProps({
	label: { type: String, default: 'Select User' },
	modelValue: { type: Object, required: true },
	multiple: { type: Boolean, default: false }
})

const is_droped_down = ref(false)
const loading = ref(false)
const search = ref('')
const users = ref([]) as Ref<any[]>

const getUser = async () => {
	loading.value = true
    let res
    const payload = {
        user: search.value
    }
	if (search.value === '') {
       res = await users_api.$_get_users_for_selector_component(search.value) as CustomAxiosResponse
    }

    if (search.value.length) {
        res = await users_api.$_get_users_for_selector_component(search.value, payload) as CustomAxiosResponse
    }
	if (res.type !== 'ERROR') {
		users.value = res.data.data?.length ? res.data.data : []
	}
	loading.value = false
}

const searching = (val:string) => {
	search.value = val
}

const selectedUser = ref(props.modelValue) as Ref<any>

const handleSelection = (val:any) => {
	emit('update:modelValue', val)
}

watchDebounced(
  search,
  getUser,
  { debounce: 500, maxWait: 1000 }
)

getUser()
</script>
