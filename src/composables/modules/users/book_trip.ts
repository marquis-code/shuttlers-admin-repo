import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import { users_api, routes_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { useUserModal } from '@/composables/core/modals'

const bookUserTripObj = {
    pickup: ref({}) as Ref<Record<string, any>>,
    destination: ref({}) as Ref<Record<string, any>>,
    start_date: ref(''),
    end_date: ref(''),
    itinerary_id: ref(null) as Ref<null|number>,
    has_luggage: ref(false),
    luggage_quantity: ref(null) as Ref<null|number>,
    meta: ref(''),
    payment_source: ref('main_balance'),
    has_subscription: ref(false),
    selectedRoute: ref({}) as Ref<Record<string, any>>,
    days_ids: ref([]) as Ref<number[]>,
    num_of_weeks: ref(1)
}
const itineraries = ref([]) as Ref<Record<string, any>[]>
const loading_iti = ref(false)
const bus_stops = ref([]) as Ref<Record<string, any>[]>
const loading_bus_stops = ref(false)
const loading = ref(false)
const routePricing = ref([]) as Ref<Record<string, any>[]>
const selectedRoute_charges = ref([] as Record<string, any>[])

const clearBookUserTripObj = () => {
    bookUserTripObj.pickup.value = {}
    bookUserTripObj.destination.value = {}
    bookUserTripObj.start_date.value = ''
    bookUserTripObj.end_date.value = ''
    bookUserTripObj.itinerary_id.value = null
    bookUserTripObj.luggage_quantity.value = null
    bookUserTripObj.meta.value = ''
    bookUserTripObj.payment_source.value = 'main_balance'
    bookUserTripObj.has_subscription.value = false
    bookUserTripObj.selectedRoute.value = {}
    bookUserTripObj.days_ids.value = []
}

const pickupBusstops = computed(() => {
    return bus_stops.value.filter((b_stop) => b_stop.is_pickup)
})

const dropoff_busstops = computed(() => {
    if (!bookUserTripObj.pickup.value?.id) return []
    return bus_stops.value.filter(
        (stop) =>
          stop?.is_dropoff &&
          (stop.position > bookUserTripObj.pickup.value.position)
      )
})

const tripFare = computed(() => {
    // return routePricingInformation.value[0]?.fare || 0
    if (!routePricing.value.length) return 0
    return routePricing.value.filter((el) => el?.itinerary_id === bookUserTripObj.itinerary_id.value)[0]?.fare
})

const total_fare = computed(() => {
    let totalFare = 0
    if (bookUserTripObj.has_subscription.value) {
      totalFare = tripFare?.value * bookUserTripObj.days_ids.value.length * bookUserTripObj.num_of_weeks.value
    } else {
      totalFare = tripFare?.value
    }
    return totalFare
})

const total_pay = computed(() => {
    let x = total_fare.value
	for (const el of selectedRoute_charges.value) {
		if (el.selected) x += el.total
	}
	return x
})

const getRouteItinerary = async () => {
    loading_iti.value = true
    const res = await routes_api.$_get_itineraries_by_route_id(bookUserTripObj.selectedRoute.value?.id) as CustomAxiosResponse
    if (res.type !== 'ERROR') {
      itineraries.value = res.data.data
    }
    loading_iti.value = false
}

const getBusstops = async () => {
    loading_bus_stops.value = true
    const res = await routes_api.$_get_busstops_by_itinerary_id(bookUserTripObj.itinerary_id.value!) as CustomAxiosResponse
    if (res.type !== 'ERROR') {
      bus_stops.value = res.data.data
    }
    loading_bus_stops.value = false
}

const getRoutePrice = async () => {
    const payload = {
        destination_id: bookUserTripObj.destination.value?.id,
        pickup_id: bookUserTripObj.pickup.value?.id
    }
    const response = await routes_api.$_get_route_pricing(bookUserTripObj.selectedRoute.value?.id, payload) as CustomAxiosResponse
    if (response.type !== 'ERROR') {
        routePricing.value = response.data
    }
    getRouteCharges()
}

const getRouteCharges = async () => {
    const res = await routes_api.$_get_routes_charges(bookUserTripObj.selectedRoute.value?.id, {
        price_per_trip: tripFare.value,
        no_of_trips: 1 * (bookUserTripObj.days_ids.value?.length || 1) * (bookUserTripObj.num_of_weeks.value || 1)
    })

    selectedRoute_charges.value = res.data.data.charges.map((charge: any) => {
        return {
            selected: !!charge.is_compulsory,
            is_compulsory: charge.is_compulsory,
            total: charge.charge_type_fare_for_all_trips,
            id: charge.additional_charge_id,
            description: charge.description,
            name: charge.short_name
        }
    })
}

const addWeeks = (startDate, numberOfWeeks) => {
    const newDate = new Date(startDate)
    const millisecondsInWeek = 7 * 24 * 60 * 60 * 1000
    const resultDate = new Date(
      newDate.getTime() + numberOfWeeks * millisecondsInWeek
    )
    return resultDate
}

function subDays(inputDate, numberOfDays) {
    const newDate = new Date(inputDate)
    const resultDate = new Date(
        newDate.getTime() - numberOfDays * 24 * 60 * 60 * 1000
    )
    return resultDate
}

const endDate = computed(() => {
    if (bookUserTripObj.has_subscription.value && bookUserTripObj.num_of_weeks.value) {
      const _date = addWeeks(bookUserTripObj.start_date.value, bookUserTripObj.num_of_weeks.value)
    //   return useDateFormat(subDays(_date, 1), 'YYYY-MM-DD').value
      return moment(subDays(_date, 1)).format('YYYY-MM-DD')
    }

    return bookUserTripObj.start_date.value
})

watch(bookUserTripObj.selectedRoute, () => {
    itineraries.value = []
    bus_stops.value = []
    bookUserTripObj.itinerary_id.value = null
    if (bookUserTripObj.selectedRoute.value.id) getRouteItinerary()
})

watch(bookUserTripObj.itinerary_id, () => {
    if (bookUserTripObj.itinerary_id.value) getBusstops()
})

watch(bookUserTripObj.destination, () => {
    if (bookUserTripObj.destination.value?.id) getRoutePrice()
})

watch(bookUserTripObj.has_subscription, () => {
    if (!bookUserTripObj.has_subscription.value) {
        bookUserTripObj.days_ids.value = []
        bookUserTripObj.num_of_weeks.value = 1
    }
})

watch(total_fare, () => {
    if (total_fare.value) getRouteCharges()
})

const enableButton = computed(() => {
    return !!(bookUserTripObj.start_date.value && total_fare.value && bookUserTripObj.destination.value?.id)
})

export const useBookUserTrip = () => {
    const bookTrip = async () => {
        const payload:Record<string, any> = {
            route_id: bookUserTripObj?.selectedRoute.value?.id,
            itinerary_id: bookUserTripObj?.itinerary_id.value,
            pickup_id: bookUserTripObj?.pickup.value?.id,
            destination_id: bookUserTripObj?.destination.value?.id,
            days_ids: bookUserTripObj.has_subscription.value ? bookUserTripObj.days_ids.value : [(new Date(bookUserTripObj.start_date.value).getDay()) + 1],
            meta: JSON.stringify(bookUserTripObj.selectedRoute.value),
            start_date: bookUserTripObj?.start_date.value,
            end_date: endDate.value,
            recurring: bookUserTripObj?.has_subscription.value ? 1 : 0,
            payment_source: bookUserTripObj?.payment_source.value,
            additional_charges_id: selectedRoute_charges.value.filter((el) => el.selected).map((obj) => obj.id)
        }
        if (bookUserTripObj.luggage_quantity.value) {
            payload.luggage_quantity = bookUserTripObj.luggage_quantity.value
        }
        if (bookUserTripObj.payment_source.value === 'instant_payment') {
            payload.payment_reference = uuidv4()
            payload.instant_payment_provider = 'corporate_pay'
        }
        // console.log(payload)
        const user_id = useRoute().params.id as string
        loading.value = true
        const res = await users_api.$_book_trip(user_id, payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Trip was successfully booked for user' })
            useUserModal().closeBookTrip()
        }
        loading.value = false
    }
    return { ...bookUserTripObj, itineraries, loading, pickupBusstops, dropoff_busstops, loading_iti, bus_stops, loading_bus_stops, tripFare, total_fare, total_pay, selectedRoute_charges, bookTrip, clearBookUserTripObj, enableButton }
}
