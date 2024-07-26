import { Loader } from '@googlemaps/js-api-loader'
import { MapProvider, LatLng } from '../index'
import { Coordinate } from '../../types'

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string

export class GoogleMaps implements MapProvider {
  private map: google.maps.Map | null = null
  private loader: Loader
  private currentPolyline: google.maps.Polyline | null = null
  private currentStartMarker: google.maps.Marker | null = null
  private currentEndMarker: google.maps.Marker | null = null
  private busStopMarkers: google.maps.Marker[] = []

  constructor() {
    this.loader = new Loader({
      apiKey: GOOGLE_MAPS_API_KEY,
      version: 'weekly',
      libraries: ['places', 'drawing', 'geometry']
    })
  }

  async initMap(mapDiv: Ref<HTMLElement | null>, mapId?: string): Promise<void> {
    if (!mapDiv.value) return
    await this.loader.load()
    const { Map } = await google.maps.importLibrary('maps') as google.maps.MapsLibrary
    this.map = new Map(mapDiv.value, {
      center: { lat: 6.447809299999999, lng: 3.4723495 },
      zoom: 16,
      mapId: mapId ?? '33d190257c86f190'
    })
  }

  async calculateCenterAndZoom(coord1: Coordinate, coord2: Coordinate): Promise<void> {
    if (!this.map) return
    const { DirectionsService, DirectionsRenderer } = await google.maps.importLibrary('routes') as google.maps.RoutesLibrary
    const directionsService = new DirectionsService()
    const directionsRenderer = new DirectionsRenderer({
      polylineOptions: {
        strokeColor: '#000000',
        strokeWeight: 3,
        strokeOpacity: 1
      }
    })
    directionsRenderer.setMap(this.map)
    const result = await directionsService.route({
      origin: `${coord1.lat},${coord1.lng}`,
      destination: `${coord2.lat},${coord2.lng}`,
      travelMode: google.maps.TravelMode.DRIVING
    })
    directionsRenderer.setDirections(result)
  }

  async loadPolyline(pathLine: LatLng[]): Promise<void> {
    if (!this.map) return
    const { Polyline } = await google.maps.importLibrary('maps') as google.maps.MapsLibrary
const { Marker } = (await google.maps.importLibrary('marker')) as google.maps.MarkerLibrary
    // Clear existing polyline and markers
    if (this.currentPolyline) {
      this.currentPolyline.setMap(null)
    }
    if (this.currentStartMarker) {
      this.currentStartMarker.setMap(null)
    }
    if (this.currentEndMarker) {
      this.currentEndMarker.setMap(null)
    }

    this.currentPolyline = new Polyline({
      path: pathLine,
      geodesic: true,
      strokeColor: '#4848ED',
      strokeOpacity: 1.0,
      strokeWeight: 3
    })
    this.currentPolyline.setMap(this.map)

    this.currentStartMarker = new Marker({
      position: pathLine[0],
      map: this.map,
      icon: '/pickup.svg'
    })

    this.currentEndMarker = new Marker({
      position: pathLine[pathLine.length - 1],
      map: this.map,
      icon: '/dropoff.svg'
    })

    const bounds = new google.maps.LatLngBounds()
    pathLine.forEach((point) => bounds.extend(point))
    this.map.fitBounds(bounds)
  }

  async loadBusstops(stops: Record<string, any>[]): Promise<void> {
    if (!this.map) return
      const { InfoWindow } = await google.maps.importLibrary('maps') as google.maps.MapsLibrary
      const { Marker } = (await google.maps.importLibrary('marker')) as google.maps.MarkerLibrary

    this.busStopMarkers.forEach((marker) => marker.setMap(null))
    this.busStopMarkers = []

    const infoWindow = new InfoWindow()

    stops.forEach((stop) => {
      const marker = new Marker({
        position: { lat: stop.geometry.y, lng: stop.geometry.x },
        map: this.map!,
        icon: '/busstop.svg'
      })

      marker.addListener('click', () => {
        infoWindow.setContent(`<div style="min-width: 150px; text-align: center;">${stop.name}</div>`)
        infoWindow.open(this.map!, marker)
      })

      this.busStopMarkers.push(marker)
    })
  }

  async addPointOnMap(location: Coordinate): Promise<void> {
    if (!this.map) return
    if (!location.lat) return
    const { Marker } = (await google.maps.importLibrary('marker')) as google.maps.MarkerLibrary

    const marker = new Marker({
        map: this.map,
        position: location
    })
      this.map.setCenter(location)
  }
}
