import { useSocketIo } from '@/api_factory/socket.config'
import { loadMarkeronMap } from '@/composables/core/map'

type PassagerType = {
	position_latitude: number;
	position_longitude: number;
    position_direction: number;
    device_recorded_at: string;
	driver_id: number;

};

export const useTripTracking = () => {
	const { listenToEvent, _connectToSocket } = useSocketIo()
	_connectToSocket()

	const listenToSpecificTripLocationAndAddtoMap = (
		tripId: string, clickFunc:(data:any)=>void
    ) => {
        listenToEvent(`trips:${tripId}`, (data: PassagerType) => {
            loadMarkeronMap({
                id: data.driver_id,
                lat: data.position_latitude,
                lng: data.position_longitude
            }, clickFunc, '/bus.svg', data.position_direction)
		})
	}

	return { listenToSpecificTripLocationAndAddtoMap }
}
