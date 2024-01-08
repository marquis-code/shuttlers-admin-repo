<template>
	<InputMultiSelect id="select_users_input"
		v-model="user" track-by="id" :placeholder="placeholder"
		:custom-label="(data)=>`${data.fname} ${data.lname} - (${data.email})`" open-direction="bottom" :options="queriedUsers" :multiple="false"
		:searchable="true" :loading="loadingQueriedUsers"
		:internal-search="false" :options-limit="300"
		:limit="10"
		:show-no-results="false" :hide-selected="true" @search-change="queryUsers" />
</template>

<script setup lang="ts">
import { useQueryUsers } from '@/composables/modules/users/query'
const { loadingQueriedUsers, queriedUsers, queryUsers } = useQueryUsers()

const user = ref()

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
        default: 'Select user'
  },
      objKey: {
          type: String,
        required: false,
        default: null
    }
})

watch(() => props.modelValue, (val) => {
  if (val) {
    user.value = val
  }
}, { immediate: true })

watch(user, (val) => {
  if (val) {
        emits('update:modelValue', val)
        emits('updated', val[props.objKey])
  }
})
</script>

<style scoped>

</style>
