<template>
	<InputMultiSelect id="select_users_input"
		v-model="company" track-by="id" :placeholder="placeholder"
		:custom-label="(data)=>`${data.corporate_name}`" open-direction="bottom" :options="queriedCompany" :multiple="false"
		:searchable="true" :loading="loadingQueriedCompany"
		:internal-search="false" :options-limit="300"
		:limit="10"
		:show-no-results="false" :hide-selected="true" @search-change="queryCompany" />
</template>

<script setup lang="ts">

import { useQueryCompany } from '@/composables/modules/corporates/query'

const { loadingQueriedCompany, queriedCompany, queryCompany } = useQueryCompany()

const company = ref()

const emits = defineEmits(['update:modelValue', 'updated'])
const props = defineProps({
  modelValue: {
    type: [Number, Object],
    required: false,
    default: 0
    },
      value: {
        type: String,
        required: false,
        default: ''
    },
    placeholder: {
        type: String,
        required: false,
        default: 'Select company'
  },
  objKey: {
          type: String,
        required: false,
        default: null
  }

})

watch(() => props.value, (val) => {
  if (val) {
    company.value = val
  }
}, { immediate: true })

watch(company, (val) => {
  if (val) {
        emits('update:modelValue', val)
        emits('updated', val[props.objKey])
  }
})
</script>

<style scoped>

</style>
