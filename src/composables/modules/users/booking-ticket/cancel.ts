import { useBookingTicket } from './fetch'
import { users_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useUserModal } from '@/composables/core/modals'
import { useAlert } from '@/composables/core/notification'

const { ticketDetails, fetchTicketDetails } = useBookingTicket()
const booked_days = ref([]) as Ref<Record<string, any>[]>
const selected_days = ref([]) as Ref<string[]>
const loading = ref(false)
const cancelling = ref(false)

export const useCancelBooking = () => {
    const fetchBookedDays = async () => {
        const ticketId = useRoute().params.ticket_id as string
        loading.value = true
        const res = await users_api.$_get_booked_days(ticketId) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            booked_days.value = res.data?.length ? res.data : []
        }
        loading.value = false
    }

    const cancelBooking = async () => {
        const ticketId = useRoute().params.ticket_id as string
        const userId = useRoute().params.id as string
        const payload = {
            data: {
                itinerary_id: ticketDetails.value?.itinerary_id,
                route_id: ticketDetails.value?.route_id,
                pickup_id: ticketDetails.value?.pickup_id,
                destination_id: ticketDetails.value?.destination_id,
                user_id: ticketDetails.value?.user_id,
                user_route_id: ticketId,
                booked_days: selected_days.value,
                booking_days: selected_days.value
            }
        }
        cancelling.value = true
        const res = await users_api.$_cancel_booking(userId, payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            if (res.data?.success) {
                useAlert().openAlert({ type: 'SUCCESS', msg: res.data?.message || 'booking cancellation successful' })
                useUserModal().closeCancelBooking()
                fetchTicketDetails()
            }
        }
    }

    return { fetchBookedDays, loading, booked_days, cancelBooking, selected_days, cancelling }
}
