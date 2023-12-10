<template>
	<div class="flex flex-col gap-1">
		<div class="flex items-center gap-3">
			<input id="pickup" type="radio" value="pickup" v-model="type">
			<label for="pickup">Pickup Location</label>
		</div>
		<div class="flex items-center gap-3">
			<input id="dropoff" type="radio" value="dropoff" v-model="type">
			<label for="dropoff">Drop-off Location</label>
		</div>

		<div class="flex items-center gap-4 justify-end mt-3">
			<button class="py-1 px-2 text-red font-medium text-xs">Delete</button>
			<button class="py-1 px-2 text-light bg-dark text-xs rounded">Edit</button>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	busStop: {
        type: Object,
        default: () => {}
    }
})
const type = ref(props.busStop.is_pickup ? 'pickup' : 'dropoff')
</script>

<style scoped>
label{
	@apply m-0 text-sm font-normal
}
</style>
