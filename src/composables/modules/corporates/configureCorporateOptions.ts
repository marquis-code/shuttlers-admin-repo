import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useCorporateIdDetails } from '@/composables/modules/corporates/id'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
import { useAlert } from '@/composables/core/notification'
import { useCompaniesModal } from '@/composables/core/modals'
const { selectedCorporate } = useCorporateIdDetails()

const corporateOptionsForm = {
    restrict_booking_on_public_routes: ref(false),
    restrict_booking_on_public_routes_with_corporate_wallet: ref(false),
    restrict_booking_on_private_routes_with_personal_wallet: ref(false),
    restrict_booking_on_private_routes_with_corporate_wallet: ref(false),
    verification_password: ref()
}

export const useCoporateOptions = () => {
const loading = ref(false)
const processCorporatesOptions = async () => {
    loading.value = true
    const res = (await corporates_api.$_configure_corporate_options(
        Number(selectedCorporate.value.id), convertObjWithRefToObj(corporateOptionsForm))) as CustomAxiosResponse
    if (res.type !== 'ERROR') {
        useAlert().openAlert({
            type: 'SUCCESS',
            msg: 'Corporate configuration was successful'
          })
          useCompaniesModal().closeCorporateWalletOptions()
    }
    loading.value = false
}

const populateCorporateOptionsForm = (data:any) => {
    corporateOptionsForm.restrict_booking_on_public_routes.value = data.restrict_booking_on_public_routes
    corporateOptionsForm.restrict_booking_on_public_routes_with_corporate_wallet.value = data.restrict_booking_on_public_routes_with_corporate_wallet
    corporateOptionsForm.restrict_booking_on_private_routes_with_personal_wallet.value = data.restrict_booking_on_private_routes_with_personal_wallet
    corporateOptionsForm.restrict_booking_on_private_routes_with_corporate_wallet.value = data.restrict_booking_on_private_routes_with_corporate_wallet
    corporateOptionsForm.verification_password.value = data.verification_password
}
return { populateCorporateOptionsForm, processCorporatesOptions, loading, corporateOptionsForm }
}
