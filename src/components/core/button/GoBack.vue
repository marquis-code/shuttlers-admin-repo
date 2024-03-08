<template>
	<div>
		<NuxtLink v-if="url" :to="url" class="text text-xs bg-gray-200 text-gray-900 rounded-lg px-3 py-2 w-fit">
			{{ title }}
		</NuxtLink>
		<button v-else class="text text-xs bg-gray-200 text-gray-900 rounded-lg px-3 py-2 w-fit" @click="$router.go(-1)">
			{{ title }}
		</button>
	</div>
</template>

<script setup lang="ts">
defineProps({
	url: {
		type: String,
		default: '',
		required: false
	},
	title: {
		type: String,
		default: 'Go back',
		required: false
	}
})
</script>
