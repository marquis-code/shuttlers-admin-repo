import moment from 'moment'
import { routes_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'

const all_days = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
]
const obj = {
    pickup: ref(''),
    destination: ref(''),
    visibility: ref('public') as Ref<'public' | 'private'>,
    route_availability: ref('everyday') as Ref<'everyday' | 'selected_days'>,
    route_availability_days: ref([]) as Ref<any[]>,
    corporate: ref({}) as Ref<Record<string, any>>,
    is_future_route: ref(false),
    is_exclusive: ref('shared') as Ref<'shared' | 'exclusive'>,
    route_code: ref(''),
    desc: ref(''),
    startLocation: ref({}) as Ref<Record<string, any>>,
    endLocation: ref({}) as Ref<Record<string, any>>,
    otherStops: ref([]) as Ref<any[]>,
    itinerary_time: ref(''),
    fare: ref(''),
    avail_start_date: ref(''),
    avail_end_date: ref(''),
    unavailable_days: ref([]) as Ref<string[]>,
    status: ref('active') as Ref<'active'|'inactive'>,
    route_owner_type: ref('system'),
    route_owner: ref({}),
    who_pays: ref(''),
    payment_mode: ref('pre-trip') as Ref<'pre-trip'|'post-trip'>
}
const loading = ref(false)
const loading_details = ref(false)
const polyLine = ref([]) as Ref<Record<string, any>[]>
const activeRoute = ref({}) as Ref<Record<string, any>>
const showDatePicker = ref(false)

const legTotalDurationValue = computed(() => {
    let total = 0
    activeRoute.value?.legs?.forEach((el) => {
        total += el?.duration?.value
    })
    return total
})
const legTotalDurationText = computed(() => {
    return legTotalDurationValue.value ? `${Math.floor(legTotalDurationValue.value / 60)} mins` : '0 mins'
})
const legTotalDistanceValue = computed(() => {
    let total = 0
    activeRoute.value?.legs?.forEach((el) => {
        total += el?.distance?.value
    })
    return total
})
const legTotalDistanceText = computed(() => {
    return legTotalDistanceValue.value ? `${(legTotalDistanceValue.value / 1000).toFixed(2)} km` : '0 km'
})
const center = computed(() => {
    if (polyLine.value.length) return polyLine.value[(Math.floor(polyLine.value.length / 2))]
    if (obj.startLocation.value?.lat && obj.endLocation.value?.lat) {
        return { lat: obj.startLocation.value.lat, lng: obj.startLocation.value.lng }
    } else {
        return { lat: 51.093048, lng: 6.84212 }
    }
})

const clearObj = () => {
    obj.pickup.value = ''
    obj.destination.value = ''
    obj.visibility.value = 'public'
    obj.route_availability.value = 'everyday'
    obj.route_availability_days.value = []
    obj.corporate.value = {}
    obj.is_exclusive.value = 'shared'
    obj.route_code.value = ''
    obj.desc.value = ''
    obj.startLocation.value = {}
    obj.endLocation.value = {}
    obj.otherStops.value = []
    obj.itinerary_time.value = ''
    obj.fare.value = ''
    obj.avail_start_date.value = ''
    obj.avail_end_date.value = ''
    obj.unavailable_days.value = []
    polyLine.value = []
    activeRoute.value = {}
    showDatePicker.value = false
    obj.status.value = 'active'
}
const selectedStartAddress = (val: Record<string, any>) => {
    obj.startLocation.value = val
    obj.pickup.value = val?.name
}
const selectedEndAddress = (val: Record<string, any>) => {
    obj.endLocation.value = val
    obj.destination.value = val?.name
}
const handleSelectedDay = (n: string) => {
    if (!obj.route_availability_days.value.includes(n)) {
        obj.route_availability_days.value.push(n)
    } else {
        const index = obj.route_availability_days.value.indexOf(n)
        obj.route_availability_days.value.splice(index, 1)
    }
}
const handleUnavailableDate = (val: string) => {
    if (!obj.unavailable_days.value.includes(val)) {
        obj.unavailable_days.value.push(val)
        showDatePicker.value = !showDatePicker.value
    } else {
        useAlert().openAlert({
            type: 'ERROR',
            msg: `${val} has already been added.`
        })
    }
}
const removeUnavailableDay = (val: string) => {
    const index = obj.unavailable_days.value.indexOf(val)
    obj.unavailable_days.value.splice(index, 1)
}
const populateFields = (data: Record<string, any>) => {
    obj.pickup.value = data?.pickup
    obj.destination.value = data?.destination
    obj.visibility.value = data?.visibility
    obj.route_availability.value = JSON.parse(data?.route_availability_days).length === 7 ? 'everyday' : 'selected_days'
    obj.route_availability_days.value = JSON.parse(data?.route_availability_days)
    obj.corporate.value = data?.corporate_id ? data.corporate_id : {}
    obj.is_exclusive.value = data?.is_exclusive === 0 ? 'shared' : 'exclusive'
    obj.route_code.value = data?.route_code
    obj.desc.value = data?.info?.description
    obj.startLocation.value = { lat: data?.pickup_geometry?.y, lng: data?.pickup_geometry?.x }
    obj.endLocation.value = { lat: data?.destination_geometry?.y, lng: data?.destination_geometry?.x }
    // obj.otherStops.value = []
    // obj.itinerary_time.value = ''
    // obj.fare.value = ''
    obj.avail_start_date.value = data?.route_availability_start_date ? moment(data?.route_availability_start_date).format('YYYY-MM-DD') : ''
    obj.avail_end_date.value = data?.route_availability_end_date ? moment(data?.route_availability_end_date).format('YYYY-MM-DD') : ''
    obj.unavailable_days.value = data?.blacklisted_availability_days_list
    obj.status.value = data?.status ? 'active' : 'inactive'
    obj.route_owner_type.value = data?.owner_type
    obj.route_owner.value = data?.owner_id
    obj.who_pays.value = data?.payer
    obj.payment_mode.value = data?.payment_mode
}

