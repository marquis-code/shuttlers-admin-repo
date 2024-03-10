import { routes_api, CustomAxiosResponse } from '@/api_factory/modules'
export const useGetRouteDirections = () => {
  const polyLine = ref([]) as Ref<Record<string, any>[]>
  const activeRoute = ref({}) as Ref<Record<string, any>>
  const getRouteDirection = async (payload: Record<string, any>) => {
    polyLine.value = []
    const res = (await routes_api.$_get_route_direction(
      payload
    )) as CustomAxiosResponse
    if (res.type !== 'ERROR') {
      activeRoute.value = res.data?.data?.routes[0]
      const arr = JSON.parse(res.data?.data?.routes[0]?.overview_geojson)
      polyLine.value = arr.coordinates.map((el) => {
        return { lng: el[0], lat: el[1] }
      })
    }
  }

  return { getRouteDirection }
}
