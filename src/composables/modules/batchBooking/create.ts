import { useDateFormat } from '@vueuse/core'
import { batch_booking_api, routes_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { useItinerariesByRouteId } from '@/composables/modules/routes/id'

const { routeItineraries } = useItinerariesByRouteId()

const selectedRoute_charges = ref([] as Record<string, any>[])
const selectedRoute_charges_loading = ref(false)
const batchBookingForm = {
    users: [],
    booking: {
        route_id: '',
        itinerary_id: '',
        pickup_id: '',
        destination_id: '',
        days_ids: [],
        meta: {},
        start_date: '',
        end_date: '',
        recurring: '',
        payment_source: '',
        luggage_quantity: '',
        additional_charges_id: [] as any[]
    }
}
const returnTripItinerary = ref({}) as Record<string, any>
const returnTripLoading = ref(false)

const selectedItinerary = computed(() => {
	return routeItineraries.value.find((itinerary) => itinerary.id === form.route_itinerary_id)
})

const form = reactive({
	selectedRoute: {} as Record<string, any> as any,
	route_id: '',
	route_itinerary_id: null as any,
	pickup_point: null as any,
	drop_off_point: null as any,
	startDate: '',
	payment_source: 'main_balance',
	has_subscription: false,
	has_luggage: false,
	subscriptionDays: [],
	tripWeeks: 0,
	luggage_quantity: '',
	uploadedUsers: [],
    has_return: false
})

const clearObj = () => {
    form.selectedRoute = {}
    form.route_itinerary_id = null
    form.pickup_point = null
    form.drop_off_point = null
    form.has_subscription = false
    form.has_luggage = false
    form.has_return = false
}

watch([selectedItinerary, form], async (val) => {
    if (val[0]?.route_id) {
        selectedRoute_charges_loading.value = true
        const res = await routes_api.$_get_routes_charges(val[0]?.route_id, {
            price_per_trip: val[0]?.default_fare,
            no_of_trips: 1 * (form.subscriptionDays.length > 0 ? form.subscriptionDays.length : 1) * (form.tripWeeks > 0 ? form.tripWeeks : 1)
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
        selectedRoute_charges_loading.value = false
    }
})

watch([() => form.selectedRoute, () => form.route_itinerary_id], () => {
    form.has_return = false
})

watch(() => form.has_return, () => {
    if (form.has_return) {
        returnTripItinerary.value = {}
        if (selectedItinerary.value?.itinerary_pair_id) {
            getReturnTripDetails(selectedItinerary.value.itinerary_pair_id)
        } else {
            useAlert().openAlert({ type: 'ERROR', msg: 'This trip doesnt have a return trip paired' })
            form.has_return = false
        }
    }
})

const isFormEmpty = computed(() => {
	return !!(form.selectedRoute && form.route_itinerary_id && form.pickup_point && form.drop_off_point && form.startDate && form.payment_source && form.uploadedUsers)
})

const routeSelected = (val: any) => {
	form.selectedRoute = val
}

const getReturnTripDetails = async (itinerary_id: number) => {
    returnTripLoading.value = true
    const res = await routes_api.$_get_single_itinerary_details(itinerary_id) as CustomAxiosResponse
    if (res.type !== 'ERROR') {
        returnTripItinerary.value = res.data?.id ? res.data : {}
    }
    returnTripLoading.value = false
}

const handleUploadedEmails = (item: any) => {
	const result = item.filter((itm: any) => itm !== '')
	form.uploadedUsers = result
}

const addWeeks = (startDate, numberOfWeeks) => {
	const newDate = new Date(startDate)
	const millisecondsInWeek = 7 * 24 * 60 * 60 * 1000
	const resultDate = new Date(newDate.getTime() + numberOfWeeks * millisecondsInWeek)
	return resultDate
}

function subDays(inputDate, numberOfDays) {
	const newDate = new Date(inputDate)
	const resultDate = new Date(newDate.getTime() - numberOfDays * 24 * 60 * 60 * 1000)
	return resultDate
}

const endDate = computed(() => {
	if (form.has_subscription && form.tripWeeks) {
		const _date = addWeeks(form.startDate, form.tripWeeks)
		return useDateFormat(subDays(_date, 1), 'YYYY-MM-DD').value
	}

	return useDateFormat(form.startDate, 'YYYY-MM-DD').value
})

export const useCreateBatchBooking = () => {
    const loading = ref(false)
    const { $_create_batch_booking } = batch_booking_api
    const batchBookingResult = ref({} as Record<string, any>)
    const createBatchBooking = async () => {
        loading.value = true
        batchBookingForm.booking.additional_charges_id = selectedRoute_charges.value.filter((i) => i.selected).map((item: any) => item.id)
        batchBookingForm.should_book_return_trip = form.has_return

        const res = await $_create_batch_booking(batchBookingForm) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: 'New batch booking request was created successfully' })
            batchBookingResult.value = res.data
        }
        loading.value = false
    }

    const populateBatchBookingForm = (data:any) => {
        batchBookingForm.users = data.users
        batchBookingForm.booking.route_id = data?.booking?.route_id
        batchBookingForm.booking.itinerary_id = data?.booking?.itinerary_id
        batchBookingForm.booking.pickup_id = data?.booking?.pickup_id
        batchBookingForm.booking.destination_id = data?.booking?.destination_id
        batchBookingForm.booking.days_ids = data?.booking?.days_ids
        batchBookingForm.booking.meta = data?.booking?.meta
        batchBookingForm.booking.start_date = data?.booking?.start_date
        batchBookingForm.booking.end_date = data?.booking?.end_date
        batchBookingForm.booking.recurring = data?.booking?.recurring
        batchBookingForm.booking.payment_source = data?.booking?.payment_source
        batchBookingForm.booking.luggage_quantity = data?.booking?.luggage_quantity
    }

    return { selectedRoute_charges, selectedRoute_charges_loading, createBatchBooking, loading, populateBatchBookingForm, batchBookingResult, form, isFormEmpty, routeSelected, handleUploadedEmails, endDate, selectedItinerary, returnTripItinerary, returnTripLoading, clearObj }
}
