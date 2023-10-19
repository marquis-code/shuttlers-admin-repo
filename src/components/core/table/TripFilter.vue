<template>
	<header class="w-full flex lg:flex-row flex-col items-start justify-between gap-4 z-50">
		<section class="flex w-full flex-wrap gap-4">
			<ButtonMultiSelectDropdown :children="[{name:'Exclusive', value:'E'}, {name:'Shared', value:'s'}]" title="Route type:" />
			<ButtonMultiSelectDropdown :children="[{name:'Private', value:'E'}, {name:'Public', value:'s'}]" title="Visibility:" />
			<ButtonMultiSelectDropdown :children="[{name:'6:30AM', value:'E'}, {name:'7:30AM', value:'s'}, {name:'12:00PM', value:'a'}, {name:'5:15PM', value:'b'}]" title="Start time:" />
			<ButtonMultiSelectDropdown :children="[{name:'Mini bus', value:'E'}, {name:'Mini van', value:'s'}, {name:'Sedan', value:'s'}, {name:'Bus', value:'s'}]" title="Vehicle type:" />
			<ButtonMultiSelectDropdown :children="[{name:'Lagos', value:'E'}, {name:'Abuja', value:'s'}, {name:'Ogun', value:'s'}]" title="City:" />
			<div class="btn flex font-medium outline-none items-center px-3 py-2.5 shadow-sm border border-[#D0D5DD] bg-light rounded-lg text-sm gap-3">
				<span class="text-grey5 w-full">Occupancy rate:</span>
				<label for="occupancy_from">
					<span class="text-dark">From:</span>
					<input id="occupancy_from" v-model="tripFilterData.occupancy_from.value" type="number" class="bg-neut1 px-2 w-14 h-8 rounded !outline-none  text-grey3 !ring-0" @change="()=>{}">

				</label>
				<label for="occupancy_to" class="w-auto">
					<span class="text-dark mr-2">To:</span>
					<input id="occupancy_to" v-model="tripFilterData.occupancy_to.value" type="number" class="bg-neut1 px-2 w-14 h-8 rounded !outline-none  text-grey3 !ring-0" @change="()=>{}">
				</label>
				<span>%</span>
				<button class="btn-primary" :disabled="!tripFilterData.occupancy_from.value || !tripFilterData.occupancy_to.value">
					Apply
				</button>
			</div>
		</section>

		<button class="btn-primary w-32">
			Reset all
		</button>
	</header>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import { watchDebounced } from '@vueuse/core'
import { appendObjectToCurrentURL } from '@/composables/utils/system'

const emit = defineEmits(['filter'])

const tripFilterData = {
occupancy_from: ref(0),
occupancy_to: ref(0)
}

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
