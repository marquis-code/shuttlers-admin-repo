<template>
	<InputMultiSelect id="select_users_input"
		v-model="vehicleId" track-by="id" :placeholder="placeholder"
		:custom-label="(vehicle)=>`${vehicle.brand} - ${vehicle.name} - ${vehicle.registration_number} (${vehicle.driver?.fname} ${vehicle.driver?.lname})`"
		open-direction="bottom" :options="queriedDriver" :multiple="false"
		:searchable="true" :loading="loadingQueriedDriver"
		:internal-search="false" :options-limit="300"
		:limit="10"
		:show-no-results="false" :hide-selected="true" @search-change="queryDriver" />
</template>

<script setup lang="ts">

import { useQueryDriver } from '@/composables/modules/drivers/query'

const { loadingQueriedDriver, queriedDriver, queryDriver } = useQueryDriver()

const vehicleId = ref()

const emits = defineEmits(['update:modelValue', 'updated', 'updated_main'])
const props = defineProps({
  modelValue: {
    type: Number,
    required: false,
    default: 0
    },
      value: {
        type: Object,
        required: false,
        default: () => ({})
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
  if (Object.keys(val).length) {
    vehicleId.value = val
  }
}, { immediate: true })

watch(vehicleId, (val) => {
    if (val && val !== props.value) {
        emits('updated', val)
  }
})
</script>

<style scoped>

</style>
