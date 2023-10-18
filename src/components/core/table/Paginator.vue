<template>
	<footer class="flex items-center justify-between w-full p-4 mb-12">
		<span v-if="!loading" class="text-sm">
			Showing {{ currentPage }} of {{ totalPages }}
		</span>
		<span v-else />

		<section class="flex gap-4">
			<nav class="inline-flex -space-x-px rounded-md shadow-sm isolate" aria-label="Pagination">
				<button type="button" class="prev" @click="emit('prev')">
					<ChevronLeftIcon class="w-5 h-5" aria-hidden="true" />
				</button>
				<button v-for="n in visiblePages" :key="n" type="button" :class="[currentPage === n ? 'bg-green7 !text-light':'', 'moveTo']" @click="emit('moveTo', n)">
					{{ n }}
				</button>
				<!-- <span v-if="totalPages > visiblePages.length">
					<span v-if="currentPage + visiblePages.length < totalPages" type="button" class="moveTo">...</span>
					<button type="button" class="moveTo" @click="emit('moveTo', totalPages)">
						{{ totalPages }}
					</button>
				</span> -->
				<button type="button" class="next" @click="emit('next')">
					<ChevronRightIcon class="w-5 h-5" aria-hidden="true" />
				</button>
			</nav>
		</section>
	</footer>
</template>

<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
const emit = defineEmits(['next', 'prev', 'moveTo'])
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

const visiblePages = computed(() => {
  const maxVisiblePages = 5 // Adjust this number as needed
  const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2)

  if (props.totalPages <= maxVisiblePages) {
    return Array.from({ length: props.totalPages }, (_, i) => i + 1)
  } else {
    const start = Math.max(props.currentPage - halfMaxVisiblePages, 1)
    const end = Math.min(start + maxVisiblePages - 1, props.totalPages)

    if (start > 1) {
      return [1, '...', ...Array.from({ length: end - start + 1 }, (_, i) => start + i)]
    } else {
      return Array.from({ length: end - start + 1 }, (_, i) => start + i)
    }
  }
})
</script>

<style scoped>
.prev{
@apply  relative inline-flex items-center px-2 py-2 text-gray-400 rounded-l-md ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0
}
.next{
@apply  relative inline-flex items-center px-2 py-2 text-gray-400 rounded-r-md ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0
}
.moveTo{
@apply relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300  focus:z-20 focus:outline-offset-0
}
</style>
