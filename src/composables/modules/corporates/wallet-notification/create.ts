import { useFetchCompaniesWalletNotification } from './fetch'
import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'
import { useAlert } from '@/composables/core/notification'
import { useCompaniesModal } from '@/composables/core/modals'

const { getNotifications } = useFetchCompaniesWalletNotification()
const obj = {
    id: ref(null) as Ref<number|null>,
    amount: ref(null) as Ref<number|null>,
    status: ref('active'),
    isEdit: ref(false)
}
const loading = ref(false)

const clearObj = () => {
    obj.id.value = null
    obj.amount.value = null
    obj.status.value = 'active'
    obj.isEdit.value = false
}
export const useCompaniesWalletNotification = () => {
    const addNotification = async () => {
        const payload = {
            general_wallet_threshold: obj.amount.value,
            exception_list: '1',
            status: obj.status.value
        }
        loading.value = true
        const res = await corporates_api.$_create_corporate_wallet_threshold(payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            if (res.data?.id) {
                useAlert().openAlert({ type: 'SUCCESS', msg: 'Notification added successfully' })
                useCompaniesModal().closeWalletNotification()
                getNotifications()
            }
        }
        loading.value = false
    }

    const initUpdate = (data: Record<string, any>) => {
        obj.amount.value = data?.general_wallet_threshold || 0
        obj.status.value = data?.status
        obj.id.value = data?.id
        obj.isEdit.value = true
        useCompaniesModal().openWalletNotification()
    }

    const updateNotification = async () => {
        const payload = {
            general_wallet_threshold: obj.amount.value,
            exception_list: '1',
            status: obj.status.value
        }
        loading.value = true
        const res = await corporates_api.$_update_corporate_wallet_threshold(obj.id.value!, payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            if (res.data?.general_wallet_threshold) {
                useAlert().openAlert({ type: 'SUCCESS', msg: 'Notification updated successfully' })
                useCompaniesModal().closeWalletNotification()
                getNotifications()
            }
        }
        loading.value = false
    }

    return { ...obj, loading, clearObj, addNotification, initUpdate, updateNotification }
}
