// $_duplicate_route
import { routes_api, CustomAxiosResponse } from '@/api_factory/modules'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
import { useAlert } from '@/composables/core/notification'
import { useRouteIdDetails } from '@/composables/modules/routes/id'
import { useRouteModal } from '@/composables/core/modals'
const { getRouteById } = useRouteIdDetails()
const selectedRouteId = ref('')

const routeDuplicateForm = {
    route_id: ref(null),
    new_route_code: ref(''),
    copy_itineraries: ref(null)
}

export const useDuplicateRoute = () => {
	const loading = ref(false)

	const duplicateRoute = async () => {
		loading.value = true
		const res = (await routes_api.$_duplicate_route(
			convertObjWithRefToObj(routeDuplicateForm)
		)) as CustomAxiosResponse
		if (res.type !== 'ERROR') {
			useAlert().openAlert({
				type: 'SUCCESS',
				msg: 'Route has been duplicated successfully.'
			})
			useRouteModal().closeRouteDuplicationModal()
			useRouter().push(`/trips/routes/${res.data.route.id}/details`)
            getRouteById(res.data.route.id)
		}
		loading.value = false
    }

    const prePopulateRouteDuplicationForm = (data: any) => {
        selectedRouteId.value = data.route_id
        routeDuplicateForm.route_id.value = data.route_id
        routeDuplicateForm.new_route_code.value = data.new_route_code
        routeDuplicateForm.copy_itineraries.value = data.copy_itineraries
	}
	return { prePopulateRouteDuplicationForm, duplicateRoute, loading }
}
