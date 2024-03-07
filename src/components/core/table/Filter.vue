<template>
	<header class="w-full ">
		<div class="space-y-4 md:space-y-0 md:flex justify-between w-full px-4 py-1 bg-white border-t border-x rounded-t-md">
			<form v-if="filterType.showSearchBar" class="relative flex gap-3" autocomplete="off" @submit.prevent="">
				<MagnifyingGlassIcon class="absolute w-4 text-gray-400 top-[20px]" aria-hidden="true" />
				<input v-model="filterData.search.value" type="text" placeholder="search" autocomplete="off" class="input-field !bg-transparent border-none outline-none  text-start w-auto !pl-6">
			</form>

			<section v-if="filterType.showDatePicker || filterType.showDateRange" class="flex gap-4 w-auto">
				<div v-if="filterType.showDatePicker" class="pt-2">
					<InputDateInput v-model="filterData.dateSelected.value" style="width: 100%" class="font-light w-full" placeholder="Filter by date" :type="filterType.dateType" :format="filterType.dateFormat" />
				</div>
				<div v-if="filterType.showDateRange" class="pt-2">
					<InputDateInput v-model="filterData.dateRange.value" class="w-full" range placeholder="Filter by date" :disabled-date="()=>null" :type="filterType.dateType" :format="filterType.dateFormat" clearable />
				</div>
			</section>

			<section v-if="filterType.showStatus" class="flex items-center space-x-6">
				<div class="flex items-center justify-center gap-2">
					<input id="status_active" v-model="filterData.status.value" type="radio" name="status" value="1">
					<label for="status_active">Active</label>
				</div>
				<div class="flex items-center justify-center gap-2">
					<input id="status_inactive" v-model="filterData.status.value" type="radio" name="status" value="0">
					<label for="status_inactive">Inactive</label>
				</div>
			</section>

			<section class="flex items-center flex-row-reverse gap-4">
				<button v-if="filterType.showDownloadButton" :disabled="loading" class="flex items-center cursor-pointer gap-x-2 disabled:cursor-not-allowed" @click="onDownload">
					<img v-if="!loading" src="@/assets/icons/source/download.svg" alt="" class="inline">
					<p class="text-xs font-medium">
						{{ loading ? 'Downloading...' : 'Download report' }}
					</p>
				</button>

				<slot name="filter_others" />
			</section>
		</div>
	</header>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import { watchDebounced } from '@vueuse/core'
import { appendObjectToCurrentURL } from '@/composables/utils/system'
import { useDownloadReport } from '@/composables/utils/csv'

const emit = defineEmits(['filter', 'download'])
const { loading } = useDownloadReport()

const onDownload = () => {
	loading.value = true
	emit('download')
}

const handleSearch = () => {

}

type FilterKeys = 'type' | 'value'
const onFilter = (data: Record<FilterKeys, string | string[] | number[]>) => {
	emit('filter', data)
}

interface FilterTypeProps {
	showSearchBar?: boolean;
	showDatePicker?: boolean;
	showDownloadButton?: boolean;
	showStatus?: boolean;
	showDateRange?: boolean;
	downloading?: boolean;
	dateType?: string;
	dateFormat?: string;
}
interface DefaultValueProps {
	search?: string;
	dateSelected?: string;
	dateRange?: Array<string>;
	status?: string;
}

const props = defineProps({
	filterType: {
		type: Object as () => FilterTypeProps,
		default: () => ({
			showDatePicker: false,
			showSearchBar: true,
			showDownloadButton: false,
			showStatus: false,
			showDateRange: false,
			dateType: 'date',
			dateFormat: 'YYYY-MM-DD'
		})
	},
	defaultValue: {
		type: Object as () => DefaultValueProps,
		    default: () => ({

		})
	},
	alignEnd: {
		type: Boolean,
		required: false
	}
})

const filterData = {
	search: ref(''),
	dateSelected: ref(''),
	dateRange: ref([] as string[]),
	status: ref('')
}

watchDebounced([filterData.search, filterData.dateSelected, filterData.dateRange, filterData.status], (val) => {
	if (val[0] || val[0] === '') {
		appendObjectToCurrentURL('q', val[0])
		onFilter({ type: 'search', value: val[0] })
	}
	if (val[1]) {
		appendObjectToCurrentURL('date', val[1])
		onFilter({ type: 'date', value: val[1] })
	}
	if (val[2]) {
		appendObjectToCurrentURL('dateRange', val[2])
		onFilter({ type: 'dateRange', value: val[2] })
	}
	if (val[3]) {
		appendObjectToCurrentURL('status', val[3])
		onFilter({ type: 'status', value: val[3] })
	}
}, {
	debounce: 500
})

const convertURLParamsToObject = (() => {
	const urlParams = useRoute().query as Record<string, any>
	filterData.status.value = urlParams.status ? urlParams.status : '1' as any
	filterData.search.value = urlParams.q ? urlParams.q as string : ''
	filterData.dateSelected.value = urlParams.date ? urlParams.date as string : ''
	filterData.dateRange.value = urlParams.dateRange ? urlParams.dateRange.split(',') as string[] : []
})()

</script>

<style scoped>
label{
	@apply m-0
}
</style>
