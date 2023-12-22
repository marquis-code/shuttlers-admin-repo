<template>
	<InputMultiSelect v-if="!loadingQueriedDriver"
		id="select_users_input"
		v-model="driver" track-by="id" :placeholder="placeholder"
		:custom-label="(driver)=>`${driver.fname} - ${driver.lname} `"
		open-direction="bottom" :options="queriedDriver" :multiple="false"
		:searchable="true" :loading="loadingQueriedDriver"
		:internal-search="true" :options-limit="300"
		:limit="10"
		:show-no-results="false" :hide-selected="true" />
	<Skeleton v-else height="46px" />
</template>

<script setup lang="ts">
import { useQueryDriver } from '@/composables/modules/drivers/query'

const { loadingQueriedDriver, queriedDriver, queryDriver, fetch, page_size } = useQueryDriver()

page_size.value = 2000
fetch()

watch(queriedDriver, () => {
    if (queriedDriver.value.length > 0) {
        driver.value = queriedDriver.value.find((driver) => driver.id === driverId.value)
    }
})

const driver = ref()
const driverId = ref()

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
        default: 'Select Driver'
  },
  objKey: {
        type: String,
        required: false,
        default: null
  }

})

watch(() => props.value, (val) => {
  if (val && val !== driverId.value) {
    driverId.value = val
  }
}, { immediate: true })

watch(driver, (val) => {
    if (val && val !== props.value) {
        emits('updated', val.id)
  }
})
</script>

<style scoped>

</style>
