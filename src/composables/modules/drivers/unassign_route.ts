import { drivers_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { useDriverModal } from '@/composables/core/modals'
import { useDriverIdDetails } from '@/composables/modules/drivers'
const { getDriverById, selectedDriver } = useDriverIdDetails()

const obj = {
	assign: ref(true),
	route: ref({}) as Ref<Record<string, any>>
}
const loading = ref(false)
const clearObj = () => {
	obj.assign.value = true
	obj.route.value = {}
}
const id = useRoute().params.id as string

export const useUnAssignRouteToDriver = () => {
	const unassignRoute = async (routeId: string) => {
		loading.value = true
		// const id = useRoute().params.id as string
		const payload = {
			route_id: routeId
		}
		const res = await drivers_api.$_unassign_driver_to_route(id, payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			useDriverModal().closeAssignRoute()
			useAlert().openAlert({ type: 'SUCCESS', msg: 'Route has been unassigned successfully' })
			getDriverById(id)
			useRouter().push(`/drivers/${id}/driver-info`)
        }
		loading.value = false
	}

	return { loading, unassignRoute, ...obj, clearObj, selectedDriver }
}
