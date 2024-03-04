import { useVehicleModal } from '@/composables/core/modals'
import { useAlert } from '@/composables/core/notification'
import { vehicles_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useDriverIdDetails } from '@/composables/modules/drivers'

const update_source = ref('driver')
const obj = {
	id: ref(''),
	name: ref(''),
	brand: ref(''),
	plate_no: ref(''),
	capacity: ref(''),
	type: ref(''),
	code: ref(''),
	amenities: ref(''),
	inventory_type: ref('')
}

// if (update_source.value === 'vehicle') {
// 	obj.inventory_type = ''
// }

const loading = ref(false)
const clearObj = () => {
	obj.id.value = ''
	obj.name.value = ''
	obj.brand.value = ''
	obj.plate_no.value = ''
	obj.capacity.value = ''
	obj.type.value = ''
	obj.code.value = ''
	obj.amenities.value = ''
	obj.inventory_type.value = ''
}

export const useEditVehicles = () => {
	const openEditBus = (data: Record<string, any>) => {
		if (!data?.id) {
			useAlert().openAlert({ type: 'ERROR', msg: 'Vehicle id is compulsory' })
			return
		}
		obj.id.value = data.id
		obj.name.value = data.name
		obj.brand.value = data.brand
		obj.plate_no.value = data.registration_number
		obj.capacity.value = data.seats
		obj.type.value = data.type
		obj.code.value = data.code
		obj.amenities.value = data.amenity_list
		obj.inventory_type = data.inventory_type
		useVehicleModal().openEditBus()
	}

	const updateVehicle = async () => {
		const payload = {
			name: obj.name.value,
			brand: obj.brand.value,
			registration_number: obj.plate_no.value,
			capacity: obj.capacity.value,
			type: obj.type.value,
			code: obj.code.value,
			amenities: obj.amenities.value,
			inventory_type: obj.inventory_type.value
		}

		// if (update_source.value === 'driver') {
		// 	payload.inventory_type = obj?.inventory_type.value
		// }

		// if (update_source.value === 'vehicle') {
		// 	payload.inventory_type = ''
		// }
		loading.value = true
		const res = await vehicles_api.$_update_vehicle(obj.id.value!, payload) as CustomAxiosResponse
		if (res.type !== 'ERROR') {
			useAlert().openAlert({ type: 'SUCCESS', msg: 'Vehicle information has been updated successfully' })
			useVehicleModal().closeEditBus()
			if (useRoute().fullPath.includes('driver-info')) {
				const id = useRoute().params.id as string
				useDriverIdDetails().getDriverById(id)
			}
		}
		loading.value = false
	}

	// const setUpdateSource = (data: string) => {
	// 	update_source.value = data
	// }

	return { loading, ...obj, setUpdateSource, openEditBus, clearObj, updateVehicle, update_source }
}
