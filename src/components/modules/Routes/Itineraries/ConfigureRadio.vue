<template>
	<div class="bg-[#F9FBFD] px-[16px] py-[12px] grid grid-cols-1 md:grid-cols-2 gap-y-[8px] gap-x-[16px]">
		<p class="text-sm font-medium text-[#6E717C] m-0">
			{{ obj.title }}
		</p>
		<div class="flex gap-[16px] items-center">
			<div v-for="n in obj.radios" :key="n.id" class="flex gap-2 items-center radio-container" @click="$emit('changed', {key: n.name, val:n.id})">
				<div :class="obj.model === n.id ? '!border-[#4848ED]' : '!border-[#D3DCE6]'" class="w-[16px] h-[16px] rounded-full border flex items-center justify-center shrink-0">
					<div v-if="obj.model === n.id" class="bg-[#4848ED] w-[70%] h-[70%] rounded-full" />
				</div>
				<!-- <input class="radio_input" type="radio" :id="n.id" :name="n.name" :value="n.id" :checked="obj.model === n.id"> -->
				<label :for="n.id" class="text-xs text-[#09090F] font-medium m-0">{{ n.label }}</label>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">

defineProps({
	obj: {
        type: Object,
		required: true
    }
})
</script>

<style scoped>
input.radio_input{
	&:disabled{
		background-color: green;
		color: #fff;
		border-color: red;
	}
}

</style>
