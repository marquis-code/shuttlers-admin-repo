<template>
	<div class="flex flex-col gap-2">
		<label class="text-xs text-[#6E717C] font-medium">
			{{ label }}
		</label>
		<Skeleton v-if="loading" height="46px" />
		<VueMultiselect v-else v-model="selectedVehicle" placeholder="Search vehicle" select-label="" :searchable="true" :internal-search="false"
			:options="filteredVehicle" :multiple="false" :taggable="false" track-by="id" :loading="loading" label=" " :disabled="isDisabled"
			@select="handleSelection" @open="is_droped_down = true" @close="is_droped_down = false" @search-change="onSearch"
		>
			<template v-if="selectedVehicle?.id && !is_droped_down" #selection="">
				<p>
					{{ selectedVehicle?.seats }} Seater - {{ selectedVehicle?.brand || '' }} {{ selectedVehicle?.name || '' }} {{ selectedVehicle?.registration_number || '' }}
				</p>
			</template>
			<template #option="{ option }">
				<p>
					{{ option?.seats }} Seater - {{ option?.brand || '' }} {{ option?.name || '' }} {{ option?.registration_number || '' }}
				</p>
			</template>
		</VueMultiselect>
	</div>
</template>

<script setup lang="ts">
import VueMultiselect from 'vue-multiselect'
import { useAllVehicles } from '@/composables/modules/fleets/vehicles/vehicles'

const emit = defineEmits(['selected', 'update:modelValue'])
const props = defineProps({
	label: { type: String, default: 'Select Vehicle' },
	modelValue: { type: Object, required: true },
	entityStatus: { type: String, default: 'all' },
	isDisabled: { type: Boolean, default: false }
})
const { vehicles, loading, getVehicles, getActiveVehicles } = useAllVehicles()

const is_droped_down = ref(false)
const selectedVehicle = ref(props.modelValue) as Ref<any>
const searchText = ref('')

const handleSelection = (val:any) => {
	emit('update:modelValue', val)
}

const onSearch = (val) => {
	searchText.value = val
}

const filteredVehicle = computed(() => {
	if (!searchText.value?.length) return vehicles.value
	return vehicles.value.filter((el) => {
		return el?.name.toLowerCase().includes(searchText.value.toLowerCase()) ||
		el?.brand.toLowerCase().includes(searchText.value.toLowerCase()) ||
		el?.registration_number.toLowerCase().includes(searchText.value.toLowerCase())
	})
})

if (!vehicles.value.length) getVehicles()
if (props.entityStatus === 'active') getActiveVehicles()
</script>
