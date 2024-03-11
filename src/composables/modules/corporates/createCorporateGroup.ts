import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useCorporateIdDetails } from '@/composables/modules/corporates/id'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
import { useCompaniesModal } from '@/composables/core/modals'
import { useAlert } from '@/composables/core/notification'
import { useGroup } from '@/composables/modules/corporates/corporateGroup'

const { fetchGroup } = useGroup()
const corporateGroupForm = {
    name: ref('')
}

export const useCreateCorporateGroup = () => {
     const loading = ref(false)
	const createCorporateGroup = async () => {
    const { selectedCorporate } = useCorporateIdDetails()
         loading.value = true
        const res = await corporates_api.$_create_corporate_group(Number(selectedCorporate.value.id), convertObjWithRefToObj(corporateGroupForm)) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({
                type: 'SUCCESS',
                msg: 'Corporate group was successfully created'
              })
            useCompaniesModal().closeCreateCorporateGroup()
              fetchGroup(Number(selectedCorporate.value.id))
        }
        loading.value = false
	}

	return { corporateGroupForm, loading, createCorporateGroup }
}
