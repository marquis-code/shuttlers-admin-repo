import { useVehicleModal } from '@/composables/core/modals'
import { useAlert } from '@/composables/core/notification'
import { vehicles_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useDriverIdDetails } from '@/composables/modules/drivers'
import { useVehicleIdDetails } from '@/composables/modules/fleets/id'

const update_source = ref('driver')
const obj = {
	id: ref(''),
	name: ref(''),
	brand: ref(''),
	plate_no: ref(''),
	capacity: ref(''),
	type: ref(''),
	code: ref(''),
	amenities: ref([]) as any,
	inventory_type: ref('')
}

const loading = ref(false)
const clearObj = () => {
	obj.id.value = ''
	obj.name.value = ''
	obj.brand.value = ''
	obj.plate_no.value = ''
	obj.capacity.value = ''
	obj.type.value = ''
	obj.code.value = ''
	obj.amenities.value = []
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
		obj.amenities.value = data.amenity_list.map((el) => el?.id)
		obj.inventory_type.value = data.inventory_type
		useVehicleModal().openEditBus()
	}

	const updateVehicle = async () => {
		const payload = {
			name: obj.name.value,
			brand: obj.brand.value,
			registration_number: obj.plate_no.value,
			seats: obj.capacity.value,
			type: obj.type.value,
			code: obj.code.value,
			amenity_ids: obj.amenities.value,
			inventory_type: obj.inventory_type.value
		}

		loading.value = true
		const res = await vehicles_api.$_update_vehicle(obj.id.value!, payload) as CustomAxiosResponse
		if (res.type !== 'ERROR') {
			loading.value = false
			useAlert().openAlert({ type: 'SUCCESS', msg: 'Vehicle information has been updated successfully' })
			useVehicleModal().closeEditBus()
			if (useRoute().fullPath.includes('vehicle-info')) {
				const id = useRoute().params.id as string
				useVehicleIdDetails().getVehicleById(Number(id))
			}
		}
		loading.value = false
	}

	return { loading, ...obj, openEditBus, clearObj, updateVehicle }
}
