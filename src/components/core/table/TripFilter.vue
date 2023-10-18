<template>
	<header class="w-full ">
		<ButtonMultiSelectDropdown :children="[{name:'Exclusive', value:'E'}, {name:'Shared', value:'s'}]" />
	</header>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import { watchDebounced } from '@vueuse/core'
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
