import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useCorporateIdDetails } from '@/composables/modules/corporates/id'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
import { useAlert } from '@/composables/core/notification'
const { selectedCorporate } = useCorporateIdDetails()

const corporateBookingCancellationForm = {
        restrict_admin_bookings_cancellation: ref(false),
        verification_password: ref('')
    }

export const useCoporateBookingCancellationOptions = () => {
const loading = ref(false)
const configureBookingCancellationOption = async () => {
    loading.value = true
    const res = (await corporates_api.$_configure_booking_cancellation(
        Number(selectedCorporate.value.id), convertObjWithRefToObj(corporateBookingCancellationForm))) as CustomAxiosResponse
    if (res.type !== 'ERROR') {
        useAlert().openAlert({
            type: 'SUCCESS',
            msg: 'Booking configuration option was successfully updated'
          })
    }
    loading.value = false
}

const populateBookingCancellationOptionForm = (data:any) => {
    corporateBookingCancellationForm.restrict_admin_bookings_cancellation.value = data.restrict_admin_bookings_cancellation
    corporateBookingCancellationForm.verification_password.value = data.verification_password
}
return { populateBookingCancellationOptionForm, configureBookingCancellationOption, loading, corporateBookingCancellationForm }
}
