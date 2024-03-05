<template>
	<section class="flex flex-col max-w-full  z-10">
		<slot name="header" />
		<slot name="sub_header" />
		<div class="border border-gray-200 md:rounded-b-lg" :class="[hasOverflow ? 'overflow-auto' : '']">
			<table v-if="loading || displayTable.length > 0" class="table w-full">
				<thead class="px-4">
					<tr class="h-[52px] border-b px-4">
						<th v-if="checkbox" class="pl-4 text-light">
							<!-- <input type="checkbox"> -->
							<div />
						</th>
						<th v-if="hasIndex" class="pl-4 text-dark text-xs">
							S/N
						</th>
						<th v-for="(header, i) in [...headers] as Record<string, any>" :key="i"
							class="px-4 text-xs font-medium text-left text-gray-900 uppercase"
							:style="`width: ${header.width ? header.width : defaultColWidth}%;`">
							{{ header.text }}
						</th>
					</tr>
				</thead>
				<div />
				<tbody v-if="!loading">
					<tr v-for="(data, index) in displayTable" :key="index + 1" :data-index="index" :class="[
							'py-8 font-normal border-t text-sm h-[52px] odd:bg-[#F9FBFD] bg-light',
							hasOptions ? 'cursor-pointer' : '',
						]"
						@click.stop="option(data)"
					>
						<td v-if="checkbox" class="pl-4">
							<input v-model="checkedArray" :value="data" type="checkbox" @click.stop @change="$emit('checked', checkedArray)">
						</td>
						<td v-if="hasIndex" class="pl-4">
							{{ (page - 1) * 10 + index + 1 }}
						</td>
						<td v-for="(value, key) of populateTable(data)" :key="key + 1" class="px-4"
							:data-label="headers[value]">
							<slot name="item" :item="({ [key]: key, data, index: index } as any)">
								<span>{{ value }}</span>
							</slot>
						</td>
					</tr>
					<div class="h-16" />
				</tbody>
				<tbody v-else>
					<tr v-for="n in 3" :key="n" class="border-t border-gray50 py-8 font-normal  text-sm h-[52px]">
						<td v-if="hasIndex" class="pl-4">
							<Skeleton height="15px" radius="3px" />
						</td>
						<td v-for="(header, i) in headers" :key="i" class="px-4">
							<Skeleton height="15px" radius="3px" />
						</td>
					</tr>
				</tbody>
			</table>
			<div v-else class="flex items-center justify-center py-8">
				<span class="text-gray-400">No data available</span>
			</div>
		</div>
		<slot name="footer" />
	</section>
</template>

<script lang="ts" setup>
import gsap from 'gsap'

defineEmits(['checked'])

const checkedArray = ref([] as Record<string, any>[])

const props = defineProps({
	hasOverflow: {
		type: Boolean,
		default: true
	},
	option: {
		type: Function,
		default: () => { }
	},
	hasOptions: {
		type: Boolean,
		default: false
	},
	selected: {
        type: Array,
        default: () => []
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
	loading: {
		type: Boolean,
		default: false
	},
	checkbox: {
		type: Boolean,
		default: false
	},
	hasIndex: {
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
		type: Number,
		default: 1
	}
})

watch(() => props.selected, (value:any) => {
	checkedArray.value = value
})
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
		// if (item.value in data) {
		// 	element[item.value] = data[item.value]
		// } else {
		// 	element[item.value] = 'N/A'
		// }
	})

	return element
}

</script>
