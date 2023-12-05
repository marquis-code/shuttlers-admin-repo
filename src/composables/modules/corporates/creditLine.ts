import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useGetCreditLineExecutions } from '@/composables/modules/corporates/creditLineExecutions'
import { useCorporateIdDetails } from '@/composables/modules/corporates/id'
const { getCreditLineExecutions, loadingExecutions, creditLineExecutions, next, prev, moveTo, ...metaObject } = useGetCreditLineExecutions()
const { selectedCorporate } = useCorporateIdDetails()
export const useGetCreditSystem = () => {
    const loading = ref(false)
    const creditSystem = ref({} as any)
    const needCreditSystem = ref(false)
    const { $_get_credit_system } = corporates_api
    const getCorporatesCreditSystem = async () => {
        loading.value = true
        const res = await $_get_credit_system(selectedCorporate.value.id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            creditSystem.value = res.data
            getCreditLineExecutions(res.data.id)
        } else {
            needCreditSystem.value = true
        }
        loading.value = false
    }

    return { getCorporatesCreditSystem, loading, needCreditSystem, creditSystem, loadingExecutions, creditLineExecutions, ...metaObject, next, prev, moveTo }
}
