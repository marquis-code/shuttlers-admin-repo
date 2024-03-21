import { useSocketIo } from '@/api_factory/socket.config'
import { loadMarkeronMap } from '@/composables/core/map'
import { useGetActiveTripsList } from '@/composables/modules/trips/fetch/activeTrips'

type PassagerType = {
	position_latitude: number;
	position_longitude: number;
    position_direction: number;
    device_recorded_at: string;
	driver_id: number;

};

export const useTripTracking = () => {
	const { activeTripsList } = useGetActiveTripsList()
	const { listenToEvent, _connectToSocket } = useSocketIo()
	_connectToSocket()

	const listenToSpecificTripLocationAndAddtoMap = (
		tripId: string, clickFunc:(data:any)=>void
    ) => {
		listenToEvent(`trips:${tripId}`, (data: PassagerType) => {
			activeTripsList.value.filter((i) => i.id === tripId)[0].vehicle_status = true
            loadMarkeronMap({
                id: data.driver_id,
                lat: data.position_latitude,
                lng: data.position_longitude
            }, clickFunc, '/bus.svg', data.position_direction)
		})
	}

	return { listenToSpecificTripLocationAndAddtoMap }
}
