import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'
import { useAlert } from '@/composables/core/notification'

const notifications = ref([]) as Ref<Record<string, any>[]>
const loading = ref(false)

export const useFetchCompaniesWalletNotification = () => {
    const getNotifications = async () => {
        loading.value = true
        const res = await corporates_api.$_get_corporate_wallet_threshold() as CustomAxiosResponse
        if (res.type !== 'ERROR') {
           notifications.value = res.data?.length ? res.data : []
        }
        loading.value = false
    }

    return { loading, notifications, getNotifications }
}
