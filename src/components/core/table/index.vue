<template>
	<section class="flex flex-col max-w-full  z-0">
		<slot name="header" />
		<slot name="sub_header" />
		<div class="border-gray-300 border" :class="[hasOverflow ? 'overflow-auto' : '']">
			<table class="table w-full">
				<thead class="px-4">
					<tr class="h-[52px] border-b px-4">
						<th v-if="checkbox" class="pl-4 text-light">
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
						'py-8 font-normal border-t text-sm h-[89px] bg-light',
						hasOptions ? 'cursor-pointer' : '',
					]" @click="handleRowClick($event, data)">
						<td v-if="checkbox" :key="key" class="pl-4">
							<input :checked="selected.map((el:any) => el?.id).includes(data?.id)" type="checkbox" @click.stop
								@click.prevent="$emit('checked', data)">
						</td>
						<td v-if="hasIndex" class="pl-4">
							{{ (page - 1) * 10 + index + 1 }}
						</td>
						<td v-for="(value, key) of populateTable(data)" :key="key + 1" class="px-4"
							:data-label="headers[value]"
						>
							<slot name="item" :item="({ [key]: key, data, index: index } as any)">
								<span>{{ value }}</span>
							</slot>
						</td>
					</tr>
					<div :class="[!loading ? 'h-0' : 'h-16']" />
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
			<div v-if="!loading && displayTable.length <= 0" class="flex items-center justify-center py-8">
				<span class="text-gray-400 font-medium pb-8">No records available</span>
			</div>
		</div>
		<slot name="footer" class="border-t-4 border-gray-500" />
	</section>
</template>

<script lang="ts" setup>

defineEmits(['checked'])

const checkedArray = ref([] as Record<string, any>[])
const key = ref(0)

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

// watch(() => props.selected, (value: any) => {
// 	checkedArray.value = value
// })
watch(() => props.selected?.length, (value: any) => {
	key.value++
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
		return (100 / getItemsWithColWidth.value).toFixed(2)
	},
	set: () => { }
})

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
		// for (const key in data) {
		// 	if (key === item.value) {
		// 		element[key] = data[key]
		// 	}
		// }
		if (item.value in data) {
			element[item.value] = data[item.value]
		} else {
			element[item.value] = ''
		}
	})

	return element
}

const handleRowClick = (event: MouseEvent, data) => {
  if (!window.getSelection()?.toString()) {
    props.option(data)
  }
}

</script>
