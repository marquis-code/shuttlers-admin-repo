<template>
	<NuxtLink v-if="url" :to="url" class="text text-xs bg-gray-200 text-gray-900 rounded-lg px-3 py-2 w-fit">
		Go back
	</NuxtLink>
	<button v-else class="text text-xs bg-gray-200 text-gray-900 rounded-lg px-3 py-2 w-fit" @click="$router.go(-1)">
		Go back
	</button>
</template>

<script setup lang="ts">
defineProps({
	url: {
		type: String,
		default: '',
		required: false
	}
})
</script>
