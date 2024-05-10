import { campaigns_api } from '@/api_factory/modules/campaigns'
import { CustomAxiosResponse } from '@/api_factory/axios.config'
import { useAlert } from '@/composables/core/notification'

const loading = ref(false)
const dynamic_urls = ref([] as string[])
const createCarouselObj = {
    title: ref(''),
    images: ref([] as string[]),
    urls: ref([] as string[]),
    end_date: ref('')
}

const clearObj = () => {
    createCarouselObj.title.value = ''
    createCarouselObj.images.value = []
    createCarouselObj.urls.value = []
    createCarouselObj.end_date.value = ''
}

export const useCreateCarousel = () => {
    const createCarousel = async () => {
        const payload:Record<string, any> = {
            name: createCarouselObj.title.value,
            assets: createCarouselObj.images.value,
            end_date: createCarouselObj.end_date.value,
            dynamic_urls: createCarouselObj.urls.value
        }
        loading.value = true
        const res = await campaigns_api.$_create_carousel(payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Carousel created successfully' })
            clearObj()
            useRouter().push('/campaigns/promotions/carousel')
        }
        loading.value = false
    }

    const getDynamicUrls = async () => {
        const res = await campaigns_api.$_get_dynamic_urls() as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            dynamic_urls.value = res.data?.data?.length ? res.data?.data : []
        }
    }

    return { ...createCarouselObj, loading, clearObj, createCarousel, dynamic_urls, getDynamicUrls }
}
