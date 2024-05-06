import { use_get_baners } from './fetch'
import { campaigns_api } from '@/api_factory/modules/campaigns'
import { CustomAxiosResponse } from '@/api_factory/axios.config'
import { useAlert } from '@/composables/core/notification'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { usePromotionModal } from '@/composables/core/modals'

const banner = ref({} as Record<string, any>)
const loading = ref(false)

const bannerObj = {
    action_type: ref(''),
    action_value: ref('')
}

const clearObj = () => {
    bannerObj.action_type.value = ''
    bannerObj.action_value.value = ''
}

export const useUpdateBanner = () => {
    const initUpdateBanner = (_banner: Record<string, any>, action_modal = false) => {
        banner.value = _banner
        if (action_modal) {
            bannerObj.action_type.value = _banner?.action_type || ''
            bannerObj.action_value.value = _banner?.action_value || ''
            usePromotionModal().openUpdateBanner()
            return
        }
        useConfirmationModal().openAlert({
            call_function: updateBannerStatus,
            desc: `Are you sure you would like to make ${banner.value?.title} banner ${banner.value?.status === 'active' ? 'not' : ''} visible to all users?`,
            title: `${banner.value?.status === 'active' ? 'Disable' : 'Enable'} banner?`,
            loading,
            type: 'NORMAL'
        })
    }

    const updateBannerStatus = async () => {
        const payload = {
            status: banner.value?.status === 'active' ? 'inactive' : 'active'
        }
        loading.value = true
        const res = await campaigns_api.$_update_banner(banner.value?.id, payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Banner updated successfully' })
            use_get_baners().getBaners()
            useConfirmationModal().closeAlert()
        }
        loading.value = false
    }

    const updateBannerCTA = async () => {
        const payload: Record<string, any> = {
            action_type: bannerObj.action_type.value
        }
        if (bannerObj.action_type.value !== 'open_route_discovery') {
            payload.action_value = String(bannerObj.action_value.value)
        }
        loading.value = true
        const res = await campaigns_api.$_update_banner(banner.value?.id, payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Banner updated successfully' })
            use_get_baners().getBaners()
            usePromotionModal().closeUpdateBanner()
        }
        loading.value = false
    }

    return { initUpdateBanner, loading, ...bannerObj, clearObj, updateBannerCTA }
}
