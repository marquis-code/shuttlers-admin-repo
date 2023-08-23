<template>
	<main class="space-y-6">
		<section class="flex justify-between space-x-16 items-start">
			<div class="w-8/12 space-y-6">
				<div class="w-full">
					<input type="text"
						class="py-3 rounded-md placeholder-gray-500 border focus:border-gray-600 px-3 w-full outline-none">
				</div>
				<div class="w-full">
					<textarea class="border rounded-md p-4 w-full outline-none" cols="10" rows="6"
						placeholder="Start a notification..." />
				</div>
				<button class="text-gray-700 rounded-md border bg-white px-3 py-2.5 text-sm">
					Select All Drivers
				</button>
			</div>
			<div class="w-4/12 border shadow-md rounded-md bg-white">
				<div class="flex justify-between items-center px-6 space-x-6 py-3">
					<p class="text-sm inline">
						Selected Drivers
					</p>
					<button class="text-white bg-gray-700  rounded-md px-3 py-2.5 text-xs">
						Notify Selected Drivers
					</button>
				</div>
				<hr>
				<div class="rounded-b-md h-60 flex justify-center items-center">
					<p class="text-sm text-gray-600 text-center">
						Selected drivers will show here
					</p>
				</div>
			</div>
		</section>

		<div>
			<Table :show-search-bar="true" :headers="tableFields" :table-data="tableData" :checkbox="true" pagi />
		</div>
	</main>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})

const tableFields = ref([
	{
		text: 'Name',
		value: 'name'
	},
	{
		text: 'Email',
		value: 'email'
	},
	{
		text: 'Phone',
		value: 'phone'
	}
])
const tableData = ref([
	{
		name: 'Grace Obasi',
		email: 'graceobasi@shuttlers.ng',
		phone: '09076543234'

	}
])
</script>

<style scoped></style>
