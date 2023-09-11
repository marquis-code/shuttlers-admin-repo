import { users_api, CustomAxiosResponse } from '@/api_factory/modules'

export const useCreateNotification = () => {
    const creatingNotification = ref(false)
    const message = ref('')

    const { $_create_notification } = users_api

    const createNotifications = async (payload: any) => {
        creatingNotification.value = true
        const res = await $_create_notification(payload) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            message.value = res.data.message
        }
        creatingNotification.value = false
    }

    return { createNotifications, creatingNotification, message }
}
