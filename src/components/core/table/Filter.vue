<template>
	<main>
		<div class="flex justify-between border-t border-x bg-white rounded-t-md px-4">
			<div v-if="showSearchBar">
				<input type="text" placeholder="search"
					class="input-field !bg-transparent  outline-none py-4 text-start w-full">
			</div>

			<div v-if="showDatePicker" class="pt-2">
				<date-picker v-model:value="dateSelected" class="font-light" placeholder="Filter by date" />
			</div>
			<div v-if="showDateRange" class="pt-2">
				<date-picker v-model:value="dateRange" range />
			</div>
		</div>

		<div :class="[showOptions ? '' : 'hidden']"
			class="flex justify-between border-t border-x bg-white rounded-t-md p-4">
			<div v-if="showRadioButtons" class="flex items-center space-x-6">
				<div class="flex items-center justify-center space-x-2">
					<input type="radio">
					<label class="mt-1">Active</label>
				</div>
				<div class="flex items-center justify-center space-x-2">
					<input type="radio">
					<label class="mt-1">Inactive</label>
				</div>
			</div>

			<div v-if="showDownloadButton" class="flex items-center gap-x-2 cursor-pointer">
				<img src="@/assets/icons/source/download.svg" alt="" class="inline">
				<p class="text-xs font-medium">
					Download report
				</p>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
const props = defineProps({
	showRadioButtons: {
		type: Boolean,
		default: false
	},
	showDatePicker: {
		type: Boolean,
		default: false
	},
	showSearchBar: {
		type: Boolean,
		default: true
	},
	showDownloadButton: {
		type: Boolean,
		default: false
	},
	showOptions: {
		type: Boolean,
		default: false
	},
	showDateRange: {
	type: Boolean,
	default: false
}
})

const dateSelected = ref(null)

const dateRange = ref(null)
</script>
