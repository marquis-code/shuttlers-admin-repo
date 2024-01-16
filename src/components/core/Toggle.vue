<template>
	<label
		:for="name"
		class="relative h-8 w-14 cursor-pointer [-webkit-tap-highlight-color:_transparent]"
	>
		<input :id="name" v-model="isChecked" :checked="modelValue" type="checkbox" class="peer sr-only" @change="handleCheck">

		<span
			class="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-shuttlersGreen"
		/>

		<span
			class="absolute inset-y-0 start-0 m-1 h-6 w-6 rounded-full bg-white transition-all peer-checked:start-6"
		/>
	</label>
</template>

<script setup lang="ts">
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    label: {
        type: String,
        default: '',
        required: false
    },
    modelValue: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        default: ''

    }
})

const isChecked = props.modelValue as boolean

const handleCheck = (e) => {
    emit('update:modelValue', e.target.checked)
}

</script>
