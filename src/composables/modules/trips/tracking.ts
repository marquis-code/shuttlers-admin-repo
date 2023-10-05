import { useSocketIo } from '@/api_factory/socket.config'
import { loadMarkeronMap } from '@/composables/core/map'

type PassagerType = {
	position_latitude: number;
	position_longitude: number;
	bearing: number;
	user_id: number;
	measuredAt: string;
};

export const usePassengersTracking = () => {
	const { listenToEvent, _connectToSocket } = useSocketIo()
	_connectToSocket()
	const listenToallPassengersLocation = () => {
		listenToEvent('passengers:all:new-position', (data) => {
			// console.log(data)
			// console.log('passengers:all:new-position')
		})
	}
	const listenToSpecificPassengerLocationAndAddtoMap = (
		passengerId: string, clickFunc:(data:any)=>void
	) => {
        listenToEvent(`passengers:${passengerId}:new-position`, (data: PassagerType) => {
            loadMarkeronMap({
                id: data.user_id,
                lat: data.position_latitude,
                lng: data.position_longitude
            }, clickFunc)
		})
	}

	return {
		listenToallPassengersLocation,
		listenToSpecificPassengerLocationAndAddtoMap
	}
}
