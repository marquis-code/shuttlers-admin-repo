import { trips_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
import { useTripsModal } from '@/composables/core/modals'
import { useTripIdDetails, useTripFinancials } from '@/composables/modules/trips/id'
const { selectedTripId } = useTripIdDetails()
const { getTripFinancials, tripFinancialId } = useTripFinancials()
const deductionForm = {
    amount: ref(null) as any,
    description: ref('')
}

export const useDeductEarning = () => {
    const loading = ref(false)
    const deductPartnerEarning = async () => {
        loading.value = true
        const res = await trips_api.$_deduct_partner_trip_earnings_by_id(tripFinancialId.value, convertObjWithRefToObj(deductionForm)) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Earning was successfully deducted' })
            useTripsModal().closeDeductEarning()
            getTripFinancials(selectedTripId.value)
        }
        loading.value = false
    }

    const prePopulateDeductionForm = (data) => {
        deductionForm.amount.value = Number(data.amount)
        deductionForm.description.value = data.description
    }
    return { loading, deductionForm, deductPartnerEarning, prePopulateDeductionForm }
}
