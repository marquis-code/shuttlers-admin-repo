import { useSocketIo } from '@/api_factory/socket.config'

export const usePassangersTracking = () => {
    const { listenToEvent } = useSocketIo()

    const listenToallPassangersLocation = () => {
        listenToEvent('passengers:all:new-position', (data) => {
            // console.log(data)
        })
    }

    return { listenToallPassangersLocation }
}
