import { io } from 'socket.io-client'
import { ref } from 'vue'
import { useUser } from '@/composables/auth/user'

const { token } = useUser()

const globalData = {
    socketIsConnected: ref(false)
}

const $GATEWAY_ENDPOINT_WITHOUT_VERSION = import.meta.env.VITE_BASE_URL as string

export const primarySocketIo = io($GATEWAY_ENDPOINT_WITHOUT_VERSION, { path: '/telemetry/socket.io', auth: { token: token.value } })

const _connectToSocket = async () => {
    try {
        await primarySocketIo.connect()
        globalData.socketIsConnected.value = true
    } catch (error) {
        // console.error('Failed to connect to socket:', error)
        globalData.socketIsConnected.value = false
        setTimeout(() => {
            _connectToSocket()
        }, 1000)
    }

    primarySocketIo.on('disconnect', () => {
        // console.warn('Socket disconnected')
        globalData.socketIsConnected.value = false
        setTimeout(() => {
            _connectToSocket()
        }, 1000)
    })
}

export const useSocketIo = () => {
    const listenToEvent = async (event: string, Func: (item: any) => void) => {
        if (primarySocketIo.connected) {
             primarySocketIo.on(event, Func)
        } else {
            _connectToSocket()
            primarySocketIo.on(event, Func)
        }
    }

    return { listenToEvent }
}
