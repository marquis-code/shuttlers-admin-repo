<template>
	<div class="flex flex-col">
		<TableFilter :show-options="showOptions" :show-date-picker="showDatePicker"
			:show-download-button="showDownloadButton" :show-radio-buttons="showRadioButtons"
			:show-search-bar="showSearchBar" :checkbox="checkbox" :show-date-range="showDateRannge" />
		<div class="border border-gray-200 md:rounded-b-lg">
			<table v-if="loading || displayTable.length > 0" class="w-full table">
				<thead class="px-4">
					<tr class="h-[52px] border-b px-4">
						<th class="bg-dark pl-4"><input v-if="checkbox" type="checkbox"></th>
						<th v-for="(header, i) in [...headers] as Record<string, any>" :key="i"
							class="uppercase text-sm text-light font-bold text-left px-4 bg-dark"
							:style="`width: ${header.width ? header.width : defaultColWidth}%;`">
							{{ header.text }}
						</th>
					</tr>
				</thead>
				<div />
				<tbody v-if="!loading">
					<tr v-for="(data, index) in displayTable" :key="index + 1" :data-index="index" :class="[
						'border-t border-gray50 py-8 font-normal text-sm h-[52px]',
						hasOptions ? 'cursor-pointer' : '',
					]">
						<td class="pl-4"><input v-if="checkbox" type="checkbox"></td>
						<td v-for="(value, key) of populateTable(data)" :key="key + 1" class="px-4"
							:data-label="headers[value]">
							<slot name="item" :item="({ [key]: key, data } as any)">
								<span>{{ value }}</span>
							</slot>
						</td>
					</tr>
				</tbody>
				<tbody v-else>
					<tr v-for="n in 3" :key="n" class="border-t border-gray50 py-8 font-normal  text-sm h-[52px]">
						<td v-for="(header, i) in headers" :key="i" class="px-4">
							<Skeleton height="15px" radius="3px" />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
<script lang="ts" setup>
import gsap from 'gsap'

const props = defineProps({
	showRadioButtons: {
		type: Boolean
	},
	showDatePicker: {
		type: Boolean
	},
	showSearchBar: {
		type: Boolean
	},
	showDownloadButton: {
		type: Boolean
	},
	showDateRannge: {
		type: Boolean
	},
	showOptions: {
		type: Boolean,
		default: false
	},

	// showOneLayerFilter: {
	// 	type: Boolean,
	// 	default: false
	// },
	// showTwoLayerFilter: {
	// 	type: Boolean,
	// 	default: false
	// },
	option: {
		type: Function,
		default: () => { }
	},
	hasOptions: {
		type: Boolean,
		default: false
	},
	headers: {
		type: Array,
		default: () => [],
		required: true
	},
	tableData: {
		type: Array,
		default: () => []
	},
	tableHeight: {
		type: Number,
		default: 200
	},
	loading: {
		type: Boolean,
		default: false
	},
	checkbox: {
		type: Boolean,
		default: false
	},
	pageSync: {
		type: String,
		default: ''
	},
	itemPerPage: {
		type: Number,
		default: 10
	},
	page: {
		type: String,
		default: ''
	}
})

const itemLength = ref(0)
const checked = ref([])
const pages = ref(0)

const displayTable = computed({
	get: () => {
		if (props.pageSync) {
			return paginate(props.tableData)
		} else {
			return props.tableData
		}
	},
	set: () => { }
})

const getItemsWithColWidth = computed({
	get: () => {
		let length = 0
		props.headers.forEach((item: any) => {
			if (!item.width) {
				length++
			}
		})
		return length
	},
	set: () => { }
})

const defaultColWidth = computed({
	get: () => {
		return roundToTwo(100 / getItemsWithColWidth.value)
	},
	set: () => { }
})

const roundToTwo = (num) => {
	return +(Math.round(parseFloat(num + 'e+2')) + 'e-2')
}
const paginate = (data) => {
	const page: any = props.page
	const perPage: any = props.itemPerPage
	const from = page * perPage - perPage
	const to = page * perPage
	return data.slice(from, to)
}

const populateTable = (data: any) => {
	const element = {}

	props.headers.forEach((item: any) => {
		for (const key in data) {
			if (key === item.value) {
				element[key] = data[key]
			}
		}
	})

	return element
}

const beforeEnter = (el) => {
	el.style.opacity = 0
	// el.style.transform = 'translateY(100px)'
}
const enter = (el, done) => {
	gsap.to(el, {
		opacity: 1,
		// y: 0,
		duration: 0.5,
		onComplete: done,
		delay: el.dataset.index * 0.1
	})
}

</script>
