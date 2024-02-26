import { users_api, CustomAxiosResponse } from '@/api_factory/modules'

const ticketDetails = ref({}) as Ref<Record<string, any>>
const loading = ref(false)

export const useBookingTicket = () => {
    const fetchTicketDetails = async () => {
        const ticketId = useRoute().params.ticket_id as string
        loading.value = true
        const res = await users_api.$_get_booking_ticket_details(ticketId) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            ticketDetails.value = res.data?.id ? res.data : {}
        }
        loading.value = false
    }

    return { ticketDetails, loading, fetchTicketDetails }
}
