<template>
	<Skeleton v-if="loading" height="70px" radius="5px" />
	<div v-else class="py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
		<div v-for="n,i in (fields as Record<string, any>[])" :key="i" class="bg-light border rounded-md p-4 flex flex-col">
			<p class="text-sm text-grey5 font-medium">
				{{ n.text }}
			</p>
			<h1 class="text-dark text-2xl font-semibold" :class="[n?.class]">
				{{ n?.key?.length ? convertToCurrency(data[n?.key] || 0) : 'N/A' }}
			</h1>
		</div>
	</div>
</template>

<script setup lang="ts">
import { convertToCurrency } from '@/composables/utils/formatter'
const props = defineProps({
	data: {
        type: Object,
		required: true
    },
    loading: {
        type: Boolean,
        required: true
    },
    fields: {
        type: Array,
        required: true
    }
})

</script>
