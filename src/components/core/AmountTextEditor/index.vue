<template>
	<div>
		<Skeleton v-if="loading" height="20px" radius="3px" />
		<template v-else>
			<p v-if="!showEditor" class="whitespace-nowrap" :class="disabled ? 'cursor-not-allowed' : 'cursor-pointer'" @click="disabled ? null : showEditor = true">
				{{ amount ? convertToCurrency(amount) : 'Enter amount' }}
			</p>
			<div v-else class="flex flex-col gap-1">
				<input :value="amount" type="number" placeholder="Enter amount" class="amount_inline_text_editor p-2 py-1 bg-light border border-dark rounded">
				<div class="flex items-center gap-4">
					<button @click="showEditor = false">
						❌
					</button>
					<button @click="emitValue">
						✅
					</button>
				</div>
			</div>
		</template>
	</div>
</template>

<script setup lang="ts">
import { convertToCurrency } from '@/composables/utils/formatter'

const emit = defineEmits(['updateVal'])
const props = defineProps({
	amount: { type: Number, default: 0 },
	loading: { type: Boolean, default: false, required: false },
	disabled: { type: Boolean, default: false }
})
const showEditor = ref(false)

const emitValue = () => {
	const x = (document.querySelector('input.amount_inline_text_editor') as any).value
	emit('updateVal', { old: props.amount, new: x })
	showEditor.value = false
}
</script>
