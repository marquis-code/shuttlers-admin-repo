import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import { routes_api, batch_booking_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'

const batchBookTripObj = {
    pickup: ref({}) as Ref<Record<string, any>>,
    destination: ref({}) as Ref<Record<string, any>>,
    start_date: ref(''),
    emails: ref([]) as Ref<string[]>,
    selectedItinerary: ref({}) as Ref<Record<string, any>>,
    has_luggage: ref(false),
    luggage_quantity: ref(null) as Ref<null|number>,
    meta: ref(''),
    payment_source: ref('main_balance'),
    has_subscription: ref(false),
    selectedRoute: ref({}) as Ref<Record<string, any>>,
    days_ids: ref([]) as Ref<number[]>,
    num_of_weeks: ref(1),
    has_return: ref(false)
}
const itineraries = ref([]) as Ref<Record<string, any>[]>
const loading_iti = ref(false)
const bus_stops = ref([]) as Ref<Record<string, any>[]>
const loading_bus_stops = ref(false)
const loading = ref(false)
const routePricing = ref([]) as Ref<Record<string, any>[]>
const selectedRoute_charges = ref([] as Record<string, any>[])
const returnTripItinerary = ref({}) as Record<string, any>
const returnTripLoading = ref(false)

const clearBatchBookTripObj = () => {
    batchBookTripObj.pickup.value = {}
    batchBookTripObj.destination.value = {}
    batchBookTripObj.start_date.value = ''
    batchBookTripObj.emails.value = []
    batchBookTripObj.selectedItinerary.value = {}
    batchBookTripObj.luggage_quantity.value = null
    batchBookTripObj.meta.value = ''
    batchBookTripObj.payment_source.value = 'main_balance'
    batchBookTripObj.has_subscription.value = false
    batchBookTripObj.selectedRoute.value = {}
    batchBookTripObj.days_ids.value = []
    batchBookTripObj.has_return.value = false
}

const pickupBusstops = computed(() => {
    return bus_stops.value.filter((b_stop) => b_stop.is_pickup)
})

const dropoff_busstops = computed(() => {
    if (!batchBookTripObj.pickup.value?.id) return []
    return bus_stops.value.filter(
        (stop) =>
          stop?.is_dropoff &&
          (stop.position > batchBookTripObj.pickup.value.position)
      )
})

const tripFare = computed(() => {
    if (!routePricing.value.length) return 0
    return routePricing.value.filter((el) => el?.itinerary_id === batchBookTripObj.selectedItinerary.value?.id)[0]?.fare
})

const total_fare = computed(() => {
    let totalFare = 0
    if (batchBookTripObj.has_subscription.value) {
      totalFare = tripFare?.value * batchBookTripObj.days_ids.value.length * batchBookTripObj.num_of_weeks.value
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
    const res = await routes_api.$_get_itineraries_by_route_id(batchBookTripObj.selectedRoute.value?.id) as CustomAxiosResponse
    if (res.type !== 'ERROR') {
      itineraries.value = res.data.data
    }
    loading_iti.value = false
}

const getBusstops = async () => {
    loading_bus_stops.value = true
    const res = await routes_api.$_get_busstops_by_itinerary_id(batchBookTripObj.selectedItinerary.value?.id) as CustomAxiosResponse
    if (res.type !== 'ERROR') {
      bus_stops.value = res.data.data
    }
    loading_bus_stops.value = false
}

const getRoutePrice = async () => {
    const payload = {
        destination_id: batchBookTripObj.destination.value?.id,
        pickup_id: batchBookTripObj.pickup.value?.id
    }
    const response = await routes_api.$_get_route_pricing(batchBookTripObj.selectedRoute.value?.id, payload) as CustomAxiosResponse
    if (response.type !== 'ERROR') {
        routePricing.value = response.data
    }
    getRouteCharges()
}

const getRouteCharges = async () => {
    const res = await routes_api.$_get_routes_charges(batchBookTripObj.selectedRoute.value?.id, {
        price_per_trip: tripFare.value,
        no_of_trips: 1 * (batchBookTripObj.days_ids.value?.length || 1) * (batchBookTripObj.num_of_weeks.value || 1)
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

const getReturnTripDetails = async (itinerary_id: number) => {
    returnTripLoading.value = true
    const res = await routes_api.$_get_single_itinerary_details(itinerary_id) as CustomAxiosResponse
    if (res.type !== 'ERROR') {
        returnTripItinerary.value = res.data?.id ? res.data : {}
    }
    returnTripLoading.value = false
}

const endDate = computed(() => {
    if (batchBookTripObj.has_subscription.value && batchBookTripObj.num_of_weeks.value) {
      const _date = addWeeks(batchBookTripObj.start_date.value, batchBookTripObj.num_of_weeks.value)
    //   return useDateFormat(subDays(_date, 1), 'YYYY-MM-DD').value
      return moment(subDays(_date, 1)).format('YYYY-MM-DD')
    }

    return batchBookTripObj.start_date.value
})

watch(batchBookTripObj.selectedRoute, () => {
    itineraries.value = []
    bus_stops.value = []
    batchBookTripObj.selectedItinerary.value = {}
    if (batchBookTripObj.selectedRoute.value.id) getRouteItinerary()
})

watch(batchBookTripObj.selectedItinerary, () => {
    batchBookTripObj.pickup.value = {}
    batchBookTripObj.destination.value = {}
    if (batchBookTripObj.selectedItinerary.value?.id) getBusstops()
})

watch(batchBookTripObj.destination, () => {
    if (batchBookTripObj.destination.value?.id) getRoutePrice()
})

watch(batchBookTripObj.has_subscription, () => {
    if (!batchBookTripObj.has_subscription.value) {
        batchBookTripObj.days_ids.value = []
        batchBookTripObj.num_of_weeks.value = 1
    }
})

watch(total_fare, () => {
    if (total_fare.value) getRouteCharges()
})

watch(batchBookTripObj.has_return, () => {
    if (batchBookTripObj.has_return.value) {
        returnTripItinerary.value = {}
        if (batchBookTripObj.selectedItinerary.value?.itinerary_pair_id !== null) {
            getReturnTripDetails(batchBookTripObj.selectedItinerary.value.itinerary_pair_id)
        } else {
            useAlert().openAlert({ type: 'WARNING', msg: 'This trip does not have a return trip paired' })
            batchBookTripObj.has_return.value = false
        }
    }
})

const enableButton = computed(() => {
    return !!(batchBookTripObj.start_date.value && batchBookTripObj.destination.value?.id)
})

export const useBatchBookTrip = () => {
    const batchBookTrip = async () => {
        if (!batchBookTripObj.emails.value.length) {
            return useAlert().openAlert({ type: 'ERROR', msg: 'Add atleast one email' })
        }
        const booking:Record<string, any> = {
            route_id: batchBookTripObj?.selectedRoute.value?.id,
            itinerary_id: batchBookTripObj?.selectedItinerary.value?.id,
            pickup_id: batchBookTripObj?.pickup.value?.id,
            destination_id: batchBookTripObj?.destination.value?.id,
            days_ids: batchBookTripObj.has_subscription.value ? batchBookTripObj.days_ids.value : [(new Date(batchBookTripObj.start_date.value).getDay()) + 1],
            meta: JSON.stringify(batchBookTripObj.selectedRoute.value),
            start_date: batchBookTripObj?.start_date.value,
            end_date: endDate.value,
            recurring: batchBookTripObj?.has_subscription.value ? 1 : 0,
            payment_source: batchBookTripObj?.payment_source.value,
            additional_charges_id: selectedRoute_charges.value.filter((el) => el.selected).map((obj) => obj.id)
        }
        if (batchBookTripObj.luggage_quantity.value) {
            booking.luggage_quantity = batchBookTripObj.luggage_quantity.value
        }
        if (batchBookTripObj.payment_source.value === 'instant_payment') {
            booking.payment_reference = uuidv4()
            booking.instant_payment_provider = 'corporate_pay'
        }
        const payload: Record<string, any> = {
            booking,
            users: batchBookTripObj.emails.value,
            should_book_return_trip: batchBookTripObj.has_return.value
        }
        loading.value = true
        const res = await batch_booking_api.$_create_batch_booking(payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Batch booking request was created successfully' })
            useRouter().push(`/users/bookings/${res.data?.id}/booking-info`)
        }
        loading.value = false
    }
    return { ...batchBookTripObj, itineraries, loading, pickupBusstops, dropoff_busstops, loading_iti, bus_stops, loading_bus_stops, tripFare, total_fare, total_pay, selectedRoute_charges, batchBookTrip, clearBatchBookTripObj, enableButton, returnTripItinerary, returnTripLoading }
}
