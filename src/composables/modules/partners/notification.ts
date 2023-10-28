import { users_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'

const credentials = {
    title: ref(''),
    description: ref(''),
    sms: ref(false),
    email: ref(false),
    notifyAll: ref(false)
}

const selectedUsers = ref([] as any[])
const notificationType = ref('regular')
const search = ref('')

export const useCreateNotification = () => {
    const creatingNotification = ref(false)
    const message = ref('')
    const isFormEmpty = computed(() => {
        return !!(credentials.description.value && credentials.title.value && (selectedUsers.value.length || notificationType.value === 'all'))
    })

    const createNotifications = async () => {
        const payload = {
            body: `<html>${credentials.description.value}</html>`,
            title: credentials.title.value,
            sms: credentials.sms.value,
            email: credentials.email.value
        }
        creatingNotification.value = true
        const res = await users_api.$_create_notification(payload) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Notification sent successfully' })
            resetCredentials()
        }
        creatingNotification.value = false
    }

    const removeSelectedUser = (selectedUser) => {
        const index = selectedUsers.value.findIndex((user:any) => user.id === selectedUser.id)
        selectedUsers.value.splice(index, 1)
    }

    return { createNotifications, creatingNotification, message, credentials, isFormEmpty, notificationType, selectedUsers, removeSelectedUser, search }
}

const resetCredentials = () => {
    credentials.title.value = ''
    credentials.description.value = ''
    credentials.sms.value = false
    credentials.email.value = false
    credentials.notifyAll.value = false
}
