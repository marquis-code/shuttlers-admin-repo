import { ref } from 'vue'
import { singleItinerary } from '../fetch'
import { useItineraryDrivers } from './fetch'
import { routes_api, drivers_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { useDriverModal } from '@/composables/core/modals'

interface EditObjectInterface {
	[key: string] : any
}
const editObj: EditObjectInterface = ref({}) as any

interface ObjectInterface {
	driver: Ref<Record<string, any>>;
	break_even: number | any;
	cost_of_supply: number | any;
	pricing_margin: number | any;
	pricing_unit: string | any;
	id: Ref<null|number>;
}
const obj: ObjectInterface = {
	driver: ref({}) as Ref<Record<string, any>>,
	break_even: ref(0.7) as Ref<number>,
	cost_of_supply: ref(0) as Ref<number>,
	pricing_margin: ref(25) as Ref<number>,
	pricing_unit: ref('percent') as Ref<string>,
	id: ref(null) as Ref<null|number>
}
const loading = ref(false)
const loading_cost_of_supply = ref(false)
const isEdit = ref(false)

const clearObj = () => {
	obj.driver.value = {}
	obj.break_even.value = 0.7
	obj.cost_of_supply.value = 0
	obj.pricing_margin.value = 25
	obj.pricing_unit.value = 'percent'
	isEdit.value = false
}

export const useAddDriver = () => {
	const addDriver = async () => {
		const routeId = useRoute().params.id as string
		const iti_id = useRoute().params.iti_id as string
		const payload:Record<string, any> = {
			route_id: routeId,
			cost_of_supply: obj.cost_of_supply.value,
			itinerary_id: iti_id
		}
		if (singleItinerary.value.pricing_type !== 'route_price_table_lookup') {
			payload.break_even_utilization = obj.break_even.value
			payload.pricing_margin_unit = obj.pricing_unit.value
			payload.pricing_margin = obj.pricing_margin.value
		}
		loading.value = true
		const res = await drivers_api.$_assign_driver_to_route(obj.driver.value!.id, payload) as CustomAxiosResponse
		if (res.type !== 'ERROR') {
			useDriverModal().closeAddDriver()
			useAlert().openAlert({ type: 'SUCCESS', msg: 'Driver added successfully' })
			useItineraryDrivers().getItineraryDrivers()
		}
		loading.value = false
	}

	const getVehicleCostOfSupply = async () => {
		const vehicle_id = obj.driver.value.vehicle?.id
		if (!vehicle_id) {
			useAlert().openAlert({ type: 'Alert', msg: 'This driver has no vehicle' })
			return
		}
		loading_cost_of_supply.value = true
		const res = await routes_api.$_get_vehicle_cost_of_supply(useRoute().params.iti_id as string, vehicle_id) as CustomAxiosResponse
		if (res.type !== 'ERROR') {
			obj.cost_of_supply.value = res.data?.cost_of_supply ? res.data.cost_of_supply : 0
		}
		loading_cost_of_supply.value = false
	}

	const initEdit = (data:Record<string, any>) => {
		editObj.value = data
		obj.id.value = data.id
		obj.driver.value = { ...data.driver }
		if (data.vehicle?.id) obj.driver.value.vehicle = data.vehicle
		obj.break_even.value = data.break_even_utilization
		obj.cost_of_supply.value = data.cost_of_supply
		obj.pricing_margin.value = data.pricing_margin
		obj.pricing_unit.value = data.pricing_margin_unit
		isEdit.value = true
		useDriverModal().openAddDriver()
	}

	const updateDriver = async () => {
		const routeId = useRoute().params.id as string
		const iti_id = useRoute().params.iti_id as string
		const payload:Record<string, any> = {
			route_id: routeId,
			cost_of_supply: obj.cost_of_supply.value,
			itinerary_id: iti_id
		}
		if (singleItinerary.value.pricing_type !== 'route_price_table_lookup') {
			payload.break_even_utilization = obj.break_even.value
			payload.pricing_margin_unit = obj.pricing_unit.value
			payload.pricing_margin = obj.pricing_margin.value
			payload.driver_id = editObj.value.driver.id
			payload.vehicle_id = editObj.value.vehicle.id
		}
		loading.value = true
		const res = await drivers_api.$_update_assigned_driver_to_route(obj.id.value!, payload) as CustomAxiosResponse
		if (res.type !== 'ERROR') {
			useDriverModal().closeAddDriver()
			useAlert().openAlert({ type: 'SUCCESS', msg: 'Driver updated successfully' })
			useItineraryDrivers().getItineraryDrivers()
		}
		loading.value = false
	}

	watch(obj.driver, () => {
		if (obj.driver.value?.id) getVehicleCostOfSupply()
	})

	return { loading, addDriver, ...obj, clearObj, isEdit, loading_cost_of_supply, initEdit, updateDriver }
}
