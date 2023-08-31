<template>
	<footer class="flex items-center justify-between w-full py-4 mb-12">
		<span v-if="!loading" class="text-sm">
			Showing {{ currentPage }} of {{ totalPages }}
		</span>
		<span v-else />

		<section class="flex gap-4">
			<nav class="inline-flex -space-x-px rounded-md shadow-sm isolate" aria-label="Pagination">
				<a href="#" class="relative inline-flex items-center px-2 py-2 text-gray-400 rounded-l-md ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
					<ChevronLeftIcon class="w-5 h-5" aria-hidden="true" />
				</a>
				<a v-for="n in generateNumberArray.value" :key="n" href="#" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">{{ n }}</a>
				<a href="#" class="relative inline-flex items-center px-2 py-2 text-gray-400 rounded-r-md ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
					<ChevronRightIcon class="w-5 h-5" aria-hidden="true" />
				</a>
			</nav>

			<!-- <button class="btn-outline " :disabled="currentPage === 1" @click="emit('prev')">
				Previous
			</button>
			<button class="btn-outline" :disabled="currentPage === totalPages" @click="emit('next')">
				Next
			</button> -->
		</section>
	</footer>
</template>

<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
const emit = defineEmits(['next', 'prev', 'first'])
const props = defineProps({
    loading: {
        type: Boolean,
        required: true
    },
    currentPage: {
        type: Number,
        required: true
    },
    totalPages: {
        type: Number,
        required: true
	}

})

const generateNumberArray = computed(() => {
	const arr = ref([] as number[])
	for (let i = 1; i <= props.totalPages; i++) {
		arr.value.push(i)
	}
	return arr
})
</script>

<style scoped>

</style>
