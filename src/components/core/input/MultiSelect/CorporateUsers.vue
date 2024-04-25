<template>
	<InputMultiSelect id="select_users_input" v-model="user" track-by="id" :placeholder="placeholder"
		:custom-label="(data) => `${data.fname} ${data.lname} - (${data.email})`" open-direction="bottom"
		:options="queriedUsers" :multiple="multiple" :searchable="true" :loading="loadingQueriedUsers"
		:internal-search="false" :options-limit="300" :limit="20" :show-no-results="false" :hide-selected="true"
		@search-change="searchUsers" />
</template>

<script setup lang="ts">
import { useQueryCorporateUsers } from '@/composables/select-comps/corporate_users'
const { loadingQueriedUsers, queriedUsers, queryUsers } = useQueryCorporateUsers()

const user = ref()

const emits = defineEmits(['update:modelValue', 'updated'])
const props = defineProps({
    corporateId: {
        type: [Number, String],
        required: true
    },
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
    },
    multiple: {
        type: Boolean,
        required: false,
        default: false
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

const searchUsers = (str:string) => {
    queryUsers(props.corporateId, str)
}

queryUsers(props.corporateId, '')
</script>

<style scoped></style>
