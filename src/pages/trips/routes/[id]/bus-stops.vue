<template>
	<main class="relative h-[600px] border-2 border-red">
		<section class="w-3/12 space-y-3 absolute -top-8 -left-9 z-50 bg-gray-100">
			<div class="w-full">
				<input class="border py-3 rounded-md w-full pl-3 text-sm outline-none" placeholder="Filter Bus Stop in route">
			</div>
			<div v-if="!loading" class="h-full overflow-auto bg-white">
				<div v-for="(itm, idx) in busstopsList" :key="idx" class="flex focus:bg-black items-center justify-between px-3 py-3.5 border-b cursor-pointer hover:bg-gray-200" @click="handleSelected(itm)">
					<p class="text-xs text-blue-500">
						{{ itm.name }}
					</p>
					<p><img src="@/assets/icons/source/dark-more.svg" alt=""></p>
				</div>
			</div>
			<Skeleton v-else height="500px" />
		</section>
		<!-- <MapDisplay height="670px" class="" /> -->
		<!-- <GMapMap
			:center="{lat: 51.093048, lng: 6.842120}"
			:zoom="7"
			map-type-id="terrain"
			style="width: 100vw; height: 900px"
		/> -->
		<GMapMap
			:center="center"
			:zoom="13"
			map-type-id="terrain"
			style="width: 100vw; height: 600px;"
		>
			<GMapPolyline ref="polyline" :path="path" />
			<GMapMarker v-for="(n, index) in busstopsList" :key="index"
				:position="{
					lat: n.geometry.y,
					lng: n.geometry.x,
				}"
				:clickable="true"
				@click="handleMarkerClicked(index)"
			>
				<GMapInfoWindow v-if="index === 0" :options="infoWindowOptions" :opened="toShowIndex.includes(index)" @closeclick="closeInfoWindow(index)">
					<div>
						<h4 class="text-base font-bold text-dark">Starting Point</h4>
						<p class="text-sm mb-2">{{ routeDetails.pickup }}</p>
						<ModulesRoutesBusstopEditBusStopInMap :bus-stop="n" />
					</div>
				</GMapInfoWindow>
				<GMapInfoWindow v-if="index === busstopsList.length - 1" :options="infoWindowOptions" :opened="toShowIndex.includes(index)" @closeclick="closeInfoWindow(index)">
					<div>
						<h4>Ending Point</h4>
						<p class="text-sm mb-2">{{ routeDetails.destination }}</p>
						<ModulesRoutesBusstopEditBusStopInMap :bus-stop="n" />
					</div>
				</GMapInfoWindow>
				<GMapInfoWindow v-if="index !== 0 && index !== busstopsList.length - 1" :options="infoWindowOptions" :opened="toShowIndex.includes(index)" @closeclick="closeInfoWindow(index)">
					<div class="flex flex-col gap-2">
						<p class="text-sm">{{ n.name }}</p>
						<ModulesRoutesBusstopEditBusStopInMap :bus-stop="n" />
					</div>
				</GMapInfoWindow>
			</GMapMarker>
		</GMapMap>
	</main>
</template>
<script setup lang="ts">

import { useRouteBusstopList } from '@/composables/modules/routes/id'
import { useRouteBustopMap } from '@/composables/modules/routes/bus-stop'
const { loading, getRouteBusstopsById, busstopsList } = useRouteBusstopList()
const { loading: loading_path, path, getRouteGeometry, center, routeDetails } = useRouteBustopMap()
const id = useRoute().params.id as string
getRouteGeometry(id)
getRouteBusstopsById(id)

const selected_start_point = ref({})
const selected_end_point = ref({})
const showPickupInfo = ref(false)
const showDestinationInfo = ref(false)
const toShowIndex = ref([]) as Ref<number[]>

const handleSelected = (itm) => {
	selected_start_point.value = itm?.geometry
}

const handleMarkerClicked = (index: number) => {
	toShowIndex.value.push(index)
	// if (index === 0) {
	// 	showPickupInfo.value = !showPickupInfo.value
	// } else if (index === busstopsList.value.length - 1) {
	// 	showDestinationInfo.value = !showDestinationInfo.value
	// }
}

const closeInfoWindow = (index: number) => {
	const idx = toShowIndex.value.indexOf(index)
	toShowIndex.value.splice(idx, 1)
}

const infoWindowOptions = {
	// pixelOffset: {
	// 	width: 10,
	// 	height: 0
	// },
	maxWidth: 320
	// maxHeight: 320
}

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
</script>
