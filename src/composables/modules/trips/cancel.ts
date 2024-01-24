import { useGetCompletedTripsList } from './fetch'
import { trips_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { useTripsModal } from '@/composables/core/modals'

const { getCompletedTrips } = useGetCompletedTripsList()
const obj = {
    tripId: ref(null) as Ref<number|null>,
    password: ref(''),
    reason: ref('')
}
const loading = ref(false)

const clearObj = () => {
    obj.tripId.value = null
    obj.password.value = ''
    obj.reason.value = ''
}

const enableButton = computed(() => {
    return !!(obj.reason.value && obj.password.value)
})
export const useCancelTrip = () => {
    const initCancelTrip = (tripDetails:Record<string, any>) => {
        if (!tripDetails?.id) return useAlert().openAlert({ type: 'ERROR', msg: 'Trip id not found' })
        obj.tripId.value = tripDetails.id
        useTripsModal().openCancelTrip()
    }

    const cancelTrip = async () => {
        const payload:Record<string, any> = {
			trip_ids: [obj.tripId.value],
            password: obj.password.value,
            cancellation_reason: obj.reason.value
		}
		loading.value = true
		const res = await trips_api.$_cancel_completed_trip(payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			if (res.data.success) {
				useAlert().openAlert({ type: 'SUCCESS', msg: 'Trip cancelled successfully' })
				useTripsModal().closeCancelTrip()
				getCompletedTrips()
			}
        }
		loading.value = false
    }

    return { initCancelTrip, ...obj, clearObj, loading, cancelTrip, enableButton }
}
