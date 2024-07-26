import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapProvider, LatLng } from '../index'
import { Coordinate } from '../../types'

export class OsmMap implements MapProvider {
    private map: L.Map | null = null
    private currentPolyline: L.Polyline | null = null
    private currentStartMarker: L.Marker | null = null
    private currentEndMarker: L.Marker | null = null
    private busStopMarkers: L.Marker[] = []

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
}
