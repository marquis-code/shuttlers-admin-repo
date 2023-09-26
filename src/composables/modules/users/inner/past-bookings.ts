import { useUserRefundLogAudit } from './booking-audit'
import { users_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

export const useUserPastBookings = () => {
    const loading = ref(false)
    const pastBookingsList = ref([] as any[])
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()

    const filterData = {
        status: ref('')
    }

    const getUserPastBookings = async (id: string) => {
        loading.value = true
        const res = await users_api.$_get_past_booking(id, metaObject, filterData) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            pastBookingsList.value = res.data.map((item : Record<string, any>) => ({ ...item, route: { pickup: item?.route?.pickup, destination: item?.route?.destination }, route_code: item?.route?.route_code, start_date: item?.trip?.start_trip, end_date: item?.trip?.end_trip, amount: item?.unit_cost, payment_source: item?.payment_source, route_type: { type: item?.route?.is_exclusive, visibility: item?.route?.visibility } }))
            metaObject.total.value = res.data.pagination?.pageCount
        }
        loading.value = false
    }

    setFunction(getUserPastBookings)

    const onFilterUpdate = (data: any) => {
        switch (data.type) {
            case 'status':
                filterData.status.value = data.value
                break
        }
    }

    return { pastBookingsList, loading, getUserPastBookings, filterData, onFilterUpdate, next, prev, moveTo, ...metaObject }
}

const pastBooking = ref({} as Record<string, any>)
export const useUserPastBookingsById = () => {
    const { auditArray, getRefundAudit, loadingAduit } = useUserRefundLogAudit()
    const loading = ref(false)

    const getUserPastBookingsById = async (id: string, withAudit = false) => {
        loading.value = true
        const res = await users_api.$_get_past_booking_by_id(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            pastBooking.value = res.data
            if (withAudit && res.data?.refund_log?.id) {
                getRefundAudit(res.data.refund_log.id)
            }
        }
        loading.value = false
    }

    return { pastBooking, loading, getUserPastBookingsById, auditArray, loadingAduit }
}
