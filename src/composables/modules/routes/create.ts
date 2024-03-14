import { routes_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { days_of_the_week } from '@/composables/utils/constant'

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
    corporate: ref({}) as Ref<Record<string, any>>,
    route_availability: ref('everyday') as Ref<'everyday' | 'selected_days'>,
    avail_start_date: ref(''),
    avail_end_date: ref(''),
    unavailable_days: ref([]) as Ref<string[]>,
    route_availability_days: ref([...days_of_the_week]) as Ref<any[]>,
    itinerary_time: ref(''),
    fare: ref('')
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
    if (createRouteForm.start_location.value) {
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
        return null
    }
})

const polyline = computed(async () => {
    if (startPosition.value?.x && endPosition.value?.x) {
        const sent_data = {
            endPoint: `${endPosition.value.y} ${endPosition.value.x}`,
            startPoint: `${startPosition.value.y} ${startPosition.value.x}`
        } as Record<string, any>
        if (waypoints.value && waypoints.value.length > 0) {
            sent_data.waypoints = waypoints.value
        }
        ploylineLoading.value = true
        const res = (await routes_api.$_get_route_direction(sent_data)) as CustomAxiosResponse
        if (res.type !== 'ERROR' && res.data.data?.routes[0]?.overview_polyline) {
            ploylineLoading.value = false
            createRouteForm.overview_geojson.value = res.data.data.routes[0].overview_geojson
            createRouteForm.bounds.value = res.data.data.routes[0].bounds
            return JSON.stringify(res.data.data.routes[0].overview_polyline)
        }

        return null
    }
})

export const useCreateRoute = () => {
    const loading = ref(false)

    const create = async () => {
        loading.value = true
        const payload = {
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
            corporate_id: createRouteForm.corporate.value?.id || null,
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
        if (createRouteForm.waypoints.value.length > 0) {
            payload.waypoints = createRouteForm.waypoints.value
        }

        const res = (await routes_api.$_create_route(payload)) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Route was created successfully' })
            if (res.data?.id)
                useRouter().push(`/trips/routes/${res.data?.id}/details`)
            clearCreateForm()
        }
        loading.value = false
    }
    return { createRouteForm, startPosition, endPosition, loading, polyline, create, ploylineLoading }
}
