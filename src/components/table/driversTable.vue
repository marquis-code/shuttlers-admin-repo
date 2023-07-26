<template>
	<section class="container mx-auto">
		<div class="flex border-t border-r border-l space-x-5 bg-white rounded-t-md justify-between items-center text-xs py-3">
			<div class="w-full ">
				<input type="text" placeholder="search..." class="border-2 border-red-500 outline-none w-full py-3">
			</div>
			<div>
				<vue-date-picker class="border-2 border-red-500" v-model="value" placeholder="Filter by date" />
			</div>
		</div>
		<div
			class="flex border-t border-r border-l px-6 space-x-5 bg-white rounded-t-md justify-between items-center text-xs py-3">
			<div class="flex items-center space-x-6">
				<div class="flex items-center justify-center space-x-1">
					<div><input type="radio"></div>
					<div><label class="mt-1 text-sm">Active</label></div>
				</div>
				<div class="flex items-center justify-center space-x-1">
					<div><input type="radio"></div>
					<div><label class="mt-1 text-sm">Inactive</label></div>
				</div>
			</div>
			<div class="">
				<p class="font-bold text-sm cursor-pointer">
					Download Report
				</p>
			</div>
		</div>
		<div class="flex flex-col">
			<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
					<div class="overflow-hidden border border-gray-200 md:rounded-b-lg">
						<table class="min-w-full divide-y divide-gray-200">
							<thead class="bg-gray-100">
								<tr>
									<th scope="col" class="p-4">
										<div class="flex items-center">
											<input id="checkbox-all" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
											<label for="checkbox-all" class="sr-only">checkbox</label>
										</div>
									</th>
									<th v-for="(item, index) in tableFields" :key="index" scope="col"
										class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
										{{ item.name }}
									</th>
								</tr>
							</thead>
							<tbody class="bg-white divide-y divide-gray-200">
								<tr>
									<td class="p-4 w-4">
										<div class="flex items-center">
											<input id="checkbox-table-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
											<label for="checkbox-table-1" class="sr-only">checkbox</label>
										</div>
									</td>
									<td v-for="(item, index) in tableData" :key="index"
										class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
										<div class="inline-flex items-center gap-x-3">
											<span v-if="item.key === 'staff'"
												class="rounded-full p-3 bg-gray-200 text-center">{{
													item?.value.split('')[0].charAt(0) }}{{ item?.value.split(' ')[1].charAt(0)
												}}</span>
											<span>{{ item.value }}</span>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
		<div class="flex items-center justify-between border w-2/12  mt-6 py-2 rounded-lg px-3 divide-x-2">
			<a href="#"
				class="flex items-center text-sm text-gray-700 capitalize transition-colors duration-200 gap-x-2 hover:bg-gray-100">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
					stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" />
				</svg>
			</a>
			<div class="items-center hidden md:flex gap-x-3">
				<a href="#" class="px-2 py-1 text-sm text-gray-500 rounded-md hover:bg-gray-100">2</a>
				<a href="#" class="px-2 py-1 text-sm text-gray-500 rounded-md hover:bg-gray-100">2</a>
				<a href="#" class="px-2 py-1 text-sm text-gray-500 rounded-md hover:bg-gray-100">3</a>
			</div>
			<a href="#"
				class="flex items-center text-sm text-gray-700 capitalize transition-colors duration-200  gap-x-2 hover:bg-gray-100">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
					stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M13 17l5-5-5-5M6 17l5-5-5-5" />
				</svg>
			</a>
		</div>
	</section>
</template>
<script setup>
import { defineProps } from 'vue'
const props = defineProps({
	tableFields: {
		type: Array,
		required: true
	},
	tableData: {
		type: Array,
		required: true
	}
})

const value = ref(null)
</script>
