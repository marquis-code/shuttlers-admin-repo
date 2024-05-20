import { campaigns_api } from '@/api_factory/modules/campaigns'
import { CustomAxiosResponse } from '@/api_factory/axios.config'
import { useAlert } from '@/composables/core/notification'
import { use_file_upload } from '@/composables/core/upload'

const loading = ref(false)

const createBannerObj = {
    title: ref(''),
    image: ref(''),
    banner_cta: ref('open_link' as 'open_link'|'open_route'|'open_carousel'|'open_route_discovery'),
    route: ref({} as Record<string, any>),
    link: ref(''),
    carousel: ref({} as Record<string, any>)
}

const clearObj = () => {
    createBannerObj.title.value = ''
    createBannerObj.image.value = ''
    createBannerObj.banner_cta.value = 'open_link'
    createBannerObj.route.value = {}
    createBannerObj.link.value = ''
    createBannerObj.carousel.value = {}
}

export const useCreateBanner = () => {
    const createBanner = async () => {
        const payload = {
            location: null,
            title: createBannerObj.title.value,
            image_url: createBannerObj.image.value,
            action_type: createBannerObj.banner_cta.value,
            action_value: ''
        }
        if (createBannerObj.banner_cta.value === 'open_link') {
            payload.action_value = createBannerObj.link.value
        }
        if (createBannerObj.banner_cta.value === 'open_route') {
            payload.action_value = String(createBannerObj.route.value?.id)
        }
        if (createBannerObj.banner_cta.value === 'open_carousel') {
            payload.action_value = String(createBannerObj.carousel.value?.id)
        }
        try {
                const url = await use_file_upload().upload(createBannerObj.image.value)
        payload.image_url = url
        } catch (e) {
                useAlert().openAlert({ type: 'SUCCESS', msg: 'Error converting image' })
        }

        payload
        loading.value = true
        const res = await campaigns_api.$_create_banner(payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Banner created successfully' })
            clearObj()
            useRouter().push('/campaigns/promotions/banner')
        }
        loading.value = false
    }

    return { ...createBannerObj, loading, clearObj, createBanner }
}
