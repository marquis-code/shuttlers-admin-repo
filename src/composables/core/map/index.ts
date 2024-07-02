import { Loader } from '@googlemaps/js-api-loader'
import { Coordinate } from './types'

// import { insertScriptTag } from '../utils/system'

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string

export const loader = new Loader({
	apiKey: GOOGLE_MAPS_API_KEY as string,
	  libraries: ['places', 'marker', 'drawing'],
  version: 'beta'
})

export let map: google.maps.Map

export const loading = ref(false)

export const calculateCenterAndZoom = async (
    coord1: Coordinate,
    coord2: Coordinate
) => {
    loading.value = true
    const { DirectionsService, DirectionsRenderer } = (await google.maps.importLibrary('routes')) as google.maps.RoutesLibrary

    const polylineOptions = {
        strokeColor: '#000000',
        strokeWeight: 3,
        strokeOpacity: 1

    }
    const directionsService = new DirectionsService()
    const directionsRenderer = new DirectionsRenderer({ polylineOptions })

    const lekki = new google.maps.LatLng(6.447809299999999, 3.4723495)

    map.setCenter(lekki)
    map.setZoom(7)
    directionsRenderer.setMap(map)
    const directionData = await directionsService.route({
        origin: `${coord1.lat},${coord1.lng}`,
        destination: `${coord2.lat},${coord2.lng}`,
        travelMode: google.maps.TravelMode.DRIVING
    })

    directionsRenderer.setDirections(directionData)

    loading.value = false
}

export const initMap = async (mapDiv: Ref, mapId:string|null = null) => {
    const { Map } = (await loader.importLibrary(
        'maps'
    )) as google.maps.MapsLibrary

    if (!mapDiv.value) return

    map = new Map(mapDiv.value as HTMLElement, {
        zoom: 16,
        disableDefaultUI: true,
        mapId: mapId ?? '33d190257c86f190',
        center: { lat: 6.447809299999999, lng: 3.4723495 }
    })
}

export const getPathFromPolyline = async (overviewPolyline) => {
    if (typeof overviewPolyline !== 'string') return
    const encodedPolyline = JSON.parse(overviewPolyline)

    const { encoding } = await google.maps.importLibrary('geometry') as google.maps.GeometryLibrary
    return encoding.decodePath(encodedPolyline.points)
}

let currentPolyline: google.maps.Polyline | null = null
let currentStartMarker: google.maps.Marker | null = null
let currentEndMarker: google.maps.Marker | null = null

export const loadPolyline = async (pathLine: google.maps.LatLng[]): Promise<void> => {
    const { Polyline } = (await google.maps.importLibrary('maps')) as typeof google.maps
    const { Marker } = (await google.maps.importLibrary('marker')) as typeof google.maps & { MarkerLibrary: any }

    // Clear existing polyline
    if (currentPolyline) {
        currentPolyline.setMap(null)
        currentPolyline = null
    }

    // Clear existing markers
    if (currentStartMarker) {
        currentStartMarker.setMap(null)
        currentStartMarker = null
    }
    if (currentEndMarker) {
        currentEndMarker.setMap(null)
        currentEndMarker = null
    }

    // Create new polyline
    const polyline = new Polyline({
        path: pathLine,
        geodesic: true,
        strokeColor: '#4848ED',
        strokeOpacity: 1.0,
        strokeWeight: 3
    })

    polyline.setMap(map)
    currentPolyline = polyline // Update the reference to the current polyline

    // Create a new start marker
    currentStartMarker = new Marker({
        position: pathLine[0],
        icon: '/pickup.svg',
        map,
        title: 'Start'
    })

    // Create a new end marker
    currentEndMarker = new Marker({
        position: pathLine[pathLine.length - 1],
        icon: '/dropoff.svg',
        map,
        title: 'End'
    })

    // Fit map to polyline
    const bounds = new google.maps.LatLngBounds()
    pathLine.forEach((point) => bounds.extend(point))
    map.fitBounds(bounds)
}

let busStopMarkers: google.maps.Marker[] = []
let infoWindow: google.maps.InfoWindow

export const loadBusstops = async (stops: Record<string, any>[]): Promise<void> => {
    const { Marker } = (await google.maps.importLibrary('marker')) as google.maps.MarkerLibrary

    busStopMarkers.forEach((marker) => marker.setMap(null))
    busStopMarkers = []

    if (!infoWindow) {
        infoWindow = new google.maps.InfoWindow({
            content: ''
        })
    }

    stops.forEach((stop) => {
        const marker = new Marker({
            position: { lat: stop.geometry.y, lng: stop.geometry.x },
            icon: '/busstop.svg',
            map,
            title: stop.name
        })

         marker.addListener('click', () => {
            infoWindow.setContent(`<div style="min-width: 150px; text-align: center;">${stop.name}</div>`)
            infoWindow.open({
                anchor: marker,
                map,
                shouldFocus: false
            })
        })

         busStopMarkers.push(marker)
    })
}

export const addPointOnMap = async (location: Coordinate) => {
    if (!map) return
    if (!location.lat) return
    const { Marker } = (await google.maps.importLibrary('marker')) as google.maps.MarkerLibrary

    const marker = new Marker({
        map,
        position: location
    })
      map.setCenter(location)
}
