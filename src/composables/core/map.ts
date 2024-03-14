import { Loader } from '@googlemaps/js-api-loader'

import { ref } from 'vue'
// import { insertScriptTag } from '../utils/system'

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string

export const loader = new Loader({
	apiKey: GOOGLE_MAPS_API_KEY as string,
	  libraries: ['places', 'marker', 'drawing'],
  version: 'beta'
})

let map: google.maps.Map

export const loading = ref(false)

interface Coordinate {
    lat: number;
    lng: number;
}
interface UserCoordinate {
    id: number;
    lat: number;
    lng: number;
}

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

export const initMap = async (mapDiv: Ref) => {
    const { Map } = (await loader.importLibrary(
        'maps'
    )) as google.maps.MapsLibrary

    if (!mapDiv.value) return

    map = new Map(mapDiv.value as HTMLElement, {
        zoom: 16,
        disableDefaultUI: true,
        mapId: '33d190257c86f190',
        center: { lat: 6.447809299999999, lng: 3.4723495 }
    })
}

export const loadExternalDataMarkers = async (
    dataArray: Record<string, any>[]
) => {
    const markers = [] as google.maps.Marker[]
    const { Marker } = (await google.maps.importLibrary('marker')) as google.maps.MarkerLibrary

    for (const data of dataArray) {
        const dataLocation = {
            lat: data['location.lat'],
            lng: data['location.lng']
        }
        const marker = new Marker({
            map,
            position: dataLocation,
            icon: '/shopLocation.svg'
        })
        markers.push(marker)
    }

    //    const markerCluster = new window.markerClusterer.MarkerClusterer({ markers, map })
    //  const markerCluster = new MarkerClusterer({ markers, map })
}

const rotateImage = (rotation) => {
  const img = document.querySelector('img[src="/bus.svg"]') as any
  const imgHolder = document.querySelector('img[src="https://maps.gstatic.com/mapfiles/transparent.png"]') as any
  if (img) {
    img.style.transform = `rotate(${rotation}deg)`
    imgHolder!.style.transform = `rotate(${rotation}deg)`
  }
}

const markersArray = [] as google.maps.Marker[]
export const loadMarkeronMap = async (location: UserCoordinate, clickFunc: (location: UserCoordinate) => void, imgString = '/user.svg', direction = 0) => {
    const { Marker } = (await google.maps.importLibrary('marker')) as google.maps.MarkerLibrary
    // @ts-ignore
    const existingMarker = markersArray.find((marker) => marker.id === location.id)
    if (existingMarker) {
        existingMarker.setPosition(location)
        rotateImage(direction)
    } else {
        const marker = new Marker({
            map,
            position: location,
            icon: {
                url: imgString,
                rotation: direction
            }
        }) as any

        marker.id = location.id

        marker.addListener('click', () => {
            clickFunc(location)
        })
        markersArray.push(marker)
        rotateImage(direction)
    }
}

export const getPathFromPolyline = async (overviewPolyline) => {
    if (typeof overviewPolyline !== 'string') return
    const encodedPolyline = JSON.parse(overviewPolyline)

    const { encoding } = await google.maps.importLibrary('geometry') as google.maps.GeometryLibrary
    return encoding.decodePath(encodedPolyline.points)
}

let currentPolyline = null as any

export const loadPolyline = async (pathLine: google.maps.LatLng[]) => {
    const { Polyline } = (await google.maps.importLibrary('maps')) as google.maps.MapsLibrary

    if (currentPolyline) {
        currentPolyline.setMap(null) // Step 2: Clear the existing polyline if any
    }

    const polyline = new Polyline({
        path: pathLine,
        geodesic: true,
        strokeColor: '#000000',
        strokeOpacity: 1.0,
        strokeWeight: 3.5
    })

    polyline.setMap(map)
    currentPolyline = polyline // Update the reference to the current polyline

    const bounds = new google.maps.LatLngBounds()
    pathLine.forEach((point) => bounds.extend(point))
    map.fitBounds(bounds)
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
