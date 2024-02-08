// $_delete_corporate_member

import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useCorporateIdDetails } from '@/composables/modules/corporates/id'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
import { useCompaniesModal } from '@/composables/core/modals'
import { useAlert } from '@/composables/core/notification'

export const useDeleteCorporateMember = () => {
     const loading = ref(false)
	const deleteCorporateMember = async () => {
         loading.value = true
        const res = await corporates_api.$_create_corporate_group(Number(selectedCorporate.value.id), convertObjWithRefToObj(corporateGroupForm)) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({
                type: 'SUCCESS',
                msg: 'Corporate member was successfully deleted'
              })
            useCompaniesModal().closeCreateCorporateGroup()
              fetchGroup(Number(selectedCorporate.value.id))
        }
        loading.value = false
	}

	return { loading, deleteCorporateMember }
}
