<template>
	<button class="cursor-pointer flex items-center justify-center shrink-0">
		<Icon name="copy2" class="w-4 text-blue-800" @click="copyToClipboard" />
	</button>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { useAlert } from '@/composables/core/notification'
const props = defineProps({
	value: {
		type: String,
		required: true
	}
})

const source = ref(props.value)
const { text, copy, copied, isSupported } = useClipboard()

const copyToClipboard = () => {
    if (isSupported.value) {
        copy(props.value)
    } else {
        useAlert().openAlert({ type: 'ERROR', msg: 'Cant copy to clipboard' })
    }
}
</script>
