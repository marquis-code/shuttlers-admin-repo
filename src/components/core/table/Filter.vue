<template>
	<header class="w-full">
		<div class="flex justify-between w-full px-4 bg-white border-t border-x rounded-t-md">
			<section v-if="filterType.showSearchBar" class="relative flex gap-3">
				<MagnifyingGlassIcon class="absolute w-4 text-gray-400 top-[18px]" aria-hidden="true" />
				<input v-model="filterData.search.value" type="search" placeholder="search" class="input-field !bg-transparent  outline-none  text-start w-full !pl-6">
			</section>

			<section v-if="filterType.showDatePicker || filterType.showDateRange" class="flex gap-4">
				<div v-if="filterType.showDatePicker" class="pt-2">
					<date-picker v-model:value="filterData.dateSelected" class="font-light" placeholder="Filter by date" />
				</div>
				<div v-if="filterType.showDateRange" class="pt-2">
					<date-picker v-model:value="filterData.dateRange" range />
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

			<button v-if="filterType.showDownloadButton" class="flex items-center cursor-pointer gap-x-2" @click="onFilter({type:'download', value:null})">
				<img src="@/assets/icons/source/download.svg" alt="" class="inline">
				<p class="text-xs font-medium">
					Download report
				</p>
			</button>
		</div>
	</header>
</template>

<script setup lang="ts">
// import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import { appendObjectToCurrentURL } from '@/composables/utils/system'

const emit = defineEmits(['filter'])

type FilterKeys = 'type' | 'value'
const onFilter = (data: Record<FilterKeys, string>) => {
	emit('filter', data)
}

interface FilterTypeProps {
  showSearchBar?: boolean;
  showDatePicker?: boolean;
  showDownloadButton?: boolean;
  showStatus?: boolean;
  showDateRange?: boolean;
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
      showDateRange: false
    })
	},
	defaultValue: {
		type: Object as () => DefaultValueProps,
		    default: () => ({

    })
  }
})

const filterData = {
	search: ref(''),
	dateSelected: ref(''),
	dateRange: ref(''),
	status: ref('')
}

watch([filterData.search, filterData.dateSelected, filterData.dateRange, filterData.status], (val) => {
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
})

const convertURLParamsToObject = (() => {
	const urlParams = useRoute().query
	filterData.status.value = urlParams.status ? urlParams.status : '1' as any
	filterData.search.value = urlParams.q ? urlParams.q as string : ''
	filterData.dateSelected.value = urlParams.date ? urlParams.date as string : ''
	filterData.dateRange.value = urlParams.dateRange ? urlParams.dateRange as string : ''
})()

</script>

<style scoped>
label{
	@apply m-0
}
</style>
