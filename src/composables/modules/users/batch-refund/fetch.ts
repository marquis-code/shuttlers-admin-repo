import { users_api, CustomAxiosResponse } from '@/api_factory/modules'

export const useGetBatchRefundList = () => {
    const loading = ref(false)
    const refundList = ref([] as any)

    const { $_get_batch_refund } = users_api

    const getBatchRefundList = async () => {
        loading.value = true

        const res = await $_get_batch_refund() as CustomAxiosResponse

        if (res.type !== 'Error') {
            refundList.value = res.data.data
        }
        loading.value = false
    }

    return { getBatchRefundList, loading, refundList }
}
