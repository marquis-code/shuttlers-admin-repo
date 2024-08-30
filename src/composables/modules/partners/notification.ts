import { partners_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { usePartnerModal } from '@/composables/core/modals'

const credentials = {
    title: ref(''),
    description: ref(''),
    sms: ref(false),
    email: ref(false),
    notifyAll: ref(false)
}

const clearObj = () => {
    credentials.title.value = ''
    credentials.description.value = ''
    credentials.sms.value = false
    credentials.email.value = false
    credentials.notifyAll.value = false
    selectedPartners.value = []
}

const selectedPartners = ref([] as any[])
const notificationType = ref('regular')
const search = ref('')

export const useCreateNotification = () => {
    const creatingNotification = ref(false)
    const message = ref('')
    const isFormEmpty = computed(() => {
        return !!(credentials.description.value && credentials.title.value && (selectedPartners.value.length || notificationType.value === 'all'))
    })

    const showPreview = () => {
        usePartnerModal().openConfirmPartnerNotification()
    }

    const sendNotification = async () => {
        useConfirmationModal().openAlert({
            type: 'NORMAL',
            title: 'Confirm action',
            desc: `Are you sure you want this message sent to ${credentials.notifyAll.value ? 'all users' : `${selectedPartners.value?.length} partners`}?`,
            loading: creatingNotification,
            call_function: () => createNotifications()
        })
    }

    const createNotifications = async () => {
        const payload = {
            description: `<html>${credentials.description.value}</html>`,
            title: credentials.title.value,
            sms: credentials.sms.value,
            email: credentials.email.value,
            partner_ids: selectedPartners.value.map((partner:any) => partner.id)
        }
        creatingNotification.value = true
        const res = await partners_api.$_create_notification(payload) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Notification sent successfully' })
            usePartnerModal().closeConfirmPartnerNotification()
            useConfirmationModal().closeAlert()
            clearObj()
        }
        creatingNotification.value = false
    }

    const removeSelectedPartner = (selectedPartner) => {
        const index = selectedPartners.value.findIndex((partner:any) => partner.id === selectedPartner.id)
        selectedPartners.value.splice(index, 1)
    }

    return { createNotifications, sendNotification, creatingNotification, message, credentials, notificationType, selectedPartners, removeSelectedPartner, search, isFormEmpty, showPreview, clearObj }
}

const resetCredentials = () => {
    credentials.title.value = ''
    credentials.description.value = ''
    credentials.sms.value = false
    credentials.email.value = false
    credentials.notifyAll.value = false
    selectedPartners.value = []
}
