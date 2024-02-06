import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
import { useAlert } from '@/composables/core/notification'
import { useCompaniesModal } from '@/composables/core/modals'

export const useAddCorporateGroupMembers = () => {
    const payload = {
        staff_ids: ref([]) as any
    }
    const loading = ref(false)
    const { $_add_corporate_group_members } = corporates_api
    const createCorporateGroupMembers = async () => {
        const group_id = useRoute().params.group_id as any
        loading.value = true
        const res = await $_add_corporate_group_members(group_id, convertObjWithRefToObj(payload)) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({
                type: 'SUCCESS',
                msg: 'New group member was added successfully'
              })
              useCompaniesModal().closeBatchAddCorporateGroupMembers()
        }
        loading.value = false
    }

    return { createCorporateGroupMembers, loading, payload }
}
