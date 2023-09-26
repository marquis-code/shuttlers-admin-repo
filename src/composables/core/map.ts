import { Loader } from '@googlemaps/js-api-loader'
import { insertScriptTag } from '../utils/system'

insertScriptTag

insertScriptTag(
    'https://unpkg.com/@googlemaps/markerclusterer/dist/index.min.js'
)

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string
export const loader = new Loader({
    apiKey: GOOGLE_MAPS_API_KEY,
    libraries: ['places', 'marker', 'drawing'],
    version: 'beta'
})

let map: google.maps.Map

interface Coordinate {
    lat: number;
    lng: number;
}

export const calculateCenterAndZoom = async (
    coord1: Coordinate,
    coord2: Coordinate
) => {
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

    const lineCoordinates = [
        { lat: coord1.lat, lng: coord1.lng },
        { lat: coord2.lat, lng: coord2.lng }
    ]

    // const polyline = new Polyline({
    //     path: lineCoordinates,
    //     strokeColor: '#000000',
    //     strokeOpacity: 1.0,
    //     strokeWeight: 2
    // })

    // polyline.setMap(map)
}

export const initMap = async (mapDiv: Ref) => {
    const { Map } = (await loader.importLibrary(
        'maps'
    )) as google.maps.MapsLibrary

    map = new Map(mapDiv.value as HTMLElement, {
        zoom: 14,
        disableDefaultUI: true,
        mapId: '33d190257c86f190'
    })
}

export const loadExternalDataMarkers = async (
    dataArray: Record<string, any>[],
    mapDiv: Ref
) => {
    await loader.load()
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
