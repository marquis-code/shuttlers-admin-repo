import { useUserNotifyFilter } from './notify-filter'
import { users_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { useConfirmationModal } from '@/composables/core/confirmation'

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
const corporateId = ref('')

interface NotificationInterface {
  body: string
  title: string
  sms: boolean
  email:boolean,
  all?: boolean,
  user_ids?: Record<string, any>
}

watch(credentials.notifyAll, () => {
    if (credentials.notifyAll.value) selectedUsers.value = []
})

export const useCreateNotification = () => {
    const creatingNotification = ref(false)
    const message = ref('')
    const isFormEmpty = computed(() => {
        return !!(credentials.description.value && credentials.title.value && (selectedUsers.value.length || notificationType.value === 'all') && (credentials.sms.value || credentials.email.value))
    })

    const sendNotification = async () => {
            useConfirmationModal().openAlert({ type: 'NORMAL', title: 'Please Confirm', desc: `Are you sure you want to notify ${credentials.notifyAll.value ? 'All' : selectedUsers.value.length} users?`, loading: creatingNotification, call_function: () => createNotifications() })
    }

    const createNotifications = async () => {
        let payload: NotificationInterface = {
            body: `<html>${credentials.description.value}</html>`,
            title: credentials.title.value,
            sms: credentials.sms.value,
            email: credentials.email.value
        }
        if (credentials.notifyAll.value) {
            payload = {
                ...payload, all: true
            }
        } else {
            const { type, users } = useUserNotifyFilter()
            if (type.value === 'all') {
                payload = {
                    ...payload, user_ids: selectedUsers.value.map((user:any) => user.id)
                }
            } else {
                payload = {
                    ...payload, user_ids: users.value.map((user:any) => user.id)
                }
            }
        }
        creatingNotification.value = true
        const res = await users_api.$_create_notification(payload) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Notification sent successfully' })
            useConfirmationModal().closeAlert()
            resetCredentials()
        }
        creatingNotification.value = false
        useConfirmationModal().closeAlert()
    }

    const removeSelectedUser = (selectedUser) => {
        const index = selectedUsers.value.findIndex((user:any) => user.id === selectedUser.id)
        selectedUsers.value.splice(index, 1)
    }

    return { createNotifications, creatingNotification, message, credentials, isFormEmpty, notificationType, selectedUsers, removeSelectedUser, sendNotification, search, corporateId }
}

const resetCredentials = () => {
    credentials.title.value = ''
    credentials.description.value = ''
    credentials.sms.value = false
    credentials.email.value = false
    credentials.notifyAll.value = false
}
