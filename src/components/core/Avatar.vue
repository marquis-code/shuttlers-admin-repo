<template>
	<img
		v-if="src"
		:src="src"
		:alt="name || 'Avatar'"
		:style="`width: ${size}px; height: ${size}px; object-fit: cover;`"
		class="!max-w-[1920px] rounded-full"
	>
	<span
		v-else
		:style="`width: ${size}px; height: ${size}px; object-fit: cover; background-color: ${bg}; color:${tc};`"
		class="flex items-center justify-center font-normal uppercase rounded-full"
	>
		<span :style="`font-size: ${size/2}px;line-height: 1em`">{{ name[0] }}</span>
	</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'AvatarComp',
	props: {
		src: {
			type: String,
			default: null
		},
		bg: {
			type: String,
			required: false,
			default: 'var(--primary)'
		},
		tc: {
			type: String,
			required: false,
			default: 'var(--dark)'
		},
		name: {
			type: String,
			required: false,
			default: '#'
		},
		size: {
			required: false,
			type: Number,
			default: 36
		},
		editable: {
			type: Boolean,
			required: false,
			default: false
		}
	}

})

</script>
