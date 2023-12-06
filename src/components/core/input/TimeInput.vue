<template>
	<DatePicker :value="time" :value-type="valueType" :format="format" :type="dateType" :placeholder="placeholder" @change="handleTime" />
</template>

<script setup lang="ts">
import DatePicker from 'vue-datepicker-next'

const emit = defineEmits(['update:modelValue'])
const propsValue = defineProps({
	modelValue: {
		type: String,
		default: ''
	},
    format: {
        type: String,
        required: false,
        default: 'hh:mm A'
    },
    placeholder: {
        type: String,
        required: false,
        default: 'hh:mm a'
    },
    valueType: {
        type: String,
        required: false,
        default: 'format'
    },
    dateType: {
        type: String,
        required: false,
        default: 'time'
    }
})
const time = ref(propsValue.modelValue)

const handleTime = (val:any) => {
	time.value = val
	emit('update:modelValue', val)
}
</script>
