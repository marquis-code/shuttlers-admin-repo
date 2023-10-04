import { useSocketIo } from '@/api_factory/socket.config'

export const usePassangersTracking = () => {
    const { listenToEvent, _connectToSocket } = useSocketIo()
    _connectToSocket()
    const listenToallPassangersLocation = () => {
        listenToEvent('passengers:all:new-position', (data) => {
            // console.log(data)
            // console.log('passengers:all:new-position')
        })
    }

    return { listenToallPassangersLocation }
}
