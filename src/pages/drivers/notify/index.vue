<template>
	<main class="space-y-6">
		<ButtonGoBack />
		<section class="flex flex-col gap-4 lg:flex-row">
			<div class="flex-grow flex flex-col gap-4">
				<div class="w-full">
					<input v-model.trim="title" type="text" placeholder="Notification title"
						class="w-full px-3 py-3 placeholder-gray-500 border rounded-md outline-none focus:border-gray-600">
				</div>
				<div class="w-full">
					<textarea v-model.trim="desc" class="w-full p-4 border rounded-md outline-none" cols="10" rows="6" placeholder="Start a notification..." />
				</div>
				<button class="text-gray-700 rounded-md border bg-white px-3 py-2.5 text-sm w-fit" @click="all_drivers = true">
					Select All Drivers
				</button>
			</div>
			<div class="w-full lg:w-[300px] xl:w-[400px] shrink-0 bg-white border rounded-md shadow-md">
				<div class="flex items-center justify-between px-6 py-3 space-x-6">
					<p class="inline text-sm">
						Selected Drivers
					</p>
					<button :disabled="!enableButton" class="text-white bg-gray-700 rounded-md px-3 py-2.5 text-xs disabled:cursor-not-allowed disabled:disabled:bg-[#E0E6ED]"
						@click="initNotify"
					>
						Notify Selected Drivers
					</button>
				</div>
				<hr>
				<div v-if="!selected_drivers.length" class="flex items-center justify-center p-4 h-[150px]">
					<p v-if="all_drivers" class="flex items-center gap-1 p-1 rounded whitespace-nowrap text-xs bg-[rgb(237,242,249)] text-[rgb(18,38,63)]">
						<span>All drivers selected</span>
						<Icon name="close" class="w-4 cursor-pointer" @click="all_drivers = false" />
					</p>
					<p v-else class="text-sm w-full text-center text-gray-600">
						Selected drivers will show here
					</p>
				</div>
				<div v-else class="flex items-center gap-2 flex-wrap rounded-b-md p-4">
					<p v-for="(n, i) in selected_drivers" :key="i" class="flex items-center gap-1 p-1 rounded whitespace-nowrap text-xs bg-[rgb(237,242,249)] text-[rgb(18,38,63)]">
						<span>{{ n.email }}</span>
						<Icon name="close" class="w-4 cursor-pointer" @click="removeSelectedDriver(n)" />
					</p>
				</div>
			</div>
		</section>

		<div>
			<!-- <Table :show-search-bar="true" :headers="tableFields" :table-data="tableData" :checkbox="true" /> -->
			<Table :loading="loading" :headers="tableFields" :table-data="driversList" :checkbox="true"
				:selected="selected_drivers" @checked="handleCheckedItems"
			>
				<template #header>
					<TableFilter
						:filter-type="{
							showStatus:false,
							showSearchBar:true,
							showDownloadButton: false,
							showDatePicker: false,
							showDateRange: false
						}"
						@filter="onFilterUpdate"
					/>
				</template>
				<template #item="{ item }">
					<div v-if="item.name" class="space-y-1 text-blue-600 py-2">
						<span class="block">{{ item.data.fname }} {{ item.data.lname }}</span>
					</div>
				</template>

				<template #footer>
					<TablePaginator :current-page="page" :total-pages="total" :loading="loading" @move-to="moveTo($event)" @next="next" @prev="prev" />
				</template>
			</Table>
		</div>
	</main>
</template>

<script setup lang="ts">
import { useGetDriversList, useNotifyDriver } from '@/composables/modules/drivers'

const { getDriversList, loading, driversList, moveTo, onFilterUpdate, next, prev, total, page } = useGetDriversList()
const { title, desc, selected_drivers, initNotify, enableButton, clearObj, all_drivers } = useNotifyDriver()

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})

const tableFields = ref([
	{ text: 'Name', value: 'name' },
	{ text: 'Email', value: 'email' },
	{ text: 'Phone', value: 'phone' }
])

const removeSelectedDriver = (data: Record<string, any>) => {
	selected_drivers.value = selected_drivers.value.filter((el) => el.id !== data.id)
}

const onSelected = (data) => {
	all_drivers.value = false
	selected_drivers.value = data
}

const handleCheckedItems = (val:Record<string, any>) => {
	all_drivers.value = false
	if (!selected_drivers.value.map((el) => el?.id).includes(val?.id)) {
		selected_drivers.value.push(val)
	} else {
		const index = selected_drivers.value.map((el) => el?.id).indexOf(val?.id)
		selected_drivers.value.splice(index, 1)
	}
}

clearObj()
getDriversList()
</script>

<style scoped></style>
