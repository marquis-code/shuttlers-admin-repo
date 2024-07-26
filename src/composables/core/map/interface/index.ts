import { Coordinate } from '../types'
import { GoogleMaps } from './providers/google'
import { OsmMap } from './providers/osm'

export interface LatLng {
  lat: number;
  lng: number;
}

// map.interface.ts
export interface MapProvider {
  initMap(mapDiv: Ref<HTMLElement | null>, mapId?: string): Promise<void>;
  calculateCenterAndZoom(coord1: Coordinate, coord2: Coordinate): Promise<void>;
  loadPolyline(pathLine: LatLng[]): Promise<void>;
  loadBusstops(stops: Record<string, any>[]): Promise<void>;
  addPointOnMap(location: Coordinate): Promise<void>;
}

export class MapService {
  private mapProvider: MapProvider

  constructor(mapProviderType: 'osm' | 'google') {
    this.mapProvider = mapProviderType === 'osm' ? new OsmMap() : new GoogleMaps()
  }

  async initMap(mapDiv: Ref<HTMLElement | null>, mapId?: string): Promise<void> {
    await this.mapProvider.initMap(mapDiv, mapId)
  }

  async calculateCenterAndZoom(coord1: Coordinate, coord2: Coordinate): Promise<void> {
    await this.mapProvider.calculateCenterAndZoom(coord1, coord2)
  }

  async loadPolyline(pathLine: LatLng[]): Promise<void> {
    await this.mapProvider.loadPolyline(pathLine)
  }

  async loadBusstops(stops: Record<string, any>[]): Promise<void> {
    await this.mapProvider.loadBusstops(stops)
  }

  async addPointOnMap(location: Coordinate): Promise<void> {
    await this.mapProvider.addPointOnMap(location)
  }
}
