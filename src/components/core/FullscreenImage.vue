<template>
	<div>
		<div class="cursor-zoom" @click.native="toggleFullScreen">
			<img :src="src" :alt="alt" class="cursor-pointer">
		</div>

		<div v-if="isFullScreen" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" @click="toggleFullScreen">
			<img :src="src" :alt="alt" class="max-w-full max-h-full">
		</div>
	</div>
</template>

  <script setup lang="ts">
  const props = defineProps({
    src: String,
    alt: String
  })

  const isFullScreen = ref(false)

  const toggleFullScreen = () => {
    isFullScreen.value = !isFullScreen.value
  }
  </script>
