import { routes_api, CustomAxiosResponse } from '@/api_factory/modules'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
import { useAlert } from '@/composables/core/notification'

const obj = {
    pickup: ref(''),
    destination: ref(''),
    visibility: ref('public') as Ref<'public'|'private'>,
    route_availability: ref('everyday') as Ref<'everyday'|'selected_days'>,
    route_availability_days: ref([]) as Ref<any[]>,
    corporate: ref({}) as Ref<Record<string, any>>,
    is_future_route: ref(false),
    is_exclusive: ref('shared') as Ref<'shared'|'exclusive'>,
    route_code: ref(''),
    desc: ref(''),
    startLocation: ref({}) as Ref<Record<string, any>>,
    endLocation: ref({}) as Ref<Record<string, any>>,
    otherStops: ref([]) as Ref<any[]>,
    itinerary_time: ref(''),
    fare: ref(''),
    avail_start_date: ref(''),
    avail_end_date: ref(''),
    unavailable_days: ref([]) as Ref<string[]>
}

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
}
const polyLine = ref([]) as Ref<Record<string, any>[]>
const activeRoute = ref({}) as Ref<Record<string, any>>

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

const loading = ref(false)
export const useCreateRoute = () => {
	const createRoute = async () => {
		loading.value = true
        const payload = {
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
            payload.route_availability_days = [
                'sunday',
                'monday',
                'tuesday',
                'wednesday',
                'thursday',
                'friday',
                'saturday'
            ]
        }
		// const res = await routes_api.$_create_route(convertObjWithRefToObj(createForm)) as CustomAxiosResponse
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
	return { loading, ...obj, createRoute, getRouteDirection, polyLine, legTotalDurationValue, clearObj }
}
