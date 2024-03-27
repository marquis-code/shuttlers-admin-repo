<template>
	<InputMultiSelect id="select_users_input" v-model="company" track-by="id" :placeholder="placeholder"
		:custom-label="(data) => `${data.corporate_name}`" open-direction="bottom" :options="companiesList"
		:multiple="false" :searchable="true" :loading="loadingQueriedCompany" :internal-search="false" :options-limit="300"
		:limit="10" :allow-empty="true" :show-no-results="false" :hide-selected="true" @search-change="queryCompany">
		<template slot="clear" slot-scope="props">
			<div v-if="queriedCompany.length" class="multiselect__clear" @mousedown.prevent.stop="clearAll(props.search)" />
		</template>
	</InputMultiSelect>
</template>

<script setup lang="ts">

import { useQueryCompany } from '@/composables/modules/corporates/query'

const { loadingQueriedCompany, queriedCompany, queryCompany } = useQueryCompany()

const companiesList = computed(() => {
  if (!queriedCompany.value.length) {
    return [{ corporate_name: 'Select option', id: null }]
  } else {
    return [{ corporate_name: 'Select option', id: null }, ...queriedCompany.value]
  }
})

const company = ref()

const emits = defineEmits(['update:modelValue', 'updated'])
const props = defineProps({
  modelValue: {
    type: [Number, String, Object],
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

const clearAll = () => {
  queriedCompany.value = []
}
</script>

<style scoped></style>
