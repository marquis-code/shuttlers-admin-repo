import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
import { useAlert } from '@/composables/core/notification'
import { useGroup } from '@/composables/modules/corporates/corporateGroup'
import { useCreateCorporateGroup } from '@/composables/modules/corporates/createCorporateGroup'
const selectedCorporate = ref({} as Record<string, any>)
const { corporateGroupForm } = useCreateCorporateGroup()
const { fetchGroup } = useGroup()
const selectedCorporateId = ref('')

export const useCorporateIdDetails = () => {
    const loading = ref(false)

    const getCorporateById = async (id: string) => {
        selectedCorporateId.value = id
        const corporate_id = useRoute().params.id
        const group_id = useRoute().params.group_id
        loading.value = true
        const res = await corporates_api.$_edit_corporate_group_by_id(corporate_id, group_id, convertObjWithRefToObj(corporateGroupForm)) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({
                type: 'SUCCESS',
                msg: 'Corporate group was successfully updated'
              })
              fetchGroup(Number(selectedCorporate.value.id))
        }
        loading.value = false
    }
    return { selectedCorporate, loading, getCorporateById }
}
