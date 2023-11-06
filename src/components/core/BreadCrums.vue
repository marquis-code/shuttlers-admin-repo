<template>
	<div class="flex items-center gap-x-3">
		<p class="text-[14px]">
			{{ title }}
		</p>
		<img src="@/assets/icons/source/caret-greater-than.svg" alt="">
		<div v-for="(itm, idx) in props.content" :key="idx" class="flex items-center gap-x-2">
			<p class="text-[14px]">
				{{ itm?.name }}
			</p>
			<img src="@/assets/icons/source/caret-greater-than.svg" alt="">
		</div>
	</div>
</template>
<script setup lang="ts">
  const props = defineProps({
    title: {
        type: String,
        required: true
    },
    content: {
        type: Array,
        required: true
    }
  })
</script>
