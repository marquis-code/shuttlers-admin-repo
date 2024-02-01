import { routes_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { useConfirmationModal } from '@/composables/core/confirmation'

const path = ref([]) as Ref<Record<string, any>>
const routeDetails = ref({}) as Ref<Record<string, any>>
const loading = ref(false)
const editing_busstop = ref(false)
const adding_busstop = ref(false)
const fetching_busstops = ref(false)
const busstopsList = ref([] as any)
const deleting = ref(false)
const center = computed(() => {
	if (path.value.length) {
		return path.value[Math.floor(path.value.length / 2)]
	}
	return {}
})
const to_delete_busstop = ref({}) as Ref<Record<string, any>>
const new_busstop_position = ref({}) as Ref<{lat: number; lng: number}>
const open_new_busstop_window = ref(false)
const can_click = ref(false)

export const useRouteBustopMap = () => {
	const reloadBusStopMap = () => {
		open_new_busstop_window.value = false
		can_click.value = false
		const id = useRoute().params.id as string
		getRouteBusstopsById(id)
		getRouteGeometry(id)
	}
	const getRouteBusstopsById = async (id: string) => {
        fetching_busstops.value = true
        const res = await routes_api.$_get_routes_busstops(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            busstopsList.value = res.data.data
        }
        fetching_busstops.value = false
    }

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

	const editBusStop = async (id: number|string, payload: Record<string, any>) => {
		editing_busstop.value = true
		const res = await routes_api.$_edit_busstop(id, payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			useAlert().openAlert({ type: 'SUCCESS', msg: 'Busstop updated successfully' })
			reloadBusStopMap()
        }
		editing_busstop.value = false
	}

	const initDeleteBusstop = (busStop: Record<string, any>) => {
		to_delete_busstop.value = busStop
		useConfirmationModal().openAlert({ call_function: deleteBusstop, desc: 'Are you sure you want to delete this bus-stop?', title: 'Delete bus-stop', loading: deleting, type: 'DANGER' })
	}

	const deleteBusstop = async () => {
		deleting.value = true
		const res = await routes_api.$_delete_busstop(to_delete_busstop.value.id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			useConfirmationModal().closeAlert()
			useAlert().openAlert({ type: 'SUCCESS', msg: 'Busstop deleted successfully' })
			reloadBusStopMap()
        }
		deleting.value = false
	}

	const createBusstop = async (payload: Record<string, any>) => {
		const id = useRoute().params.id as string
		adding_busstop.value = true
		const res = await routes_api.$_create_busstop(id, payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			useAlert().openAlert({ type: 'SUCCESS', msg: 'Busstop created successfully' })
			reloadBusStopMap()
        }
		adding_busstop.value = false
	}

	return { loading, path, getRouteGeometry, center, routeDetails, editBusStop, editing_busstop, initDeleteBusstop, new_busstop_position, open_new_busstop_window, adding_busstop, createBusstop, reloadBusStopMap, fetching_busstops, getRouteBusstopsById, busstopsList, can_click }
}
