import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import polyline from '@mapbox/polyline'
import { Coordinate } from './types'

export let map: L.Map

export const loading = ref(false)

export const calculateCenterAndZoom = async (
  coord1: Coordinate,
  coord2: Coordinate
) => {
  loading.value = true

  // Create a polyline between the two points
  const polyline = L.polyline([
    [coord1.lat, coord1.lng],
    [coord2.lat, coord2.lng]
  ], {
    color: '#000000',
    weight: 3,
    opacity: 1
  }).addTo(map)

  // Fit the map to the polyline
  map.fitBounds(polyline.getBounds())

  loading.value = false
}

export const initMap = async (mapDiv: Ref, mapId: string | null = null) => {
  if (!mapDiv.value) return

  map = L.map(mapDiv.value as HTMLElement).setView([6.447809299999999, 3.4723495], 16)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map)
}

export const getPathFromPolyline = async (encodedPolyline: string) => {
  try {
    // Parse the encoded polyline string
    const decodedCoords = polyline.decode(encodedPolyline)

    // Convert the decoded coordinates to Leaflet LatLng objects
    const path = decodedCoords.map((coord) => L.latLng(coord[0], coord[1]))

    return path
  } catch (error) {
    console.error('Error decoding polyline:', error)
    return []
  }
}

let currentPolyline: L.Polyline | null = null
let currentStartMarker: L.Marker | null = null
let currentEndMarker: L.Marker | null = null

export const loadPolyline = async (pathLine: L.LatLng[]): Promise<void> => {
  // Clear existing polyline
  if (currentPolyline) {
    map.removeLayer(currentPolyline)
    currentPolyline = null
  }

  // Clear existing markers
  if (currentStartMarker) {
    map.removeLayer(currentStartMarker)
    currentStartMarker = null
  }
  if (currentEndMarker) {
    map.removeLayer(currentEndMarker)
    currentEndMarker = null
  }

  // Create new polyline
  currentPolyline = L.polyline(pathLine, {
    color: '#4848ED',
    weight: 3,
    opacity: 1
  }).addTo(map)

  // Create a new start marker
  currentStartMarker = L.marker(pathLine[0], {
    icon: L.icon({
      iconUrl: '/pickup.svg',
      iconSize: [25, 41],
      iconAnchor: [12, 41]
    })
  }).addTo(map)

  // Create a new end marker
  currentEndMarker = L.marker(pathLine[pathLine.length - 1], {
    icon: L.icon({
      iconUrl: '/dropoff.svg',
      iconSize: [25, 41],
      iconAnchor: [12, 41]
    })
  }).addTo(map)

  // Fit map to polyline
  map.fitBounds(currentPolyline.getBounds())
}

let busStopMarkers: L.Marker[] = []
let infoWindow: L.Popup

export const loadBusstops = async (stops: Record<string, any>[]): Promise<void> => {
  busStopMarkers.forEach((marker) => map.removeLayer(marker))
  busStopMarkers = []

  stops.forEach((stop) => {
    const marker = L.marker([stop.geometry.y, stop.geometry.x], {
      icon: L.icon({
        iconUrl: '/busstop.svg',
        iconSize: [25, 41],
        iconAnchor: [12, 41]
      })
    }).addTo(map)

    marker.bindPopup(`<div style="min-width: 150px; text-align: center;">${stop.name}</div>`)

    busStopMarkers.push(marker)
  })
}

export const addPointOnMap = async (location: Coordinate) => {
  if (!map) return
  if (!location.lat) return

  L.marker([location.lat, location.lng]).addTo(map)
  map.setView([location.lat, location.lng])
}
