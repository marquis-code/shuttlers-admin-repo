<template>
	<label :for="name" class="flex items-center cursor-pointer m-0">
		<div id="toggle" class="relative">
			<input :id="name" v-model="model" type="checkbox" class="sr-only">
			<div id="line" class="block bg-[#F9FBFA] border border-[#E5E5EA] w-8 h-[20px] rounded-full line" />
			<div id="dot" class="dot absolute left-0 top-0.5 bg-white shadow-mode w-4 h-4 rounded-full transition" />
		</div>

		<div id="label" class="ml-3 text-dark font-medium ">
			{{ label }}
		</div>
	</label>
</template>

<script setup lang="ts">

const model = defineModel()
const props = defineProps({
	label: {
		type: String,
		default: 'default string'
	},
	name: {
		type: String,
		default: ''
	}
})

</script>

<style scoped>
input:checked ~ .dot {
  transform: translateX(100%);
  background-color: var(--light);
  left: -1px;
}
input:checked ~ .line {
  /* transform: translateX(100%); */
  background-color: #48bb78;
}
.shadow-mode{
box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.05), 0px 3px 1px rgba(0, 0, 0, 0.0510643), 0px 2px 2px rgba(0, 0, 0, 0.1), 0px 3px 3px rgba(0, 0, 0, 0.05);
}
</style>
