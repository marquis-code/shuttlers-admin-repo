import { io } from 'socket.io-client'
import { ref } from 'vue'
import { useUser } from '@/composables/auth/user'

const { token } = useUser()

const globalData = {
    socketIsConnected: ref(false)
}

const $GATEWAY_ENDPOINT_WITHOUT_VERSION = import.meta.env.VITE_BASE_URL as string

let primarySocketIo = null as any

const _connectToSocket = async () => {
    if (!primarySocketIo) {
        primarySocketIo = io($GATEWAY_ENDPOINT_WITHOUT_VERSION, { path: '/telemetry/socket.io', auth: { token: `Bearer ${token.value}` } })
    }

    primarySocketIo.on('connect', () => {
        globalData.socketIsConnected.value = true
    })

    primarySocketIo.on('disconnect', () => {
        globalData.socketIsConnected.value = false
        setTimeout(() => {
            _connectToSocket()
        }, 1000)
    })

    try {
        await new Promise((resolve, reject) => {
            primarySocketIo.once('connect', resolve)
            primarySocketIo.once('connect_error', reject)
        })
    } catch (error) {
        globalData.socketIsConnected.value = false
        setTimeout(() => {
            _connectToSocket()
        }, 1000)
    }
}

export const useSocketIo = () => {
    const listenToEvent = (event, Func) => {
        const ensureConnected = async () => {
            if (!primarySocketIo || !primarySocketIo.connected) {
                await _connectToSocket()
            }
            primarySocketIo.on(event, Func)
        }

        ensureConnected()
    }

    return { listenToEvent, _connectToSocket }
}
