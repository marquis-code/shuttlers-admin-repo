<template>
	<main class="space-y-6">
		<section class="flex items-start justify-between space-x-16">
			<div class="w-8/12 space-y-6">
				<div class="w-full">
					<input type="text"
						class="w-full px-3 py-3 placeholder-gray-500 border rounded-md outline-none focus:border-gray-600">
				</div>
				<div class="w-full">
					<textarea class="w-full p-4 border rounded-md outline-none" cols="10" rows="6"
						placeholder="Start a notification..." />
				</div>
				<button class="text-gray-700 rounded-md border bg-white px-3 py-2.5 text-sm">
					Select All Drivers
				</button>
			</div>
			<div class="w-4/12 bg-white border rounded-md shadow-md">
				<div class="flex items-center justify-between px-6 py-3 space-x-6">
					<p class="inline text-sm">
						Selected Drivers
					</p>
					<button class="text-white bg-gray-700  rounded-md px-3 py-2.5 text-xs">
						Notify Selected Drivers
					</button>
				</div>
				<hr>
				<div class="flex items-center justify-center rounded-b-md h-60">
					<p class="text-sm text-center text-gray-600">
						Selected drivers will show here
					</p>
				</div>
			</div>
		</section>

		<div>
			<Table :show-search-bar="true" :headers="tableFields" :table-data="tableData" :checkbox="true" />
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
