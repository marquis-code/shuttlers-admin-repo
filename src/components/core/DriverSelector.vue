<template>
	<div class="flex flex-col gap-2">
		<label class="text-xs text-[#6E717C] font-medium">
			{{ label }}
		</label>
		<!-- :custom-label="customLabel" label="fname" -->
		<VueMultiselect v-model="selectedDriver" placeholder="Search route" :searchable="true" :internal-search="false"
			:options="drivers" :multiple="false" :taggable="false" track-by="id" :loading="loading" label=" "
			@search-change="searching" @select="handleSelection" @open="is_droped_down = true" @close="is_droped_down = false"
		>
			<template v-if="selectedDriver?.id && !is_droped_down" #selection="">
				<div class="flex gap-2 w-full overflow-hidden max-w-[300px]">
					<img v-if="selectedDriver.avatar" :src="selectedDriver.avatar" class="w-10 h-10 rounded-full object-cover border" alt="">
					<img v-else src="@/assets/images/avatar.png" class="w-10 h-10 rounded-full object-cover border" alt="">
					<div class="flex flex-col gap-1">
						<p class="text-sm">
							{{ selectedDriver.fname || '' }} {{ selectedDriver.lname || '' }}
						</p>
						<p v-if="selectedDriver.vehicle?.name" class="text-xs">
							{{ selectedDriver.vehicle.brand }} {{ selectedDriver.vehicle.name }} {{ selectedDriver.vehicle.registration_number ? `• ${selectedDriver.vehicle.registration_number}` : '' }} {{ selectedDriver.vehicle.seats ? `• ${selectedDriver.vehicle.seats} Seater` : '' }}
						</p>
						<p v-else class="text-xs">
							No vehicle assigned
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
							{{ option.fname || '' }} {{ option.lname || '' }}
						</p>
						<p v-if="option.vehicle?.name" class="text-xs">
							{{ option.vehicle.brand }} {{ option.vehicle.name }} {{ option.vehicle.registration_number ? `• ${option.vehicle.registration_number}` : '' }} {{ option.vehicle.seats ? `• ${option.vehicle.seats} Seater` : '' }}
						</p>
						<p v-else class="text-xs">
							No vehicle assigned
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
import { drivers_api, CustomAxiosResponse } from '@/api_factory/modules'

const emit = defineEmits(['selected', 'update:modelValue'])
const props = defineProps({
	label: { type: String, default: 'Select Driver' },
	modelValue: { type: Object, required: true }
})

const is_droped_down = ref(false)
const loading = ref(false)
const search = ref('')
const drivers = ref([]) as Ref<any[]>

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

const selectedDriver = ref(props.modelValue) as Ref<any>

const handleSelection = (val:any) => {
	// selectedDriver.value = val
	emit('update:modelValue', val)
}

watchDebounced(
  search,
  getDrivers,
  { debounce: 500, maxWait: 1000 }
)

getDrivers()
</script>
