import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useCorporateIdDetails } from '@/composables/modules/corporates/id'
import { usePagination } from '@/composables/utils/table'
const { selectedCorporate } = useCorporateIdDetails()
export const useGroup = () => {
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()
     const loading = ref(false)
     const groups = ref([] as any)
     const corporateId = ref()
	const fetchGroup = async (id: number) => {
        corporateId.value = id
         loading.value = true
        const res = await corporates_api.$_get_corporate_groups(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            groups.value = res?.data?.data ?? []
        }
        loading.value = false
	}

    setFunction(fetchGroup(corporateId.value))

	return { groups, loading, fetchGroup, ...metaObject, next, prev, moveTo }
}
