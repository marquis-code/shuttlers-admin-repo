import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useCreateCorporateGroup } from '@/composables/modules/corporates/createCorporateGroup'
import { usePagination } from '@/composables/utils/table'

import { useCompaniesModal } from '@/composables/core/modals'
const { corporateGroupForm } = useCreateCorporateGroup()
const selectedCorporateGroup = ref({} as Record<string, any>)

export const useCorporateGroupByGroupId = () => {
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()
    const loading = ref(false)
    const groupMembers = ref([]) as Record<string, any>
    const filterData = {
        search: ref('')
    }

    const getCorporateGroupByGroupId = async () => {
        const id = useRoute().params.group_id as any
        loading.value = true
        const res = await corporates_api.$_get_corporate_group_by_id(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            groupMembers.value = res.data.data
            metaObject.total.value = res.data.metadata?.total_pages
        }
        loading.value = false
    }

    watch([filterData.search], (val) => {
        getCorporateGroupByGroupId()
    })

    setFunction(getCorporateGroupByGroupId)

    const onFilterUpdate = (data) => {
        if (data.type === 'search') {
            filterData.search.value = data.value
        }
    }

   const handleChangeGroup = () => {
    useCompaniesModal().openCreateCorporateGroup()
    corporateGroupForm.name.value = selectedCorporateGroup?.value?.name
   }
    return { groupMembers, loading, getCorporateGroupByGroupId, filterData, onFilterUpdate, next, prev, moveTo, ...metaObject, selectedCorporateGroup, handleChangeGroup }
}
