<template>
	<div v-if="!loading" class="  flex flex-col gap-2 md:px-9 px-6  relative h-auto bg-white rounded-t-3xl border-b" :class="[hasTabs? 'md:pt-5 pt-3.5':'md:pt-5 py-3.5',headerCss]">
		<section class="md:flex justify-between items-center space-y-2 md:space-y-0">
			<div class="flex flex-col">
				<!-- <h6 class="text-xs uppercase font-bold text-gray-400">
					{{ preTitle }}
				</h6> -->
				<h1 class="text-xl font-bold flex items-center gap-2">
					{{ title }}
					<slot name="title" />
				</h1>
			</div>
			<div class="">
				<slot name="actions" />
			</div>
		</section>
		<div v-if="!loading && hasTabs" class="flex">
			<slot name="tabs" />
		</div>
	</div>
	<Skeleton v-else height="119px" />
</template>

<script setup>

const slots = useSlots()

const props = defineProps({
  headerCss: { type: [Array, Object], required: false, default: () => ({}) },
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
