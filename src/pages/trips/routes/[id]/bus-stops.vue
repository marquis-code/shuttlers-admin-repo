<template>
	<main class="relative">
		<button v-if="!loading_path && !fetching_busstops" class="bg-green7 text-white border-2 border-black text-sm px-2 py-1 rounded absolute top-4 left-[240px] z-40"
			@click="can_click = !can_click"
		>
			{{ can_click ? 'Adding' : 'Add' }} Busstop
		</button>
		<section class="w-[220px] h-screen space-y-3 absolute   z-50 bg-gray-100">
			<div class="w-full">
				<input v-model="search" class="border py-3 rounded-md w-full pl-3 text-sm outline-none" placeholder="Filter Bus Stop in route">
			</div>
			<div v-if="!fetching_busstops" class="h-full overflow-auto bg-white">
				<div v-for="(itm, idx) in filteredBusstop" :key="idx" class="flex items-center justify-between px-3 py-3.5 border-b cursor-pointer hover:bg-gray-200"
					:class="[toShowIndex.includes(itm.id) ? 'bg-dark' : 'bg-transparent']" @click="handleMarkerClicked(itm.id)"
				>
					<p class="text-xs text-blue-500">
						{{ itm.name }}
					</p>
					<ButtonIconDropdown class-name="w-fit min-w-[120px]" :children="dropdownChildren" :data="itm" />
				</div>
			</div>
			<Skeleton v-else height="500px" />
		</section>
		<!-- <MapDisplay height="670px" class="" /> -->
		<GMapMap v-if="!loading_path && !fetching_busstops" ref="myMapRef" map-type-id="terrain" class="h-screen"
			:options="{
				zoomControl: true,
				mapTypeControl: false,
				scaleControl: true,
				streetViewControl: false,
				rotateControl: false,
				fullscreenControl: false
			}"
			:center="center" :zoom="13" @click="handleMapClick"
		>
			<GMapPolyline ref="polyline" :path="path" />
			<GMapInfoWindow v-if="open_new_busstop_window" :options="infoWindowOptions" :opened="open_new_busstop_window"
				:position="{
					lat: new_busstop_position.lat,
					lng: new_busstop_position.lng
				}"
				@closeclick="open_new_busstop_window = false"
			>
				<div class="flex flex-col gap-2">
					<p class="text-sm">
						New bus stop
					</p>
					<ModulesRoutesBusstopNewBusStopInMap :position="new_busstop_position" />
				</div>
			</GMapInfoWindow>
			<GMapMarker v-for="(n, index) in busstopsList" :key="index"
				:position="{
					lat: n.geometry.y,
					lng: n.geometry.x,
				}"
				:clickable="true"
				@click="handleMarkerClicked(n.id)"
			>
				<GMapInfoWindow v-if="index === 0" :options="infoWindowOptions" :opened="toShowIndex.includes(n.id)" @closeclick="closeInfoWindow(n.id)">
					<div>
						<h4 class="text-base font-bold text-dark">
							Starting Point
						</h4>
						<p class="text-sm mb-2">
							{{ routeDetails.pickup }}
						</p>
						<ModulesRoutesBusstopEditBusStopInMap :bus-stop="n" :disable-check-box="true" />
					</div>
				</GMapInfoWindow>
				<GMapInfoWindow v-if="index === busstopsList.length - 1" :options="infoWindowOptions" :opened="toShowIndex.includes(n.id)" @closeclick="closeInfoWindow(n.id)">
					<div>
						<h4>Ending Point</h4>
						<p class="text-sm mb-2">
							{{ routeDetails.destination }}
						</p>
						<ModulesRoutesBusstopEditBusStopInMap :bus-stop="n" :disable-check-box="true" />
					</div>
				</GMapInfoWindow>
				<GMapInfoWindow v-if="index !== 0 && index !== busstopsList.length - 1" :options="infoWindowOptions" :opened="toShowIndex.includes(n.id)" @closeclick="closeInfoWindow(n.id)">
					<div class="flex flex-col gap-2">
						<p class="text-sm">
							{{ n.name }}
						</p>
						<ModulesRoutesBusstopEditBusStopInMap :bus-stop="n" />
					</div>
				</GMapInfoWindow>
			</GMapMarker>
		</GMapMap>
	</main>
</template>
<script setup lang="ts">
import { useRouteBustopMap } from '@/composables/modules/routes/bus-stop'

const { fetching_busstops, busstopsList, getRouteBusstopsById, loading: loading_path, path, getRouteGeometry, center, routeDetails, initDeleteBusstop, new_busstop_position, open_new_busstop_window, can_click } = useRouteBustopMap()
const id = useRoute().params.id as string
getRouteGeometry(id)
getRouteBusstopsById(id)

const toShowIndex = ref([]) as Ref<number[]>
const search = ref('')
const myMapRef = ref()

const handleMarkerClicked = (id: number) => {
	toShowIndex.value.push(id)
}

const closeInfoWindow = (id: number) => {
	const idx = toShowIndex.value.indexOf(id)
	toShowIndex.value.splice(idx, 1)
}

const filteredBusstop = computed(() => {
	return busstopsList.value.filter((el) => el.name.toLowerCase().includes(search.value.toLowerCase()))
})

const infoWindowOptions = {
	// pixelOffset: {
	// 	width: 10,
	// 	height: 0
	// },
	maxWidth: 320
	// maxHeight: 320
}

const editItem = (data: Record<string, any>) => {
	toShowIndex.value = []
	toShowIndex.value.push(data.id)
}

const dropdownChildren = computed(() => [
	{ name: 'Edit', func: (data:any) => { editItem(data) } },
	{ name: 'Delete', func: (data:any) => initDeleteBusstop(data), class: '!text-red' }
])

const handleMapClick = (event: any) => {
	if (!can_click.value) return
	new_busstop_position.value = { lat: event.latLng.lat(), lng: event.latLng.lng() }
	open_new_busstop_window.value = true
}

definePageMeta({
    layout: 'dashboard-zero',
    middleware: ['is-authenticated']
})
</script>
