<template>
	<header class="w-full flex lg:flex-row flex-col items-start justify-between gap-4 z-50">
		<section class="flex w-full flex-wrap gap-4">
			<ButtonMultiSelectDropdown v-model="filterData.routeType.value" :children="[{ name: 'Exclusive', value: 'exclusive' }, { name: 'Shared', value: 'shared' }]" title="Route type:" />
			<ButtonMultiSelectDropdown v-model="filterData.visibility.value" :children="[{ name: 'Private', value: 'private' }, { name: 'Public', value: 'public' }]" title="Visibility:" />
			<ButtonMultiSelectDropdown v-model="filterData.startTime.value" :children="formattedTripTime" :loading="loadingTripTime" title="Start time:" />
			<ButtonMultiSelectDropdown v-model="filterData.vehicleType.value" :children="formattedVehicle" :loading="loadingVehicleTypes" title="Vehicle type:" />
			<ButtonMultiSelectDropdown v-model="filterData.city.value" :children="formattedCities" :loading="loading" title="City:" />
			<div class="btn flex font-medium outline-none items-center px-3 py-2.5 shadow-sm border border-[#D0D5DD] bg-light rounded-lg text-sm gap-3">
				<span class="text-grey5 w-full">Occupancy rate:</span>
				<label for="occupancy_from">
					<span class="text-dark">From:</span>
					<input id="occupancy_from" v-model="filterData.occupancy_from.value" type="number" class="bg-neut1 px-2 w-14 h-8 rounded !outline-none  text-grey3 !ring-0">

				</label>
				<label for="occupancy_to" class="w-auto">
					<span class="text-dark mr-2">To:</span>
					<input id="occupancy_to" v-model="filterData.occupancy_to.value" type="number" class="bg-neut1 px-2 w-14 h-8 rounded !outline-none  text-grey3 !ring-0">
				</label>
				<span>%</span>
				<button class="btn-primary" @click="emitOccupancy">
					Apply
				</button>
			</div>
		</section>

		<button class="btn-primary w-32" @click="resetData">
			Reset all
		</button>
	</header>
</template>

<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import { appendObjectToCurrentURL } from '@/composables/utils/system'
import { useVehicleTypesList } from '@/composables/modules/configure/fetch'
import { use_user_city } from '@/composables/auth/register'
import { useGetTripTime } from '@/composables/modules/routes/fetch'

const { getTripTime, loadingTripTime, tripTimeList } = useGetTripTime()
const { getVehicleTypesList, vehicleTypesList, loadingVehicleTypes } = useVehicleTypesList()
const { cityArray, fetchCities, loading } = use_user_city()
getVehicleTypesList()
fetchCities()
getTripTime()

const formattedVehicle = computed(() =>
	vehicleTypesList.value.map((i: any) => {
		return {
			name: i.name,
			value: i.name
		}
	})
)

const formattedTripTime = computed(() =>
	tripTimeList.value.map((i: any) => {
		return {
			name: i,
			value: i
		}
	})
)

const formattedCities = computed(() =>
	cityArray.value.map((i: any) => {
		return {
			name: i.name,
			value: i.city_id
		}
	})
)

const emit = defineEmits(['filter'])

type FilterKeys = 'type' | 'value'

const onFilter = (data: Record<FilterKeys, string | string[] | number[]>) => {
	emit('filter', data)
}

interface DefaultValueProps {
	routeType?: Array<string>;
	visibility?: Array<string>;
	startTime?: Array<string>;
	vehicleType?: Array<string>;
	city?: Array<string>;

}

const props = defineProps({
	defaultValue: {
		type: Object as () => DefaultValueProps,
		default: () => ({

		})
	}
})

const filterData = {
	routeType: ref([]),
	visibility: ref([]),
	startTime: ref([]),
	vehicleType: ref([]),
	city: ref([]),
	occupancy_from: ref(0),
	occupancy_to: ref(100)
}

const emitOccupancy = () => {
	// if (filterData.occupancy_from.value && filterData.occupancy_to.value) {
		appendObjectToCurrentURL('occupancy_from', JSON.stringify(filterData.occupancy_from.value))
		appendObjectToCurrentURL('occupancy_to', JSON.stringify(filterData.occupancy_to.value))
		onFilter({ type: 'occupancy', value: [filterData.occupancy_from.value, filterData.occupancy_to.value] })
	// }
}

const resetData = () => {
	filterData.routeType.value = []
	filterData.visibility.value = []
	filterData.startTime.value = []
	filterData.vehicleType.value = []
	filterData.city.value = []
	filterData.occupancy_from.value = 0
	filterData.occupancy_to.value = 100
	emitOccupancy()
}
watchDebounced([filterData.routeType, filterData.visibility, filterData.startTime, filterData.vehicleType, filterData.city], (val: any[]) => {
	if (val[0]) {
		appendObjectToCurrentURL('routeType', JSON.stringify(val[0]))
		onFilter({ type: 'routeType', value: val[0] })
	}
	if (val[1]) {
		appendObjectToCurrentURL('visibility', JSON.stringify(val[1]))
		onFilter({ type: 'visibility', value: val[1] })
	}
	if (val[2]) {
		appendObjectToCurrentURL('startTime', JSON.stringify(val[2]))
		onFilter({ type: 'startTime', value: val[2] })
	}
	if (val[3]) {
		appendObjectToCurrentURL('vehicleType', JSON.stringify((val[3])))
		onFilter({ type: 'vehicleType', value: val[3] })
	}
	if (val[4]) {
		appendObjectToCurrentURL('city', JSON.stringify(val[4]))
		onFilter({ type: 'city', value: val[4] })
	}
}, {
	debounce: 700
})

const convertURLParamsToObject = (() => {
	const urlParams = useRoute().query
	filterData.routeType.value = urlParams.routeType as string ? JSON.parse(urlParams.routeType as string) : [] as string[]
	filterData.visibility.value = urlParams.visibility as string ? JSON.parse(urlParams.visibility as string) : [] as string[]
	filterData.startTime.value = urlParams.startTime as string ? JSON.parse(urlParams.startTime as string) : [] as string[]
	filterData.vehicleType.value = urlParams.vehicleType as string ? JSON.parse(urlParams.vehicleType as string) : [] as string[]
	filterData.city.value = urlParams.city as string ? JSON.parse(urlParams.city as string) : [] as string[]
	filterData.occupancy_from.value = urlParams.occupancy_from as string ? JSON.parse(urlParams.occupancy_from as string) : 0
	filterData.occupancy_to.value = urlParams.occupancy_to as string ? JSON.parse(urlParams.occupancy_to as string) : 100
	emitOccupancy()
})()

</script>

<style scoped>
label {
	@apply m-0
}
</style>
