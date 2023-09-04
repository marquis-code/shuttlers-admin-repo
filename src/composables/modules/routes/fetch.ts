import { routes_api, CustomAxiosResponse } from '@/api_factory/modules'

export const useGetRecentRoutesList = () => {
    const loadingRoutes = ref(false)
    const routesList = ref([] as any)

    const { $_recent_routes } = routes_api

    const getRoutesList = async () => {
        loadingRoutes.value = true

        const res = await $_recent_routes() as CustomAxiosResponse

        if (res.type !== 'Error') {
            routesList.value = res.data
        }
        loadingRoutes.value = false
    }

    return { getRoutesList, loadingRoutes, routesList }
}
