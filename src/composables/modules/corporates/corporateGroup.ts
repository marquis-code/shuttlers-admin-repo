import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useCorporateIdDetails } from '@/composables/modules/corporates/id'
const { selectedCorporate } = useCorporateIdDetails()
export const useGroup = () => {
     const loading = ref(false)
     const groups = ref([] as any)
	const fetchGroup = async (id: number) => {
         loading.value = true
        const res = await corporates_api.$_get_corporate_groups(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            groups.value = res?.data?.data ?? []
        }
        loading.value = false
	}

	return { groups, loading, fetchGroup }
}
