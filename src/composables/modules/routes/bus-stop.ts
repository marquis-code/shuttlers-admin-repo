import { routes_api, CustomAxiosResponse } from '@/api_factory/modules'

const path = ref([]) as Ref<Record<string, any>>
const routeDetails = ref({}) as Ref<Record<string, any>>
const loading = ref(false)
const center = computed(() => {
	if (path.value.length) {
		return path.value[Math.floor(path.value.length / 2)]
	}
	return {}
})

export const useRouteBustopMap = () => {
	const getRouteGeometry = async (id: string) => {
        path.value = []
        loading.value = true
        const res = await routes_api.$_get_route_by_id(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			routeDetails.value = res.data?.id ? res.data : {}
			if (res.data.geometry.length) {
				path.value = res.data.geometry.map((el) => { return { lat: el.y, lng: el.x } })
			} else {
				path.value = []
			}
        }
        loading.value = false
    }

	return { loading, path, getRouteGeometry, center, routeDetails }
}
