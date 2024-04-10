<template>
	<InputMultiSelect v-if="!loadingQueriedVehicle"
		id="select_users_input"
		v-model="vehicle" track-by="id" :placeholder="placeholder"
		:custom-label="(vehicle)=>`${vehicle.brand} - ${vehicle.name} - ${vehicle.registration_number} (${vehicle.driver?.fname} ${vehicle.driver?.lname})`"
		open-direction="bottom" :options="queriedVehicle" :multiple="false"
		:searchable="true" :loading="loadingQueriedVehicle"
		:internal-search="true" :options-limit="300"
		:limit="10"
		:show-no-results="false" :hide-selected="true" />
	<Skeleton v-else height="46px" />
</template>

<script setup lang="ts">

import { useQueryVehicle } from '@/composables/modules/fleets/query'

const { loadingQueriedVehicle, queriedVehicle, queryVehicle, fetch, page_size } = useQueryVehicle()

page_size.value = 10000
fetch()

watch(queriedVehicle, () => {
    if (queriedVehicle.value.length > 0) {
        vehicle.value = queriedVehicle.value.find((vehicle) => vehicle.id === vehicleId.value)
    }
})

const vehicle = ref()
const vehicleId = ref()

const emits = defineEmits(['update:modelValue', 'updated'])
const props = defineProps({
  modelValue: {
    type: Number,
    required: false,
    default: 0
    },
      value: {
        type: Number,
        required: false,
        default: 0
    },
    placeholder: {
        type: String,
        required: false,
        default: 'Select Vehicle'
  },
  objKey: {
        type: String,
        required: false,
        default: null
  }

})

watch(() => props.value, (val) => {
  if (val && val !== vehicleId.value) {
    vehicleId.value = val
  }
}, { immediate: true })

watch(vehicle, (val) => {
    if (val && val !== props.value) {
        emits('updated', val.id)
  }
})
</script>

<style scoped>

</style>
