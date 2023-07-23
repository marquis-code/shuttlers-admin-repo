<template>
	<div class="bg-white border-b flex flex-col gap-2 md:px-10 px-6 md:py-5 py-3.5 relative" :class="headerCss">
		<section class="flex justify-between">
			<div class="flex flex-col">
				<h6 class="text-xs uppercase font-bold text-gray-400">
					{{ preTitle }}
				</h6>
				<h1 class="text-[28px] font-bold">
					{{ title }}
				</h1>
			</div>
		</section>
		<div v-if="!loading && hasTabs">
			<slot name="tabs" />
		</div>
	</div>
</template>

<script setup>
import { defineProps, computed, withDefaults, useSlots } from 'vue'

const slots = useSlots()

const props = defineProps({
  headerCss: [Array, Object],
  title: { type: String, required: true },
  preTitle: { type: String, required: false, default: 'Overview' },
  loading: { type: Boolean, required: false, default: false }
})

const hasTabs = computed(() => {
  return !!slots.tabs
})
</script>

<style lang="scss" scoped>
.header-title {
  font-weight: 500;
  font-size: 20px;
  line-height: 29px;
}
</style>
