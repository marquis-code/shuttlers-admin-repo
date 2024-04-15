<template>
	<div
		v-if="name"
		:style="`color: white; background-color:${selectPalette?.bg};`"
		class="px-3 py-1 text-xs font-medium rounded-md  inline-block"
	>
		<slot> {{ translateStatus(name) }}</slot>
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
  }
})

const selectPalette = ref<{color:string, bg:string}>()

const palette = {
	success: { color: '#25A254', bg: '#15CD70' },
	failed: { color: '#D12E2E', bg: '#E13D45' },
	pending: { color: '#E2C044', bg: '#FDB022' },
	default: { color: '#1F2937', bg: '#FDB022' },
	active: { color: '#25A254', bg: '#15CD70' },
	inactive: { color: '#D12E2E', bg: '#E13D45' }
}

		switch (toLowerCase(props.name)) {
			case 'pending':
				selectPalette.value = palette.pending
				break
			case 'success':
			case 'accepted':
			case 'completed':
			case 'upcoming':
					selectPalette.value = palette.success
				break
			case 'failed':
			case 'false':
					selectPalette.value = palette.failed
				break
			case 'cancelled':
					selectPalette.value = palette.failed
				break
			case 'active':
					selectPalette.value = palette.active
				break
			case 'inactive':
			case 'suspended':
			case 'rejected':
					selectPalette.value = palette.inactive
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
