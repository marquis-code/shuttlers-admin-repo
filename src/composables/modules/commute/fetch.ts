import { sos_api, CustomAxiosResponse } from '@/api_factory/modules'

export const useSosList = () => {
    const loadingSos = ref(false)
    const sosList = ref([] as Record<string, any>[])

    const { $_get_sos } = sos_api

    const getSosList = async () => {
        loadingSos.value = true

        const res = await $_get_sos() as CustomAxiosResponse

        if (res.type !== 'Error') {
            sosList.value = res.data.data
        }
        loadingSos.value = false
    }

    return { getSosList, loadingSos, sosList }
}
