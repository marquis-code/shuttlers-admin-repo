import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useCorporateIdDetails } from '@/composables/modules/corporates/id'
const { selectedCorporate } = useCorporateIdDetails()
const branches = ref([]) as Ref<any[]>
const loading = ref(false)

export const useCorporateBranches = () => {
	const getBranches = async (id: number) => {
		loading.value = true
		const res = await corporates_api.$_get_corporate_branches(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            branches.value = res.data.data?.length ? res.data.data : []
        }
        loading.value = false
	}

	return { loading, branches, getBranches }
}
