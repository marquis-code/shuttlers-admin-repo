import { drivers_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'

const createForm = {
	fname: ref(''),
	lname: ref(''),
	phone: ref(''),
	email: ref(''),
    password: ref('')
}
const loading = ref(false)
export const useCreateDriver = () => {
	const createDriver = async () => {
		loading.value = true
		const res = (await drivers_api.$_create_driver(
			convertObjWithRefToObj(createForm)
		)) as CustomAxiosResponse
		if (res.type !== 'ERROR') {
			useRouter().push('/drivers')
			useAlert().openAlert({
				type: 'SUCCESS',
				msg: 'Driver created successfully'
			})
		}
		loading.value = false
    }

    const prePopulateForm = (data: any) => {
		createForm.fname.value = data.fname || ''
		createForm.lname.value = data.lname || ''
		createForm.phone.value = data.phone || ''
		createForm.email.value = data.email || ''
        createForm.password.value = data.password || ''
	}

	return { createForm, loading, createDriver, prePopulateForm }
}
