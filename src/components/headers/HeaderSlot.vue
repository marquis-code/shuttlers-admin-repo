<template>
	<div class="bg-white border-b flex flex-col gap-2 md:px-9 px-6  relative h-auto" :class="[hasTabs? 'md:pt-5 pt-3.5':'md:pt-5 py-3.5',headerCss]">
		<section class="flex justify-between items-center">
			<div class="flex flex-col">
				<h6 class="text-xs uppercase font-bold text-gray-400">
					{{ preTitle }}
				</h6>
				<h1 class="text-[28px] font-bold">
					{{ title }}
				</h1>
			</div>
			<div class="">
				<slot name="actions" />
			</div>
		</section>
		<div v-if="!loading && hasTabs" class="">
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
