import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useCreateCorporateGroup } from '@/composables/modules/corporates/createCorporateGroup'
import { usePagination } from '@/composables/utils/table'
import { useAlert } from '@/composables/core/notification'
import { useConfirmationModal } from '@/composables/core/confirmation'

import { useCompaniesModal } from '@/composables/core/modals'
const { corporateGroupForm } = useCreateCorporateGroup()
const selectedCorporateGroup = ref({} as Record<string, any>)
const selectedStaffToDelete = ref({}) as any

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
const proceedToDelete = async (itm: any) => {
    loading.value = true
    const id = useRoute().params.group_id as any
    const res = await corporates_api.$_delete_corporate_member(id, itm.staff_id) as CustomAxiosResponse
    if (res.type !== 'ERROR') {
        useConfirmationModal().closeAlert()
        useAlert().openAlert({
            type: 'SUCCESS',
            msg: 'Member was successfully deleted.'
        })
    }
    loading.value = false
}
   const handleDelete = async (itm:any) => {
    useConfirmationModal().openAlert({
        title: 'Please Confirm',
		type: 'NORMAL',
        desc: 'Are you sure you want to remove this staff?',
		loading,
		call_function: async () => await proceedToDelete(itm)
    })
   }
    return { groupMembers, loading, getCorporateGroupByGroupId, filterData, onFilterUpdate, handleDelete, next, prev, moveTo, ...metaObject, selectedCorporateGroup, handleChangeGroup, selectedStaffToDelete }
}
