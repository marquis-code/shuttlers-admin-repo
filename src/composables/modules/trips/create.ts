import { trips_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { usePagination } from '@/composables/utils/table'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
import { useTripsModal } from '@/composables/core/modals'
import { useTripIdDetails, useTripFinancials } from '@/composables/modules/trips/id'
const { selectedTripId } = useTripIdDetails()
const { getTripFinancials, tripFinancialId } = useTripFinancials()
// const { moveTo: financialsMoveTo, metaObject, next, prev, setFunction } = usePagination()

// const selectedTripId = ref('')
// const tripFinancialId = ref('')
const deductionForm = {
    amount: ref(null) as any,
    description: ref('')
}

// export const useTripFinancials = () => {
//     const loading = ref(false)
//     const tripFinancials = ref([])
//     const revenueStats = ref({})

//     const getTripFinancials = async (id: string) => {
//         selectedTripId.value = id
//         loading.value = true
//         const res = await trips_api.$_get_trip_financials(id) as CustomAxiosResponse
//         if (res.type !== 'ERROR') {
//             tripFinancials.value = res?.data?.deductions
//             tripFinancialId.value = res?.data?.id
//             revenueStats.value = { ...res.data }
//         }
//         loading.value = false
//     }
//     return { tripFinancials, loading, getTripFinancials, revenueStats, financialsMoveTo, ...metaObject, next, prev }
// }

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
