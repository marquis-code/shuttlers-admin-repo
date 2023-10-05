<template>
	<section class="mx-10 mt-14 space-y-10">
		<div class="h-16 bg-white shadow-sm border-[0.4px] rounded-md p-3 w-full flex items-center justify-end">
			<div class="flex justify-end items-end">
				<button class="bg-black text-white px-2 py-2.5 text-xs rounded-md">
					Add passengers
				</button>
			</div>
		</div>
		<div class="bg-white pb-14 shadow-sm border-[0.4px] rounded-md p-3 w-full flex items-center justify-center flex-col space-y-1">
			<img src="@/assets/icons/source/empty-search-state.svg" alt="enpty state">
			<p class="font-medium text-gray-900">
				No bus stop or user found
			</p>
			<p class="font-light text-gray-600">
				Try adjusting your search to find what you are looking for
			</p>
		</div>
	</section>
</template>

<script setup lang="ts">
//
definePageMeta({
	layout: 'dashboard-zero',
	middleware: ['is-authenticated']
})

</script>

<style scoped>

</style>
