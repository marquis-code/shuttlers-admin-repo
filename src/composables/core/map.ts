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
    x: number;
    y: number;
}

export const calculateCenterAndZoom = async (
    coord1: Coordinate,
    coord2: Coordinate,
    mapWidth: number, mapHeight: number
) => {
     const distanceLat = Math.abs(coord1.y - coord2.y)
  const distanceLng = Math.abs(coord1.x - coord2.x)
    const centerLatitude = (coord1.y + coord2.y) / 2
    const centerLongitude = (coord1.x + coord2.x) / 2

      const zoomLat = Math.floor(Math.log2(360 * mapHeight / (256 * distanceLat)))
  const zoomLng = Math.floor(Math.log2(360 * mapWidth / (256 * distanceLng)))
  const zoom = Math.min(zoomLat, zoomLng)

    const center = { lat: centerLatitude, lng: centerLongitude }
    const lineCoordinates = [
        { lat: coord1.y, lng: coord1.x },
        { lat: coord2.y, lng: coord2.x }
    ]

    const { Polyline } = (await loader.importLibrary('maps')) as google.maps.MapsLibrary

    map.setCenter(center)
    map.setZoom(zoom)

    const polyline = new Polyline({
        path: lineCoordinates,
        strokeColor: '#000000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    })

    polyline.setMap(map)
}

export const initMap = async (mapDiv: Ref) => {
    const { Map } = (await loader.importLibrary('maps')) as google.maps.MapsLibrary

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
    const { Marker } = (await google.maps.importLibrary(
        'marker'
    )) as google.maps.MarkerLibrary

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
