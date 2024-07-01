import { routes_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { days_of_the_week } from '@/composables/utils/constant'
import { ZeroBookingFlag } from '@/composables/flagging/flags'

const createRouteForm = {
    start_location: ref({} as Record<string, any>),
    end_location: ref({} as Record<string, any>),
    overview_geojson: ref(''),
    bounds: ref({} as Record<string, any>),
    waypoints: ref([] as any[]),
    route_code: ref(''),
    desc: ref(''),
    visibility: ref('public') as Ref<'public' | 'private'>,
    is_exclusive: ref('shared') as Ref<'shared' | 'exclusive'>,
    is_zero_booked_shared_route: ref(false),
    corporate: ref({}) as Ref<Record<string, any>>,
    route_availability: ref('everyday') as Ref<'everyday' | 'selected_days'>,
    avail_start_date: ref(''),
    avail_end_date: ref(''),
    unavailable_days: ref([]) as Ref<string[]>,
    route_availability_days: ref([...days_of_the_week]) as Ref<any[]>,
    itinerary_time: ref(''),
    fare: ref(''),
    sales_route_suggestion_id: ref(''),
    route_owner_type: ref(''),
    route_owner: ref({}) as Ref<Record<string, any>>,
    payer: ref(''),
    payment_mode: ref('')
}

const clearCreateForm = () => {
    createRouteForm.start_location.value = {}
    createRouteForm.end_location.value = {}
    createRouteForm.overview_geojson.value = ''
    createRouteForm.waypoints.value = []
    createRouteForm.bounds.value = {}
    createRouteForm.route_code.value = ''
    createRouteForm.desc.value = ''
    createRouteForm.visibility.value = 'public'
    createRouteForm.is_exclusive.value = 'shared'
    createRouteForm.corporate.value = {}
    createRouteForm.route_availability.value = 'everyday'
    createRouteForm.avail_start_date.value = ''
    createRouteForm.avail_end_date.value = ''
    createRouteForm.unavailable_days.value = []
    createRouteForm.route_availability_days.value = [...days_of_the_week]
    createRouteForm.itinerary_time.value = ''
    createRouteForm.fare.value = ''
    createRouteForm.route_owner_type.value = ''
    createRouteForm.route_owner.value = {}
    createRouteForm.payer.value = ''
    createRouteForm.payment_mode.value = ''
}

const populateRouteData = (data:Record<string, any>) => {
    createRouteForm.route_code.value = data?.route_code
    createRouteForm.desc.value = data?.info?.description
    createRouteForm.visibility.value = data?.visibility
    createRouteForm.is_exclusive.value = data?.is_exclusive ? 'exclusive' : 'shared'
    createRouteForm.is_zero_booked_shared_route.value = data?.is_zero_booked_shared_route === 1
    createRouteForm.corporate.value = data?.corporate?.id ? data?.corporate : null
    createRouteForm.route_availability.value = JSON.parse(data?.route_availability_days).length !== 7 ? 'selected_days' : 'everyday'
    createRouteForm.route_availability_days.value = JSON.parse(data?.route_availability_days)
    createRouteForm.avail_start_date.value = data?.route_availability_start_date
    createRouteForm.avail_end_date.value = data?.route_availability_end_date
    createRouteForm.unavailable_days.value = data?.blacklisted_availability_days_list
    createRouteForm.route_owner_type.value = data?.owner_type
    createRouteForm.route_owner.value = { id: data?.owner_id }
    createRouteForm.payer.value = data?.payer
    createRouteForm.payment_mode.value = data?.payment_mode
    createRouteForm.start_location.value = {
        name: data?.pickup,
        lat: data?.pickup_geometry?.y,
        lng: data?.pickup_geometry?.x
    }
    createRouteForm.end_location.value = {
        name: data?.destination,
        lat: data?.destination_geometry?.y,
        lng: data?.destination_geometry?.x
    }
}

const ploylineLoading = ref(false)

const startPosition = computed(() => {
    if (createRouteForm.start_location.value) {
        return { y: createRouteForm.start_location.value.lat, x: createRouteForm.start_location.value.lng }
    } else {
        return null
    }
})

const endPosition = computed(() => {
    if (createRouteForm.end_location.value) {
        return { y: createRouteForm.end_location.value.lat, x: createRouteForm.end_location.value.lng }
    } else {
        return null
    }
})

const waypoints = computed(() => {
    if (createRouteForm.waypoints.value.length > 0) {
        return createRouteForm.waypoints.value.map((i) => {
            if (i.data.lat) {
                return `${i.data.lat}, ${i.data.lng}`
            }
            return null
        }).filter((i) => i !== null)
    } else {
        return []
    }
})

// Refs to store previous coordinates
const prevStartPosition = ref({ x: null, y: null })
const prevEndPosition = ref({ x: null, y: null })
const prevWaypointsLength = ref(0)

const polyline = computed(async () => {
    if (startPosition.value?.x && endPosition.value?.x) {
        // Check if coordinates are different from previous ones
        if (
            startPosition.value.x !== prevStartPosition.value.x ||
            startPosition.value.y !== prevStartPosition.value.y ||
            endPosition.value.x !== prevEndPosition.value.x ||
            endPosition.value.y !== prevEndPosition.value.y || waypoints.value.length !== prevWaypointsLength.value
        ) {
            const sent_data = {
                endPoint: `${endPosition.value.y} ${endPosition.value.x}`,
                startPoint: `${startPosition.value.y} ${startPosition.value.x}`
            } as Record<string, any>
            if (waypoints.value && waypoints.value.length > 0) {
                sent_data.waypoints = waypoints.value
            }
            prevWaypointsLength.value = waypoints.value.length
            ploylineLoading.value = true
            const res = (await routes_api.$_get_route_direction(sent_data)) as CustomAxiosResponse
            if (res.type !== 'ERROR' && res.data.data?.routes[0]?.overview_polyline) {
                ploylineLoading.value = false
                createRouteForm.overview_geojson.value = res.data.data.routes[0].overview_geojson
                createRouteForm.bounds.value = res.data.data.routes[0].bounds

                // Update previous coordinates
                prevStartPosition.value = { ...startPosition.value }
                prevEndPosition.value = { ...endPosition.value }

                return JSON.stringify(res.data.data.routes[0].overview_polyline)
            }

            // Update previous coordinates even if API call fails or returns no route
            prevStartPosition.value = { ...startPosition.value }
            prevEndPosition.value = { ...endPosition.value }

            return null
        }
    }
    return null
})

const fetchingRoute = ref(false)
const loading = ref(false)

export const useCreateRoute = () => {
    const create = async () => {
        loading.value = true
        let payload = {
            destination: createRouteForm.end_location.value.name,
            pickup: createRouteForm.start_location.value.name,
            day_of_week: 'MON - FRI',
            start_location: {
                lat: startPosition.value?.y,
                lng: startPosition.value?.x
            },
            end_location: {
                lat: endPosition.value?.y,
                lng: endPosition.value?.x
            },
            route_preview: JSON.parse(createRouteForm.overview_geojson.value),
            bounds: createRouteForm.bounds.value,
            route_code: createRouteForm.route_code.value,
            info: {
                description: createRouteForm.desc.value
            },
            visibility: createRouteForm.visibility.value,
            is_exclusive: createRouteForm.is_exclusive.value === 'exclusive' ? 1 : 0,
            corporate_id: createRouteForm.corporate.value?.id,
            route_availability_end_date: createRouteForm.avail_end_date.value,
            route_availability_start_date: createRouteForm.avail_start_date.value,
            blacklisted_availability_days: createRouteForm.unavailable_days.value,
            route_availability: createRouteForm.route_availability.value,
            route_availability_days: createRouteForm.route_availability_days.value,
            itineraries: [
                {
                    id: 1,
                    time: createRouteForm.itinerary_time.value,
                    fare: createRouteForm.fare.value
                }
            ]

        } as Record<string, any>
        if (ZeroBookingFlag()) {
            payload.is_zero_booked_shared_route = createRouteForm.is_zero_booked_shared_route.value
        }
        if (createRouteForm.waypoints.value.length > 0) {
            payload.waypoints = createRouteForm.waypoints.value
        }
        if (createRouteForm.sales_route_suggestion_id.value) {
            payload.sales_route_suggestion_id = createRouteForm.sales_route_suggestion_id.value
        }

            payload = removeFalsyElement(payload)

        const res = (await routes_api.$_create_route(payload)) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Route was created successfully' })
            if (res.data?.id)
                useRouter().push(`/trips/routes/${res.data?.id}/details`)
            clearCreateForm()
        }
        loading.value = false
    }

    const initEditRoute = async () => {
        fetchingRoute.value = true
        const routeId = useRoute().params.id as string
        const res = (await routes_api.$_get_route_by_id(routeId)) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            populateRouteData(res.data?.id ? res.data : {})
        }
        fetchingRoute.value = false
    }

    const update = async () => {
        const payload:Record<string, any> = {
            payer: createRouteForm.payer.value,
            payment_mode: createRouteForm.payment_mode.value,
            owner_type: createRouteForm.route_owner_type.value,
            is_exclusive: createRouteForm.is_exclusive.value === 'exclusive' ? 1 : 0,

            visibility: createRouteForm.visibility.value,
            route_availability_days: createRouteForm.route_availability_days.value,
            route_code: createRouteForm.route_code.value,
            info: {
                description: createRouteForm.desc.value
            },
            route_availability_end_date: createRouteForm.avail_end_date.value,
            route_availability_start_date: createRouteForm.avail_start_date.value,
            blacklisted_availability_days: createRouteForm.unavailable_days.value,
            corporate_id: createRouteForm.corporate.value?.id || null,
            start_location: {
                lat: startPosition.value?.y,
                lng: startPosition.value?.x
            },
            end_location: {
                lat: endPosition.value?.y,
                lng: endPosition.value?.x
            },
            destination: createRouteForm.end_location.value.name,
            pickup: createRouteForm.start_location.value.name,
            route_preview: JSON.parse(createRouteForm.overview_geojson.value),
            bounds: createRouteForm.bounds.value
        }

        if (ZeroBookingFlag()) {
            payload.is_zero_booked_shared_route = createRouteForm.is_zero_booked_shared_route.value
        }
        if (createRouteForm.route_owner_type.value !== 'system') {
            payload.owner_id = createRouteForm.route_owner.value?.id || null
        }

        loading.value = true
        const routeId = useRoute().params.id as string
        const res = await routes_api.$_update_route(routeId, payload) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Route was updated successfully' })
            if (res.data?.id) useRouter().push(`/trips/routes/${res.data?.id}/details`)
            clearCreateForm()
        }
        loading.value = false
    }

    return { createRouteForm, startPosition, endPosition, loading, polyline, create, ploylineLoading, initEditRoute, fetchingRoute, clearCreateForm, update }
}

const removeFalsyElement = (object) => {
    const newObject = {}
    Object.keys(object).forEach((key) => {
        if (object[key]) {
            newObject[key] = object[key]
        }
    })
    return newObject
}

export const getRouteById = async (id: string) => {
    return await routes_api.$_get_route_by_id(id)
}
export const getRouteBusstopsById = async (id: string) => {
    return await routes_api.$_get_routes_busstops(id)
}
