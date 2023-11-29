import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
import { useCorporateIdDetails } from '@/composables/modules/corporates/id'
const { selectedCorporate } = useCorporateIdDetails()
export const useUpdateStaffAdditionByDomainStatus = () => {
	const loading = ref(false)

    const payload = {
        enable_staff_addition_by_domain: false
    }
    const privateRouteVisibilityForm = {
        prevent_staff_view_of_public_routes: false
    }
	const updateStaffAdditionStatus = async (toggleType) => {
        const requestPayload = toggleType === 'domain-addition' ? payload : toggleType === 'route-visibility' ? privateRouteVisibilityForm : null
        const res = (await corporates_api.$_create_company_domain(Number(selectedCorporate.value.id), requestPayload
        )) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({
                type: 'SUCCESS',
                msg: `${toggleType === 'domain-addition' ? 'Permission to add user was updated successfully' : 'Staff visibility setting was successfully updated'}`
            })
			useConfirmationModal().closeAlert()
        }
        loading.value = false
    }

    const populateDomainForm = (data:any) => {
        payload.enable_staff_addition_by_domain = data.enable_staff_addition_by_domain
    }

    const populateRouteVisibilityForm = (data:any) => {
        privateRouteVisibilityForm.prevent_staff_view_of_public_routes = data.prevent_staff_view_of_public_routes
    }

	return { updateStaffAdditionStatus, loading, payload, privateRouteVisibilityForm, populateDomainForm, populateRouteVisibilityForm }
}
