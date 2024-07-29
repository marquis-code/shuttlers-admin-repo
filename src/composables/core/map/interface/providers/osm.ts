import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapProvider, LatLng } from '../index'
import { Coordinate, UserCoordinate } from '../../types'
import { busMarker } from '../../svg_icon'
import { getRouteById, getRouteBusstopsById } from '@/composables/modules/routes/create'
import { getTripByDriverId } from '@/composables/modules/tracking/vehicle/fetch'

export class OsmMap implements MapProvider {
    private map: L.Map | null = null
    private currentPolyline: L.Polyline | null = null
    private currentStartMarker: L.Marker | null = null
    private currentEndMarker: L.Marker | null = null
    private busStopMarkers: L.Marker[] = []
    private markersArray: L.Marker[] = []
    private bounds: L.LatLngBounds | null = null
    private activeVehicleDriver_id = ref<string | null>(null)
    private fetchRouteLoading = ref(false)

    async initMap(mapDiv: Ref<HTMLElement | null>, mapId?: string): Promise<void> {
        if (!mapDiv.value) return
        this.map = L.map(mapDiv.value).setView([6.447809299999999, 3.4723495], 16)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map)
    }

    async calculateCenterAndZoom(coord1: Coordinate, coord2: Coordinate): Promise<void> {
        if (!this.map) return
        const polyline = L.polyline([
            [coord1.lat, coord1.lng],
            [coord2.lat, coord2.lng]
        ], {
            color: '#000000',
            weight: 3,
            opacity: 1
        }).addTo(this.map)
        this.map.fitBounds(polyline.getBounds())
    }

    async loadPolyline(pathLine: LatLng[]): Promise<void> {
        if (!this.map) return

        // Clear existing polyline and markers
        if (this.currentPolyline) {
            this.map.removeLayer(this.currentPolyline)
        }
        if (this.currentStartMarker) {
            this.map.removeLayer(this.currentStartMarker)
        }
        if (this.currentEndMarker) {
            this.map.removeLayer(this.currentEndMarker)
        }

        this.currentPolyline = L.polyline(pathLine, {
            color: '#4848ED',
            weight: 3,
            opacity: 1
        }).addTo(this.map)

        this.currentStartMarker = L.marker(pathLine[0], {
            icon: L.icon({
                iconUrl: '/pickup.svg',
                iconSize: [25, 41],
                iconAnchor: [12, 41]
            })
        }).addTo(this.map)

        this.currentEndMarker = L.marker(pathLine[pathLine.length - 1], {
            icon: L.icon({
                iconUrl: '/dropoff.svg',
                iconSize: [25, 41],
                iconAnchor: [12, 41]
            })
        }).addTo(this.map)

        this.map.fitBounds(this.currentPolyline.getBounds())
    }

    async loadBusstops(stops: Record<string, any>[]): Promise<void> {
        if (!this.map) return

        this.busStopMarkers.forEach((marker) => this.map!.removeLayer(marker))
        this.busStopMarkers = []

        stops.forEach((stop) => {
            const marker = L.marker([stop.geometry.y, stop.geometry.x], {
                icon: L.icon({
                    iconUrl: '/busstop.svg',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41]
                })
            }).addTo(this.map!)

            marker.bindPopup(`<div style="min-width: 150px; text-align: center;">${stop.name}</div>`)
            this.busStopMarkers.push(marker)
        })
    }

    async addPointOnMap(location: Coordinate): Promise<void> {
        if (!this.map) return
        L.marker([location.lat, location.lng]).addTo(this.map)
        this.map.setView([location.lat, location.lng])
    }

    async loadMarkerOnMap(location: UserCoordinate, clickFunc: (location: UserCoordinate) => void, imgString = '/user.svg', direction = 0): Promise<void> {
    if (!this.map) return

    if (!this.bounds) {
      this.bounds = L.latLngBounds([])
    }

    const existingMarker = this.markersArray.find((marker: any) => marker.options.id === location.id)
    if (existingMarker) {
      if (Number(existingMarker.options.id) === Number(this.activeVehicleDriver_id.value)) {
        this.map.panTo(existingMarker.getLatLng())
        existingMarker.setLatLng(location)
        existingMarker.setIcon(L.icon({
          iconUrl: busMarker(direction, 'green'),
          iconSize: [25, 41],
          iconAnchor: [12, 41]
        }))
      } else {
        existingMarker.setLatLng(location)
        existingMarker.setIcon(L.icon({
          iconUrl: busMarker(direction),
          iconSize: [25, 41],
          iconAnchor: [12, 41]
        }))
      }

      this.bounds.extend(existingMarker.getLatLng())
    } else {
      const marker = L.marker(location, {
        icon: L.icon({
          iconUrl: busMarker(direction),
          iconSize: [25, 41],
          iconAnchor: [12, 41]
        }),
        // @ts-ignore
        id: location.id
      }).addTo(this.map)

      const popupContent = `
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

      marker.bindPopup(popupContent)
      marker.on('click', () => {
        clickFunc(location)
      })

      this.markersArray.push(marker)
      this.bounds.extend(marker.getLatLng())

      if (!this.activeVehicleDriver_id.value) {
        this.map.fitBounds(this.bounds)
      }
    }
    }

     async zoomMapInOnCoordinate(location: Coordinate): Promise<void> {
    if (!this.map) return
    this.map.setView(location, 15)
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

      private async getPathFromPolyline(encodedPolyline: string): Promise<LatLng[]> {
    // Implement polyline decoding for OSM
    // You might need to use a library like @mapbox/polyline for this
    // This is a placeholder implementation
    return []
  }
}
