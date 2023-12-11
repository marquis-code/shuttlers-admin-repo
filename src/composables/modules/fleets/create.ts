import { vehicles_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
import { useUpdateTrackingInfo } from '@/composables/modules/fleets/updateTrackingInfo'
const { updateForm, loading, updateVehicleTrackingInfo, populateTrackingForm } = useUpdateTrackingInfo()
const router = useRouter()
const random = Math.floor(100000 + Math.random() * 900000).toString().substring(0, 4)
const result = parseInt(random)
const createForm = {
    brand: ref(''),
    name: ref(''),
    type: ref(''),
    seats: ref(''),
	partner: ref('') as any,
    registration_number: ref(''),
    amenities: ref(''),
    code: ref(result) as any,
    inventory_type: ref('regular')
}

const emptyForm = () => {
	    createForm.brand.value = ''
		createForm.name.value = ''
		createForm.type.value = ''
		createForm.seats.value = ''
		createForm.registration_number.value = ''
		createForm.amenities.value = ''
		createForm.code.value = result
		createForm.partner.value = ''
		createForm.inventory_type.value = ''
}
const addtrackingDetails = ref(false)
const trackingForm = {
    tracking_id: '',
    provider_name: '',
    provider_description: ''
}

export const useCreateVehicle = () => {
	const loading = ref(false)

	const createVehicle = async () => {
		loading.value = true
		const res = (await vehicles_api.$_create_vehicle(
			convertObjWithRefToObj(createForm)
		)) as CustomAxiosResponse
		if (res.type !== 'ERROR') {
           if (addtrackingDetails.value) {
			populateTrackingForm(trackingForm)
			await updateVehicleTrackingInfo()
			useAlert().openAlert({
				type: 'SUCCESS',
				msg: 'Vehicle created successfully'
			})
			loading.value = false
			router.push('/fleet')
			emptyForm()
		   } else {
			useAlert().openAlert({
				type: 'SUCCESS',
				msg: 'Vehicle created successfully'
			})
			loading.value = false
			emptyForm()
			router.push('/fleet')
		   }
		}
		loading.value = false
    }

    const prePopulateForm = (data: any) => {
		createForm.brand.value = data.brand || ''
		createForm.name.value = data.name || ''
		createForm.type.value = data.type || ''
		createForm.seats.value = data.seats || ''
		createForm.registration_number.value = data.registration_number || ''
		createForm.amenities.value = data.amenities || ''
		createForm.code.value = data.code || result
		createForm.partner.value = data.partner || ''
		createForm.inventory_type.value = data.inventory_type || ''
	}

	onUnmounted(() => {
		emptyForm()
	})

	return { createForm, loading, trackingForm, createVehicle, prePopulateForm, populateTrackingForm, addtrackingDetails }
}
