import { useUserIdDetails } from '../users/id'
import { trips_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
import { useTripsModal } from '@/composables/core/modals'
export const useGetTripPassenger = () => {
    const loading = ref(false)
    const tripPassengerData = ref({} as any)

    const { $_get_trip_passengers } = trips_api

    const getTripPassenger = async (id:string) => {
        loading.value = true
        const res = await $_get_trip_passengers(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            tripPassengerData.value = res.data
        }
        loading.value = false
    }

    return { getTripPassenger, loading, tripPassengerData }
}
const loading = ref(false)
const cardIsOpen = ref(false)
const userDetails = ref({} as Record<string, any>)
const notificationObject = {
    user_ids: ref([]),
    title: ref(''),
    body: ref(''),
    sms: ref(false),
    email: ref(false)
}
const busstopUsersIds = ref([] as Record<string, any>[])

export const useShowTripPassengersCard = () => {
    const { getUserById, selectedUser } = useUserIdDetails()

    const openCard = async (data: any) => {
        cardIsOpen.value = true
        loading.value = true
        userDetails.value = await getUserById(data.id)
        loading.value = false
    }

    const closeCard = () => {
        cardIsOpen.value = false
        userDetails.value = {}
        loading.value = false
    }

    return { loading, cardIsOpen, userDetails, openCard, closeCard }
}

export const useNotifyPassenger = () => {
    const loading = ref(false)

    const { $_notify_trip_passenger } = trips_api

    const notifyPassenger = async () => {
        loading.value = true
        const res = await $_notify_trip_passenger(convertObjWithRefToObj(notificationObject)) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({
				type: 'SUCCESS',
				msg: 'User has been successfiully notified'
			})
            useTripsModal().closeNotifyPassengers()
        }
        loading.value = false
    }

    const populateNotificationForm = (data:any) => {
        notificationObject.user_ids.value = data.user_ids
        notificationObject.title.value = data.title
        notificationObject.body.value = data.body
        notificationObject.sms.value = data.sms
        notificationObject.email.value = data.email
    }

    return { notifyPassenger, loading, notificationObject, populateNotificationForm, busstopUsersIds }
}
