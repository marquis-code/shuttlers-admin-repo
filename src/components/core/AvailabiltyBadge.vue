<template>
	<div
		:style="`color: white; background-color:${displayValue?.bg};`"
		class="px-3  py-[7px] text-xs font-bold flex gap-1   self-center rounded-[19px]"
	>
		<Icon :name="displayValue.icon" class="w-4" />
		<slot> {{ displayValue.name }}</slot>
	</div>
</template>

<script setup lang='ts'>

const toLowerCase = (val:any) => {
	return val.toLowerCase()
}

const props = defineProps({
  available: {
	type: Boolean,
	required: true
  }

})

const displayValue = computed(() => {
	switch (props.available) {
		case true:
			return {
				name: 'Live location',
				bg: '#0DAC5C',
				icon: 'online'
			}
		case false:
			return {
				name: 'Offline',
				bg: '#E13D45',
				icon: 'offline'
			}
		default:
			return {
					name: 'Unknown',
				bg: '#000000',
				icon: 'unknown'
			}
	}
})
</script>
