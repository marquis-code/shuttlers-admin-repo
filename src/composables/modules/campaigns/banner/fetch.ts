import { campaigns_api } from '@/api_factory/modules/campaigns'
import { CustomAxiosResponse } from '@/api_factory/axios.config'
import { usePagination } from '@/composables/utils/table'

const loading_banners = ref(false)
const banersList = ref([] as Record<string, any>[])

export const use_get_baners = () => {
    const { prev, metaObject, next, moveTo, setFunction } = usePagination()

        const filterData = {
        status: ref('active')

    }
    const onFilterUpdate = (data: any) => {
        switch (data.type) {
            case 'status':
                filterData.status.value = data.value === '0' ? 'inactive' : 'active'
                break
        }
    }

    watch([filterData.status], () => {
        getBaners()
    })
    const getBaners = async () => {
        loading_banners.value = true
        const res = await campaigns_api.$_get_banners(metaObject, filterData) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            banersList.value = res.data
            metaObject.total_pages.value = res.data?.metadata?.total_pages
        }
        loading_banners.value = false
    }
    setFunction(getBaners)
    return { getBaners, loading_banners, banersList, prev, ...metaObject, next, moveTo, onFilterUpdate }
}
