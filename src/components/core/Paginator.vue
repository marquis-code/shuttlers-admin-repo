<template>
	<footer class="flex items-center justify-between w-full mb-12">
		<span v-if="!loading" class="text-sm">
			Showing {{ currentPage }} of {{ totalPages }}
		</span>
		<span v-else />

		<section class="flex gap-4">
			<button v-if="currentPage !==1" class="btn-outline " @click="emit('first')">
				First
			</button>
			<button class="btn-outline " :disabled="currentPage === 1" @click="emit('prev')">
				Previous
			</button>
			<button class="btn-outline" :disabled="currentPage === totalPages" @click="emit('next')">
				Next
			</button>
		</section>
	</footer>
</template>

<script setup lang="ts">
const emit = defineEmits(['next', 'prev', 'first'])
defineProps({
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
</script>

<style scoped>

</style>
