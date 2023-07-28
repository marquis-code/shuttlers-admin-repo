<template>
	<div>
		<div class="flex justify-between border-t border-x bg-white rounded-t-md px-4">
			<input type="search" placeholder="search"
				class="input-field !bg-transparent w-auto outline-none py-4 text-start ">

			<div class="flex items-center space-x-6">
				<div class="flex items-center justify-center space-x-2">
					<input type="radio">
					<label class="mt-1">Active</label>
				</div>
				<div class="flex items-center justify-center space-x-2">
					<input type="radio">
					<label class="mt-1">Inactive</label>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	showDateFilter: {
		type: Boolean
	},
	showDownloadButton: {
		type: Boolean
	},
	showActivityCheckbox: {
		type: Boolean
	}
})

</script>

<style scoped></style>
