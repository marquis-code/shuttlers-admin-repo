import { Coordinate, UserCoordinate } from '../types'
import { GoogleMaps } from './providers/google'
import { OsmMap } from './providers/osm'

export interface LatLng {
  lat: number;
  lng: number;
}

// map.interface.ts
export interface MapProvider {
  initMap(mapDiv: Ref<HTMLElement | null>, mapId?: string | null): Promise<void>;
  calculateCenterAndZoom(coord1: Coordinate, coord2: Coordinate): Promise<void>;
  loadPolyline(pathLine: LatLng[]): Promise<void>;
  loadBusstops(stops: Record<string, any>[]): Promise<void>;
  addPointOnMap(location: Coordinate): Promise<void>;
  loadMarkerOnMap(location: UserCoordinate, clickFunc: (location: UserCoordinate) => void, imgString?: string, direction?: number): Promise<void>;
  zoomMapInOnCoordinate(location: Coordinate): Promise<void>;
  setActiveTrip(id: string): Promise<void>;
}

export class MapService {
  private mapProvider: MapProvider

  constructor(mapProviderType: 'osm' | 'google') {
    this.mapProvider = mapProviderType === 'osm' ? new OsmMap() : new GoogleMaps()
  }

  async initMap(mapDiv: Ref<HTMLElement | null>, mapId?: string | null): Promise<void> {
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

  async loadMarkerOnMap(location: UserCoordinate, clickFunc: (location: UserCoordinate) => void, imgString = '/user.svg', direction = 0): Promise<void> {
    await this.mapProvider.loadMarkerOnMap(location, clickFunc, imgString, direction)
  }

  async zoomMapInOnCoordinate(location: Coordinate): Promise<void> {
    await this.mapProvider.zoomMapInOnCoordinate(location)
  }

  async setActiveTrip(id: string): Promise<void> {
    await this.mapProvider.setActiveTrip(id)
  }
}
