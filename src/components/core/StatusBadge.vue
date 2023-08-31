<template>
	<div
		v-if="name"
		:style="`color: ${selectPalette?.color} ; background-color: ${showBackground ? selectPalette?.bg : ''};`"
		class="px-3 py-1 text-xs font-medium rounded-3xl"
	>
		<slot> <span class="flex items-center gap-2 "><span class="w-2 h-2 rounded-full" :style="`background-color: ${showBackground ? selectPalette?.color : ''};`" />{{ translateStatus(name) }}</span> </slot>
	</div>
</template>

<script setup lang='ts'>

const toLowerCase = (val:any) => {
	return val.toLowerCase()
}

const props = defineProps({
	  name: {
	type: String,
	required: true
  },
  secondary: {
	type: Boolean,
	default: false
  },
  showBackground: {
	type: Boolean,
	default: true
  }
})

const selectPalette = ref<{color:string, bg:string}>()

const palette = {
	success: { color: '#25A254', bg: '#EDF7F1' },
	failed: { color: '#D12E2E', bg: '#FAEAEA' },
	pending: { color: '#E2C044', bg: '#FAF5E1' },
	default: { color: '#1F2937', bg: '#F3F4F6' }
}

		switch (toLowerCase(props.name)) {
			case 'pending':
				selectPalette.value = palette.pending
				break
			case 'success':
					selectPalette.value = palette.success
				break
			case 'failed':
					selectPalette.value = palette.failed
				break
			case 'cancelled':
					selectPalette.value = palette.failed
				break
			default :
					selectPalette.value = palette.default
		}

const translateStatus = (data:string) => {
    if (data === 'SUCCESS') return 'Successful'
    if (data === 'PENDING') return 'Processing'

const capitalized = data.charAt(0).toUpperCase() + data.slice(1).toLowerCase()
    return capitalized
}
</script>
