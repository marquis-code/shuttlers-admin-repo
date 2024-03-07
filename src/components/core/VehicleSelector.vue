<template>
	<div class="flex flex-col gap-2">
		<label class="text-xs text-[#6E717C] font-medium">
			{{ label }}
		</label>
		<Skeleton v-if="loading" height="46px" />
		<VueMultiselect v-else v-model="selectedVehicle" placeholder="Search vehicle" select-label="" :searchable="true" :internal-search="true"
			:options="vehicles" :multiple="false" :taggable="false" track-by="id" :loading="loading" label=" "
			@select="handleSelection" @open="is_droped_down = true" @close="is_droped_down = false"
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
	entityStatus: { type: String, default: 'all' }
})
const { vehicles, loading, getVehicles, getActiveVehicles } = useAllVehicles()

const is_droped_down = ref(false)
const selectedVehicle = ref(props.modelValue) as Ref<any>

const handleSelection = (val:any) => {
	emit('update:modelValue', val)
}

if (!vehicles.value.length) getVehicles()
if (props.entityStatus === 'active') getActiveVehicles()
</script>
