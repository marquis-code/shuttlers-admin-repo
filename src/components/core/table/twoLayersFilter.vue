<template>
	<div>
		<div class="flex justify-between border-t border-x bg-white rounded-t-md px-4">
			<div>
				<input type="text" placeholder="search"
					class="input-field !bg-transparent  outline-none py-4 text-start w-full">
			</div>

			<div class="pt-2">
				<date-picker v-model:value="dateSelected" class="font-light" placeholder="Filter by date" />
			</div>
		</div>

		<div class="flex justify-between border-t border-x bg-white rounded-t-md p-4">
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

			<div class="flex items-center gap-x-2 cursor-pointer">
				<img src="@/assets/icons/source/download.svg" alt="" class="inline">
				<p class="text-xs font-medium">
					Download report
				</p>
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

const dateSelected = ref(null)

</script>

<style scoped></style>
