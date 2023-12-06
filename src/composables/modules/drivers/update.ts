import { drivers_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'

const obj = {
	fname: ref(''),
	lname: ref(''),
	email: ref(''),
	phone: ref('')
}
const updating = ref(false)
const loading = ref(false)
const driverInfo = ref({}) as Ref<Record<string, any>>
const populateForm = () => {
	obj.fname.value = driverInfo.value.fname
	obj.lname.value = driverInfo.value.lname
	obj.email.value = driverInfo.value.email
	obj.phone.value = driverInfo.value.phone
}

export const useUpdateDriver = () => {
	const updateDriver = async () => {
		const id = useRoute().params.id as string
		const payload = {
			fname: obj.fname.value,
			lname: obj.lname.value,
			phone: obj.phone.value,
			email: obj.email.value
		}
		updating.value = true
		const res = await drivers_api.$_update_driver(id, payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			useAlert().openAlert({ type: 'SUCCESS', msg: 'Driver details updated successfully' })
			useRouter().push(`/drivers/${res.data.id}/driver-info`)
        }
		updating.value = false
	}

	const getDriverDetails = async () => {
		const id = useRoute().params.id as string
		loading.value = true
        const res = await drivers_api.$_get_driver_by_id(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			if (res.data?.id) {
				driverInfo.value = res.data
				populateForm()
			} else {
				driverInfo.value = {}
				useAlert().openAlert({ type: 'ERROR', msg: 'Could not get driver details' })
			}
        }
        loading.value = false
	}

	const enableButton = computed(() => {
		return !!(obj.fname.value && obj.lname.value && obj.phone.value.length >= 10 && obj.email.value.includes('@'))
	})

	return { loading, updating, ...obj, updateDriver, getDriverDetails, enableButton }
}
