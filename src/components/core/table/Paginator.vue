<template>
	<nav class="flex justify-between items-center bg-white px-4 py-3 sm:px-6 border-t rounded-b-lg border-gray-300"
		aria-label="Pagination">
		<div class="hidden sm:block flex-1">
			<p class="font-semibold text-gray-700">
				Page
				<span class="font-medium"> {{ currentPage }} </span>
				of
				<span class="font-medium">{{ totalPages }}</span>
			</p>
		</div>
		<div class="sm:hidden md:-mt-px md:flex flex-1 flex justify-center gap-x-8 items-center">
			<button v-for="n in visiblePages" :key="n" type="button"
				:class="[currentPage === n ? 'bg-[#E6FFF2] !text-[#0DAC5C] px-3 font-bold' : 'text-[#98A2B3] font-bold', 'moveTo']"
				class="border-none outline-none" @click="emit('moveTo', n)">
				{{ n }}
			</button>
		</div>

		<div class="flex flex-1 justify-between sm:justify-end">
			<button type="button"
				class="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 gap-x-3"
				@click="emit('prev')">
				<img src="@/assets/icons/source/backward.svg" alt="">
				Previous
			</button>
			<button type="button"
				class="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 gap-x-3"
				@click="emit('next')">
				Next
				<img src="@/assets/icons/source/forward.svg" alt="">
			</button>
		</div>
	</nav>
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
