import { ref, computed } from 'vue'
import { trips_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useGetUpcomingTripsList } from '@/composables/modules/trips/fetch'
// import { useAlert } from '@/composables/core/notification'
import { usePagination } from '@/composables/utils/table'
// import { convertObjWithRefToObj } from '@/composables/utils/formatter'
// import { useTripsModal } from '@/composables/core/modals'
const { moveTo: financialsMoveTo, metaObject, next, prev, setFunction } = usePagination()
const { getUpcomingTrips, upcomingTripsList, moveTo } = useGetUpcomingTripsList()

const selectedTrip = ref({} as Record<string, any>)
const selectedTripId = ref('')
const tripFinancialId = ref('')
const selectedTripIndex = computed(() => {
    return upcomingTripsList.value.findIndex((item: any) => item.id === selectedTripId.value)
})

// const deductionForm = {
//     amount: ref(null) as any,
//     description: ref('')
// }

const currentIndex = ref(1)
export const useTripIdDetails = () => {
    const loading = ref(false)

    const getTripById = async (id: string) => {
        selectedTripId.value = id
        loading.value = true
        const res = await trips_api.$_get_trip_by_id(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            selectedTrip.value = res.data
        }
        loading.value = false
    }
    return { selectedTrip, loading, getTripById, selectedTripId }
}

export const useUpcomingTripIdDetails = () => {
    const loading = ref(false)
    const getUpcomingTripById = async (id: string) => {
        selectedTripId.value = id
        loading.value = true
        const res = await trips_api.$_get_upcoming_trip_by_id(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            selectedTrip.value = res.data
            if (upcomingTripsList.value.length === 0) {
                await getUpcomingTrips()
            }
        }
        loading.value = false
    }

    const handleNext = async () => {
        if (selectedTripIndex.value < upcomingTripsList.value.length - 1) {
            const nextTripId = upcomingTripsList.value[selectedTripIndex.value + 1].id
            await getUpcomingTripById(nextTripId)
        }
        if (selectedTripIndex.value === upcomingTripsList.value.length - 1) {
            currentIndex.value++
            loading.value = true
            await moveTo(currentIndex.value)
            loading.value = false
        }
    }
    const handlePrev = async () => {
        if (selectedTripIndex.value > 0) {
            const prevTripId = upcomingTripsList.value[selectedTripIndex.value - 1].id
            await getUpcomingTripById(prevTripId)
        }
        if (selectedTripIndex.value === 0) {
            if (currentIndex.value !== 1) {
                currentIndex.value -= 1
               await moveTo(currentIndex.value)
            }
        }
    }
    return { selectedTrip, loading, getUpcomingTripById, handleNext, handlePrev, selectedTripIndex }
}

export const useTripFinancials = () => {
    const loading = ref(false)
    const tripFinancials = ref([])
    const revenueStats = ref({})

    const getTripFinancials = async (id: string) => {
        selectedTripId.value = id
        loading.value = true
        const res = await trips_api.$_get_trip_financials(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            tripFinancials.value = res?.data?.deductions
            tripFinancialId.value = res?.data?.id
            revenueStats.value = { ...res.data }
        }
        loading.value = false
    }
    return { tripFinancials, tripFinancialId, loading, getTripFinancials, revenueStats, financialsMoveTo, ...metaObject, next, prev }
}

// export const useDeductEarning = () => {
//     const loading = ref(false)
//     const deductPartnerEarning = async () => {
//         loading.value = true
//         const res = await trips_api.$_deduct_partner_trip_earnings_by_id(tripFinancialId.value, convertObjWithRefToObj(deductionForm)) as CustomAxiosResponse
//         if (res.type !== 'ERROR') {
//             useAlert().openAlert({ type: 'SUCCESS', msg: 'Earning was successfully deducted' })
//             useTripsModal().closeDeductEarning()
//         }
//         loading.value = false
//     }

//     const prePopulateDeductionForm = (data) => {
//         deductionForm.amount.value = Number(data.amount)
//         deductionForm.description.value = data.description
//     }
//     return { loading, deductionForm, deductPartnerEarning, prePopulateDeductionForm }
// }
