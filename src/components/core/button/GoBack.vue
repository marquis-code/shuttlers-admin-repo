<template>
	<div>
		<NuxtLink v-if="url" :to="url" class="text text-xs bg-gray-200 text-gray-900 rounded-lg px-3 py-2 w-fit">
			{{ title }}
		</NuxtLink>
		<button v-else class="text text-xs bg-gray-200 text-gray-900 rounded-lg px-3 py-2 w-fit" type="button" @click="goBack">
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

const router = useRouter()
const route = useRoute()

const goBack = () => {
	const historyStack = router.options.history.state.back as string

  if (historyStack) {
    router.push(historyStack)
  } else {
    router.go(-1)
  }
}
</script>
