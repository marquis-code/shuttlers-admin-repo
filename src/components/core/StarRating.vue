<template>
	<div class="flex">
		<div v-for="(index, idx) in 5" :key="idx">
			<svg v-if="rating >= index" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
				<!-- Full Star -->
				<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.37 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.541 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.786.57-1.841-.197-1.541-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.46 8.72c-.782-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
			</svg>
			<svg v-else-if="rating >= index - 0.5" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
				<!-- Half Star -->
				<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.37 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.541 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.786.57-1.841-.197-1.541-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.46 8.72c-.782-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292zM10 14.5l-.717.478.207-.707-.582-.501h.727l.273-.948.273.948h.727l-.582.501.207.707L10 14.5z" />
			</svg>
			<svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<!-- Empty Star -->
				<path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.37 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.541 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.786.57-1.841-.197-1.541-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.46 8.72c-.782-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
			</svg>
		</div>
	</div>
</template>

  <script setup>
  defineProps({
    rating: {
      type: Number,
      required: true
    }
  })
  </script>
