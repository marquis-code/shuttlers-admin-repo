import { use_get_carousels } from './fetch'
import { campaigns_api } from '@/api_factory/modules/campaigns'
import { CustomAxiosResponse } from '@/api_factory/axios.config'
import { useAlert } from '@/composables/core/notification'
import { useConfirmationModal } from '@/composables/core/confirmation'

const carousel = ref({} as Record<string, any>)
const loading = ref(false)

export const useUpdateCarousel = () => {
    const initUpdateCarousel = (_carousel: Record<string, any>) => {
        carousel.value = _carousel
        useConfirmationModal().openAlert({
            call_function: updateCarouselStatus,
            desc: `Are you sure you would like to make ${carousel.value?.name} carousel ${carousel.value?.status === 'active' ? 'not' : ''} visible to all users?`,
            title: `${carousel.value?.status === 'active' ? 'Disable' : 'Enable'} carousel?`,
            loading,
            type: 'NORMAL'
        })
    }

    const updateCarouselStatus = async () => {
        const payload = {
            status: carousel.value?.status === 'active' ? 'inactive' : 'active'
        }
        loading.value = true
        const res = await campaigns_api.$_update_carousel(carousel.value?.id, payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Carousel updated successfully' })
            use_get_carousels().getCarousels()
            useConfirmationModal().closeAlert()
        }
        loading.value = false
    }

    return { initUpdateCarousel, loading }
}
