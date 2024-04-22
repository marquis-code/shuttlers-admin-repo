import { UserCoordinate, Coordinate } from './types'
import { busMarker } from './svg_icon'
import { loadPolyline, map, getPathFromPolyline } from './index'
import { getRouteById } from '@/composables/modules/routes/create'
import { getTripByDriverId } from '@/composables/modules/tracking/vehicle/fetch'

const markersArray: google.maps.Marker[] = []
let openInfoWindow: google.maps.InfoWindow | null = null // Keep track of the open InfoWindow
let bounds: google.maps.LatLngBounds | null = null
const activeVehicleDriver_id = ref<string | null>()
export const loadMarkeronMap = async (location: UserCoordinate, clickFunc: (location: UserCoordinate) => void, imgString = '/user.svg', direction = 0) => {
    const { Marker, InfoWindow } = (await google.maps.importLibrary('marker')) as typeof google.maps & { MarkerLibrary: any }
    const { LatLngBounds } = await google.maps.importLibrary('core') as google.maps.CoreLibrary

    if (!bounds) {
        bounds = new LatLngBounds()
    }

    // @ts-ignore
    while (!map) {
        await new Promise((resolve) => setTimeout(resolve, 100)) // Wait for map to be initialized
    }
    // @ts-ignore
    const existingMarker = markersArray.find((marker) => marker.id === location.id) as any
    if (existingMarker) {
        if (Number(existingMarker.id) === Number(activeVehicleDriver_id.value)) {
            map.panTo(existingMarker.getPosition()!)
        existingMarker.setPosition(location)
        existingMarker.setIcon({
            url: busMarker(direction, 'green'),
            rotation: direction
        })
        } else {
        existingMarker.setPosition(location)
        existingMarker.setIcon({
            url: busMarker(direction),
            rotation: direction
        })
        }

        bounds.extend(existingMarker.getPosition()!)

        // map.fitBounds(bounds)
    } else {
        const marker = new Marker({
            map,
            position: location,
            icon: {
                url: busMarker(direction),
                rotation: direction
            }
        }) as google.maps.Marker as any

        marker.id = location.id

        // Create an InfoWindow
        const infoWindow = new google.maps.InfoWindow({
            content: `	<div class="flex flex-col gap-4">
			<span class="flex gap-2.5 items-center"><svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fill-rule="evenodd" clip-rule="evenodd" d="M12.5002 0.833496C10.7812 0.833496 9.3335 2.26693 9.3335 4.01123C9.3335 5.80301 10.8179 6.96838 11.96 7.68416L11.9686 7.68956L11.9774 7.6946C12.1366 7.78558 12.3167 7.8335 12.5002 7.8335C12.6836 7.8335 12.8638 7.78558 13.0229 7.6946L13.0306 7.6902L13.0382 7.68554C14.1867 6.97394 15.6668 5.79706 15.6668 4.01123C15.6668 2.26693 14.2191 0.833496 12.5002 0.833496ZM12.4949 2.8335C11.8535 2.8335 11.3335 3.35583 11.3335 4.00016C11.3335 4.6445 11.8535 5.16683 12.4949 5.16683H12.5054C13.1468 5.16683 13.6668 4.6445 13.6668 4.00016C13.6668 3.35583 13.1468 2.8335 12.5054 2.8335H12.4949Z" fill="#6E717C" />
				<path d="M1.3335 12.667C1.3335 11.2863 2.45278 10.167 3.8335 10.167C5.21421 10.167 6.3335 11.2863 6.3335 12.667C6.3335 14.0477 5.21421 15.167 3.8335 15.167C2.45278 15.167 1.3335 14.0477 1.3335 12.667Z" fill="#6E717C" />
				<path fill-rule="evenodd" clip-rule="evenodd" d="M3.8335 6.66667C3.8335 5.1012 5.27676 4 6.8335 4H7.8335C8.20169 4 8.50016 4.29848 8.50016 4.66667C8.50016 5.03486 8.20169 5.33333 7.8335 5.33333H6.8335C5.81291 5.33333 5.16683 6.023 5.16683 6.66667C5.16683 7.31034 5.81291 8 6.8335 8H8.8335C10.3902 8 11.8335 9.1012 11.8335 10.6667C11.8335 12.2321 10.3902 13.3333 8.8335 13.3333H7.8335C7.46531 13.3333 7.16683 13.0349 7.16683 12.6667C7.16683 12.2985 7.46531 12 7.8335 12H8.8335C9.85409 12 10.5002 11.3103 10.5002 10.6667C10.5002 10.023 9.85409 9.33333 8.8335 9.33333H6.8335C5.27676 9.33333 3.8335 8.23214 3.8335 6.66667Z" fill="#6E717C" />
			</svg>
            <span>${getTripByDriverId(location.id)?.vehicle?.registration_number}</span> 
				
			</span>
			<span class="flex gap-2.5 items-center">
				<svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M9.5433 9.1463C9.92338 9.35183 10.5196 9.67423 10.9275 10.0573C11.1814 10.2957 11.4441 10.6286 11.4923 11.0519C11.5445 11.51 11.3325 11.9236 10.9516 12.2717C10.3123 12.8561 9.53497 13.3332 8.52673 13.3332H3.80693C2.79869 13.3332 2.02134 12.8561 1.38203 12.2717C1.00115 11.9236 0.789135 11.51 0.841322 11.0519C0.889551 10.6286 1.15225 10.2957 1.4062 10.0573C1.81406 9.67423 2.41024 9.35185 2.79032 9.14632C2.87494 9.10056 2.94886 9.06059 3.00759 9.02704C4.94242 7.9217 7.39124 7.9217 9.32607 9.02703C9.38479 9.06058 9.45869 9.10055 9.5433 9.1463Z" fill="#6E717C" />
					<path d="M2.89795 3.91876C2.89795 2.12259 4.36141 0.666504 6.16668 0.666504C7.97194 0.666504 9.4354 2.12259 9.4354 3.91876C9.4354 5.71493 7.97194 7.17101 6.16668 7.17101C4.36141 7.17101 2.89795 5.71493 2.89795 3.91876Z" fill="#6E717C" />
					<path d="M9.68509 6.31039C9.54799 6.49381 9.47943 6.58552 9.50543 6.6763C9.53143 6.76708 9.62275 6.80856 9.80539 6.89153C10.1855 7.06418 10.6141 7.16129 11.0677 7.16129C12.6321 7.16129 13.9004 6.0059 13.9004 4.58065C13.9004 3.15539 12.6321 2 11.0677 2C10.8971 2 10.73 2.01374 10.5677 2.04007C10.3667 2.07268 10.2663 2.08898 10.2132 2.16948C10.1601 2.24998 10.1977 2.35571 10.2728 2.56717C10.4211 2.98463 10.5012 3.43003 10.5012 3.89247C10.5012 4.78895 10.2001 5.62136 9.68509 6.31039Z" fill="#6E717C" />
					<path d="M13.0953 12.6667C14.1166 12.6667 14.9109 12.2692 15.5715 11.7731C15.9629 11.4791 16.2194 11.1004 16.1575 10.6537C16.1018 10.2525 15.8042 9.95392 15.5474 9.75576C15.1267 9.43107 14.5129 9.15845 14.1261 8.98665C14.0407 8.94872 13.9664 8.91569 13.9076 8.88812C13.154 8.53433 12.3249 8.31569 11.4779 8.23222C10.9317 8.17838 10.6586 8.15146 10.5962 8.30005C10.5338 8.44865 10.777 8.60784 11.2634 8.92623C11.4481 9.04714 11.6268 9.17668 11.7836 9.31155C12.1366 9.61509 12.6542 10.1614 12.7518 10.9457C12.797 11.3092 12.7447 11.6441 12.6269 11.9466C12.4866 12.3069 12.4165 12.487 12.4771 12.5724C12.481 12.5779 12.4834 12.5809 12.4877 12.5861C12.5558 12.6667 12.7356 12.6667 13.0953 12.6667Z" fill="#6E717C" />
				</svg>
				<span>${getTripByDriverId(location.id)?.passengers_count} Passengers</span>  
			</span>
		</div>`
        })

        marker.addListener('click', () => {
            // Close the previously open InfoWindow if any
            if (openInfoWindow) {
                openInfoWindow.close()
            }
            // Open the new InfoWindow
            infoWindow.open(map, marker)
            openInfoWindow = infoWindow // Update the currently open InfoWindow
            clickFunc(location) // Additional functionality can be called here
        })

        markersArray.push(marker)
        bounds.extend(marker.getPosition()!)
        if (!activeVehicleDriver_id.value) {
            map.fitBounds(bounds)
        }
    }
}

export const useLoadMarkerOnMap = () => {
    const fetchRouteLoading = ref(false)
    const zoomMapInOnCoordinate = async (location: Coordinate) => {
        map.setCenter(location)
        map.setZoom(15)
    }
    const VehicleMarkerExist = (id: string) => {
        return markersArray.find((marker: any) => Number(marker!.id) === Number(id))
    }

    const setActiveTrip = async (id: string) => {
        activeVehicleDriver_id.value = id

        fetchRouteLoading.value = true
        const trip = getTripByDriverId(id)
        const route = await getRouteById(trip?.route_id)
        const poly = await getPathFromPolyline(JSON.stringify(route.data.overview_polyline)) as google.maps.LatLng[]
        loadPolyline(poly)
        fetchRouteLoading.value = false
    }

    return {
        zoomMapInOnCoordinate, VehicleMarkerExist, setActiveTrip, activeVehicleDriver_id, fetchRouteLoading
    }
}