export const useCreateRoute = () => {
    const createRoute = async () => {
        loading.value = true
        const payload: Record<string, any> = {
            pickup: obj.pickup.value,
            destination: obj.destination.value,
            day_of_week: 'MON - FRI',
            visibility: obj.visibility.value,
            corporate_id: obj.corporate.value?.id || null,
            is_future_route: obj.is_future_route.value,
            is_exclusive: obj.is_exclusive.value === 'exclusive' ? 1 : 0,
            route_code: obj.route_code.value,
            info: {
                description: obj.desc.value
            },
            route_preview: JSON.parse(activeRoute.value.overview_geojson),
            bounds: activeRoute.value.bounds,
            duration_value: legTotalDurationValue.value,
            distance_value: legTotalDistanceValue.value,
            duration: legTotalDurationText.value,
            distance: legTotalDistanceText.value,
            start_location: { lat: obj.startLocation.value?.lat, lng: obj.startLocation.value?.lng },
            end_location: { lat: obj.endLocation.value?.lat, lng: obj.endLocation.value?.lng },
            itineraries: [
                {
                    id: 1,
                    time: obj.itinerary_time.value,
                    fare: obj.fare.value
                }
            ],
            route_availability_end_date: obj.avail_end_date.value,
            route_availability_start_date: obj.avail_start_date.value,
            blacklisted_availability_days: obj.unavailable_days.value
        }
        if (obj.route_availability.value === 'everyday') {
            payload.route_availability_days = all_days
        } else {
            payload.route_availability_days = obj.route_availability_days.value
        }
        const res = await routes_api.$_create_route(payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({
                type: 'SUCCESS',
                msg: 'Route was created successfully'
            })
            if (res.data?.id) useRouter().push(`/trips/routes/${res.data?.id}/details`)
            clearObj()
        }
        loading.value = false
    }

    const updateRoute = async () => {
        loading.value = true
        const payload: Record<string, any> = {
            pickup: obj.pickup.value,
            destination: obj.destination.value,
            day_of_week: 'MON - FRI',
            visibility: obj.visibility.value,
            corporate_id: obj.corporate.value?.id || null,
            is_future_route: obj.is_future_route.value,
            is_exclusive: obj.is_exclusive.value === 'exclusive' ? 1 : 0,
            route_code: obj.route_code.value,
            info: {
                description: obj.desc.value
            },
            route_preview: JSON.parse(activeRoute.value.overview_geojson),
            bounds: activeRoute.value.bounds,
            duration_value: legTotalDurationValue.value,
            distance_value: legTotalDistanceValue.value,
            duration: legTotalDurationText.value,
            distance: legTotalDistanceText.value,
            start_location: { lat: obj.startLocation.value?.lat, lng: obj.startLocation.value?.lng },
            end_location: { lat: obj.endLocation.value?.lat, lng: obj.endLocation.value?.lng },
            route_availability_end_date: obj.avail_end_date.value,
            route_availability_start_date: obj.avail_start_date.value,
            blacklisted_availability_days: obj.unavailable_days.value,
            owner_type: obj.route_owner_type.value,
            owner_id: obj.route_owner.value?.id || obj.route_owner.value?.id,
            payer: obj.who_pays.value,
            payment_mode: obj.payment_mode.value,
            status: obj.status.value === 'active' ? 1 : 0
        }
        if (obj.route_availability.value === 'everyday') {
            payload.route_availability_days = all_days
        } else {
            payload.route_availability_days = obj.route_availability_days.value
        }
        const id = useRoute().params.id as string
        const res = await routes_api.$_update_route(id, payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({
                type: 'SUCCESS',
                msg: 'Route was updated successfully'
            })
            if (res.data?.id) useRouter().push(`/trips/routes/${res.data?.id}/details`)
            clearObj()
        }
        loading.value = false
    }

    const getRouteDirection = async (payload: Record<string, any>) => {
        polyLine.value = []
        const res = await routes_api.$_get_route_direction(payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            activeRoute.value = res.data?.data?.routes[0]
            const arr = JSON.parse(res.data?.data?.routes[0]?.overview_geojson)
            polyLine.value = arr.coordinates.map((el) => {
                return { lng: el[0], lat: el[1] }
            })
        }
    }

    watch([obj.startLocation, obj.endLocation], () => {
        if (obj.startLocation.value.lat && obj.endLocation.value?.lat) {
            const payload = {
                startPoint: `${obj.startLocation.value?.lat},${obj.startLocation.value?.lng}`,
                endPoint: `${obj.endLocation.value?.lat},${obj.endLocation.value?.lng}`
                // waypoints: [
                // 	"6.5532932,3.3370028",
                // 	"6.529884999999998,3.353477"
                // ]
            }
            getRouteDirection(payload)
        }
    })

    const getRouteDetailsToPrefillFields = async (routeId: string|number) => {
        loading_details.value = true
        const res = await routes_api.$_get_route_by_id(routeId) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            if (res?.data?.id) {
                populateFields(res.data)
            } else {
                useAlert().openAlert({ type: 'WARNING', msg: 'Unable to fetch route details' })
            }
        }
        loading_details.value = false
    }
    return { loading, ...obj, createRoute, getRouteDirection, polyLine, legTotalDurationValue, clearObj, all_days, center, selectedStartAddress, selectedEndAddress, handleSelectedDay, handleUnavailableDate, removeUnavailableDay, showDatePicker, getRouteDetailsToPrefillFields, loading_details, updateRoute }
}
