import { MapProvider, LatLng } from '../index'
import { Coordinate, UserCoordinate } from '../../types'
import { busMarker } from '../../svg_icon'
import { loader } from './utils'
import { getRouteById, getRouteBusstopsById } from '@/composables/modules/routes/create'
import { getTripByDriverId } from '@/composables/modules/tracking/vehicle/fetch'

export class GoogleMaps implements MapProvider {
  private map: google.maps.Map | null = null
  private loader: any
  private currentPolyline: google.maps.Polyline | null = null
  private currentStartMarker: google.maps.Marker | null = null
  private currentEndMarker: google.maps.Marker | null = null
  private busStopMarkers: google.maps.Marker[] = []
  private markersArray: google.maps.Marker[] = []
  private bounds: google.maps.LatLngBounds | null = null
  private activeVehicleDriver_id = ref<string | null>(null)
  private fetchRouteLoading = ref(false)

  constructor() {
    this.loader = loader
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

  async loadMarkerOnMap(location: UserCoordinate, clickFunc: (location: UserCoordinate) => void, imgString = '/user.svg', direction = 0): Promise<void> {
    if (!this.map) return

    const { Marker } = await google.maps.importLibrary('marker') as google.maps.MarkerLibrary
    const { LatLngBounds } = await google.maps.importLibrary('core') as google.maps.CoreLibrary

    if (!this.bounds) {
      this.bounds = new LatLngBounds()
    }

    const existingMarker = this.markersArray.find((marker: any) => marker.id === location.id) as any
    if (existingMarker) {
      if (Number(existingMarker.id) === Number(this.activeVehicleDriver_id.value)) {
        this.map.panTo(existingMarker.getPosition()!)
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

      this.bounds.extend(existingMarker.getPosition()!)
    } else {
      const marker = new Marker({
        map: this.map,
        position: location,
        icon: {
          url: busMarker(direction),
          rotation: direction
        }
      }) as any

      marker.id = location.id

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div class="flex flex-col gap-4">
            <span class="flex gap-2.5 items-center">
              <svg>...</svg>
              <span>${getTripByDriverId(location.id)?.vehicle?.registration_number}</span>
            </span>
            <span class="flex gap-2.5 items-center">
              <svg>...</svg>
              <span>${getTripByDriverId(location.id)?.passengers_count} Passengers</span>
            </span>
          </div>
        `
      })

      marker.addListener('click', () => {
        infoWindow.open(this.map, marker)
        clickFunc(location)
      })

      this.markersArray.push(marker)
      this.bounds.extend(marker.getPosition()!)

      if (!this.activeVehicleDriver_id.value) {
        this.map!.fitBounds(this.bounds)
      }
    }
  }

 async zoomMapInOnCoordinate(location: Coordinate): Promise<void> {
    if (!this.map) return
    this.map.setCenter(location)
    this.map.setZoom(15)
  }

async setActiveTrip(id: string): Promise<void> {
    this.activeVehicleDriver_id.value = id

    this.fetchRouteLoading.value = true
    const trip = getTripByDriverId(id)
    const route = await getRouteById(trip?.route_id)
    const poly = await this.getPathFromPolyline(JSON.stringify(route.data.overview_polyline))
    await this.loadPolyline(poly)
    const busstops = await getRouteBusstopsById(trip?.route_id)
    await this.loadBusstops(busstops.data.data)
    this.fetchRouteLoading.value = false
}

    private async getPathFromPolyline(overviewPolyline: string): Promise<any> {
      if (typeof overviewPolyline !== 'string') return
    const encodedPolyline = JSON.parse(overviewPolyline)

    const { encoding } = await google.maps.importLibrary('geometry') as google.maps.GeometryLibrary
    return encoding.decodePath(encodedPolyline.points)
  }
}
