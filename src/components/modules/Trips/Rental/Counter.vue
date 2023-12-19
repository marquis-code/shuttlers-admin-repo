<template>
	<div class="w-full custom-number-input">
		<div class="relative flex items-center justify-between w-full mt-1 bg-transparent rounded-lg">
			<div>
				<button type="button" class="counterBtn" :disabled="countedNumber <= 1" @click="decrement">
					<span class="m-auto text-2xl font-thin">−</span>
				</button>
			</div>

			<input v-model="countedNumber" type="number" class="w-full font-semibold text-center bg-transparent outline-none text-md md:text-basecursor-default" name="custom-input-number" @input="$emit('update:modelValue', countedNumber)">
			<div>
				<button type="button" class="counterBtn" @click="increment">
					<span class="m-auto text-2xl font-thin">+</span>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">

const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Number,
    required: false,
    default: 0
  }
})

const countedNumber = ref(1)

watch(() => props.modelValue, (val) => {
  if (val) {
    countedNumber.value = val
  } else {
    countedNumber.value = 1
  }
}, { immediate: true })
const increment = () => {
  countedNumber.value++
  emits('update:modelValue', countedNumber.value)
}
const decrement = () => {
  if (countedNumber.value > 0) {
    countedNumber.value--
    emits('update:modelValue', countedNumber.value)
  }
}
</script>

<style>
.counterBtn {
  @apply bg-dark text-light h-8 w-8 rounded-full cursor-pointer outline-none disabled:bg-grey6
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.custom-number-input input:focus {
  outline: none !important;
}

.custom-number-input button:focus {
  outline: none !important;
}
</style>
