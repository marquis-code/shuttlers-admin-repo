import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useGetCreditLineExecutions } from '@/composables/modules/corporates/creditLineExecutions'
import { useCorporateIdDetails } from '@/composables/modules/corporates/id'
import { usePagination } from '@/composables/utils/table'
const { getCreditLineExecutions, loadingExecutions, creditLineExecutions, next, prev, moveTo, ...metaObject } = useGetCreditLineExecutions()

export const useGetCapacityConfiguration = () => {
    const { selectedCorporate } = useCorporateIdDetails()
    const loading = ref(false)
    const capacityConfigurationList = ref([] as any)
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()
    const { $_get_corporate_vehicle_capacity } = corporates_api
    const getCapacityConfiguration = async () => {
        loading.value = true
        const res = await $_get_corporate_vehicle_capacity(selectedCorporate.value.id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            capacityConfigurationList.value = res.data.data
            metaObject.total.value = res.data.metadata?.total_pages
        }
        loading.value = false
    }

    setFunction(getCapacityConfiguration)

    return { getCapacityConfiguration, loading, capacityConfigurationList, ...metaObject, next, prev, moveTo }
}
