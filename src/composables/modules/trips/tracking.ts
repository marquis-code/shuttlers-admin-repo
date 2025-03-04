import { useSocketIo } from '@/api_factory/socket.config'

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
		listenToEvent('trips:59203', (data) => {
		})
	}

	const listenToSpecificPassengerLocationAndAddtoMap = (
		passengerId: string, clickFunc:(data:any)=>void
	) => {
		// listenToEvent('passengers:all:new-position', (data: PassagerType) => {
        //     loadMarkeronMap({
        //         id: data.user_id,
        //         lat: data.position_latitude,
        //         lng: data.position_longitude
        //     }, clickFunc)
		// })
	}

	return {
		listenToallPassengersLocation,
		listenToSpecificPassengerLocationAndAddtoMap
	}
}
