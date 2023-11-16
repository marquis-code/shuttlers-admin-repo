<template>
	<label :for="name" class="flex items-center cursor-pointer">
		<div id="toggle" class="relative">
			<input :id="name" type="checkbox" class="sr-only" :checked="modelValue" @change="test">
			<div id="line" class="block bg-[#F9FBFA] border border-[#E5E5EA] w-14 h-[36px] rounded-full line" />
			<div id="dot" class="dot absolute left-0 top-1 bg-white shadow-mode w-7 h-7 rounded-full transition" />
		</div>

		<div id="label" class="ml-3 text-dark font-medium ">
			{{ label }}
		</div>
	</label>
</template>

<script setup lang="ts">
const props = defineProps({
	modelValue: { type: Boolean, default: false },
	label: {
		type: String,
		default: 'default string'
	},
	name: {
		type: String,
		default: ''
	}
})

const test = (e: any) => {
	emit('update:modelValue', e.target.checked)
}

const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
input:checked ~ .dot {
  transform: translateX(100%);
  background-color: var(--light);
  left: -3px;
}
input:checked ~ .line {
  /* transform: translateX(100%); */
  background-color: #48bb78;
}
.shadow-mode{
box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.05), 0px 3px 1px rgba(0, 0, 0, 0.0510643), 0px 2px 2px rgba(0, 0, 0, 0.1), 0px 3px 3px rgba(0, 0, 0, 0.05);
}
</style>
