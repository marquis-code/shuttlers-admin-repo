<template>
	<div class="flex flex-col gap-2">
		<label class="text-xs text-[#6E717C] font-medium">
			{{ label }}
		</label>
		<VueMultiselect v-model="selectedDriver" placeholder="Search route" :searchable="true" :internal-search="false"
			:options="drivers" :multiple="false" :taggable="false" track-by="id" :loading="loading"
			:custom-label="(data)=>`${data.pickup} - (${data.destination})`"
			@search-change="searching"
		>
			<template #option="{ option }">
				<div class="flex gap-2 w-full overflow-hidden max-w-[300px]">
					<img v-if="option.avatar" :src="option.avatar" class="w-6 h-6 rounded-full object-cover" alt="">
					<div class="flex flex-col gap-1">
						<p>{{ option.fname || '' }} {{ option.lname || '' }}</p>
						<p v-if="option.vehicle?.name">
							{{ option.vehicle.brand }} {{ option.vehicle.name }} • {{ option.vehicle.registration_number || '' }} • {{ option.vehicle.seats }}
						</p>
					</div>
				</div>
			</template>
		</VueMultiselect>
		{{ selectedDriver}}
	</div>
</template>

<script setup lang="ts">
import VueMultiselect from 'vue-multiselect'
import { watchDebounced } from '@vueuse/core'
import { drivers_api, CustomAxiosResponse } from '@/api_factory/modules'

const emit = defineEmits(['selected'])
const props = defineProps({
	label: { type: String, default: 'Select Driver' }
})

const loading = ref(false)
const search = ref('')
const drivers = ref([]) as Ref<any[]>
const selectedDriver = ref(null) as Ref<any>

const getDrivers = async () => {
	loading.value = true
	const res = await drivers_api.$_get_drivers_for_selector_component(search.value) as CustomAxiosResponse
	if (res.type !== 'ERROR') {
		drivers.value = res.data.data?.length ? res.data.data : []
	}
	loading.value = false
}

const searching = (val:string) => {
	search.value = val
}

watch(selectedDriver, () => {
	emit('selected', selectedDriver.value)
})

watchDebounced(
  search,
  getDrivers,
  { debounce: 500, maxWait: 1000 }
)

getDrivers()
</script>
