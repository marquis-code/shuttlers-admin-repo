// $_update_corporate_payment_settings

import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
import { useCorporateIdDetails } from '@/composables/modules/corporates/id'
const { selectedCorporate } = useCorporateIdDetails()

const corporatePaymentSettingsForm = {
    book_on_public_routes: ref(),
    book_on_corporate_routes: ref(),
    staff_can_view_wallet_limit_usage: ref(),
    default_corporate_payment_limit: {
        id: 1,
        limit_type: 'amount',
        limit_value: 10000,
        limit_value_unit: 'per_week'
    }
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
