<template>
	<Skeleton v-if="loading" height="70px" radius="5px" />
	<div v-else class="my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
		<div v-for="n,i in arr" :key="i" class="bg-light border rounded-md p-4 flex flex-col">
			<p class="text-sm text-grey5 font-medium">
				{{ n.text }}
			</p>
			<h1 class="text-dark text-2xl font-semibold">
				{{ convertToCurrency(n.amount) || 'N/A' }}
			</h1>
		</div>
	</div>
</template>

<script setup lang="ts">
import { convertToCurrency } from '@/composables/utils/formatter'
const props = defineProps({
	obj: {
        type: Object,
		required: true
    },
    loading: {
        type: Boolean,
        required: true
    }
})

const arr = computed(() => {
    return [
        { text: 'Total Revenue', amount: props.obj?.totalRevenue || 0 },
        { text: 'Total Deduction', amount: props.obj?.totalDeductions || 0 },
        { text: 'Amount Payable', amount: props.obj?.netRevenue || 0 }
    ]
})
</script>
