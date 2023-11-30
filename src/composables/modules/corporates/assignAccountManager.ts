import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
import { useCorporateIdDetails } from '@/composables/modules/corporates/id'
import { useCompaniesModal } from '@/composables/core/modals'
const { selectedCorporate } = useCorporateIdDetails()

const assignForm = {
	staffId: ref('')
}

export const useAssignManager = () => {
	const loading = ref(false)

	const assignBusinessAccountManager = async () => {
		loading.value = true
		const res = (await corporates_api.$_assign_bussiness_account_manager(selectedCorporate.value.id,
			convertObjWithRefToObj(assignForm)
		)) as CustomAxiosResponse
		if (res.type !== 'ERROR') {
            useCompaniesModal().closeAddAccountManagers()
			useAlert().openAlert({
				type: 'SUCCESS',
				msg: 'Account nmanager has beena assigned successfully.'
			})
		}
		loading.value = false
    }

	const populateAssignForm = (data: any) => {
        assignForm.staffId.value = data.staffId
	}

	return { assignForm, loading, assignBusinessAccountManager, populateAssignForm }
}
