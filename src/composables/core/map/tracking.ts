import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import { UserCoordinate, Coordinate } from './types'
import { busMarker } from './svg_icon'
import { loadPolyline, map, getPathFromPolyline, loadBusstops } from './index'
import { getRouteById, getRouteBusstopsById } from '@/composables/modules/routes/create'
import { getTripByDriverId } from '@/composables/modules/tracking/vehicle/fetch'

const markersArray: L.Marker[] = []
let openPopup: L.Popup | null = null
let bounds: L.LatLngBounds | null = null
const activeVehicleDriver_id = ref<string | null>()

const animateMarkerTo = (marker: L.Marker, newPosition: L.LatLng) => {
    if (!marker) return

    const startPos = marker.getLatLng()
    const startTime = Date.now()
    const duration = 1000

    function animate() {
        const elapsedTime = Date.now() - startTime
        if (elapsedTime < duration) {
            const ratio = elapsedTime / duration
            const newLat = startPos.lat + (newPosition.lat - startPos.lat) * ratio
            const newLng = startPos.lng + (newPosition.lng - startPos.lng) * ratio
            marker.setLatLng([newLat, newLng])
            requestAnimationFrame(animate)
        } else {
            marker.setLatLng(newPosition)
        }
    }

    animate()
}

export const loadMarkeronMap = async (location: UserCoordinate, clickFunc: (location: UserCoordinate) => void, imgString = '/user.svg', direction = 0) => {
    if (!bounds) {
        bounds = L.latLngBounds([])
    }

    while (!map) {
        await new Promise((resolve) => setTimeout(resolve, 100))
    }

    const existingMarker = markersArray.find((marker: any) => marker.options.id === location.id)
    if (existingMarker) {
        if (Number(existingMarker.options.id) === Number(activeVehicleDriver_id.value)) {
            map.panTo(existingMarker.getLatLng())
            animateMarkerTo(existingMarker, L.latLng(location.lat, location.lng))
            existingMarker.setIcon(L.icon({
                iconUrl: busMarker(direction, 'green'),
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34]
            }))
        } else {
            animateMarkerTo(existingMarker, L.latLng(location.lat, location.lng))
            existingMarker.setIcon(L.icon({
                iconUrl: busMarker(direction),
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34]
            }))
        }

        bounds.extend(existingMarker.getLatLng())
    } else {
        const marker = L.marker([location.lat, location.lng], {
            icon: L.icon({
                iconUrl: busMarker(direction),
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34]
            }),
            rotationAngle: direction,
            id: location.id
        }).addTo(map)

        const popupContent = `
            <div class="flex flex-col gap-4">
                <span class="flex gap-2.5 items-center">
                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <!-- SVG path data -->
                    </svg>
                    <span>${getTripByDriverId(location.id)?.vehicle?.registration_number}</span>
                </span>
                <span class="flex gap-2.5 items-center">
                    <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <!-- SVG path data -->
                    </svg>
                    <span>${getTripByDriverId(location.id)?.passengers_count} Passengers</span>
                </span>
            </div>
        `

        marker.bindPopup(popupContent)

        marker.on('click', () => {
            if (openPopup) {
                openPopup.close()
            }
            openPopup = marker.getPopup()
            marker.openPopup()
            clickFunc(location)
        })

        markersArray.push(marker)
        bounds.extend(marker.getLatLng())
        if (!activeVehicleDriver_id.value) {
            map.fitBounds(bounds)
        }
    }
}

export const useLoadMarkerOnMap = () => {
    const fetchRouteLoading = ref(false)
    const zoomMapInOnCoordinate = async (location: Coordinate) => {
        map.setView([location.lat, location.lng], 15)
    }
    const VehicleMarkerExist = (id: string) => {
        return markersArray.find((marker: any) => Number(marker.options.id) === Number(id))
    }

    const setActiveTrip = async (id: string) => {
        activeVehicleDriver_id.value = id

        fetchRouteLoading.value = true
        const trip = getTripByDriverId(id)
        const route = await getRouteById(trip?.route_id)
        const poly = await getPathFromPolyline(JSON.stringify(route.data.overview_polyline)) as L.LatLng[]
        loadPolyline(poly)
        const busstops = await getRouteBusstopsById(trip?.route_id)
        loadBusstops(busstops.data.data)
        fetchRouteLoading.value = false
    }

    return {
        zoomMapInOnCoordinate, VehicleMarkerExist, setActiveTrip, activeVehicleDriver_id, fetchRouteLoading
    }
}
