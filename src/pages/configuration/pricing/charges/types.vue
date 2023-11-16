<template>
	<main class="">
		<Table
			:loading="loading"
			:has-index="true"
			:headers="tableFields"
			:table-data="chargeTypes"
			:has-options="true"
			:page="page"
		>
			<template #header>
				<TableFilter
					:filter-type="{
						showStatus: false,
						showSearchBar: true,
						showDownloadButton: false,
						showDatePicker: false,
					}"
					@filter="onFilterUpdate"
				/>
			</template>
			<template #item="{ item }">
				<p v-if="item.type" class="text-sm text-[#737876] whitespace-nowrap">
					<span class="text-[#101211] uppercase">
						{{ item.data.short_name }}</span> {{ item.data.name }}
				</p>
				<p v-if="item.desc" class="text-sm text-[#737876]">
					{{ item.data.description }}
				</p>
				<div v-if="item.time" class="flex flex-col gap-1 text-xs text-[#313533] font-medium">
					<p>{{ moment(item.data.created_at).format('LT') }}</p>
					<p>{{ moment(item.data.created_at).format('Do MMMM, YYYY') }}</p>
				</div>
				<span v-if="item.action">
					<ButtonIconDropdown :children="dropdownChildren" :data="item.data" class-name="w-40" />
				</span>
			</template>

			<template #footer>
				<TablePaginator
					:current-page="page"
					:total-pages="total"
					:loading="loading"
					@move-to="moveTo($event)"
					@next="next"
					@prev="prev"
				/>
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import moment from 'moment'
import { useFetchChargeTypes, useCreateChargeType, useDeleteChargeTypes } from '@/composables/modules/configure/charges/types/index'
definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const { loading, fetchChargeTypes, chargeTypes, total, page, next, prev, moveTo, onFilterUpdate } = useFetchChargeTypes()
const { initEditCharge } = useCreateChargeType()
const { initDeleteCharge } = useDeleteChargeTypes()
const tableFields = ref([
	{ value: 'type', text: 'Charges type' },
	{ value: 'desc', text: 'Description' },
	{ value: 'time', text: 'Time/Date' },
	{ value: 'action', text: 'Action' }
])

const dropdownChildren = computed(() => [
	{ name: 'Edit', func: (data:any) => { initEditCharge(data) } },
	{ name: 'Delete', func: (data:any) => initDeleteCharge(data.id), class: '!text-red' }
])

fetchChargeTypes()
</script>
