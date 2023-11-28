import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'

const createForm = {
	role: ref(''),
    staff_strength: ref(''),
    package_type: ref(''),
    start_date: ref(''),
    corporate_name: ref(''),
    fname: ref(''),
    lname: ref(''),
    email: ref(''),
    person_phone: ref(''),
    password: ref('')
}

export const useCreateCorporate = () => {
	const loading = ref(false)

	const createCorporate = async () => {
		loading.value = true
		const res = (await corporates_api.$_create_corporate(
			convertObjWithRefToObj(createForm)
		)) as CustomAxiosResponse
		if (res.type !== 'ERROR') {
			useRouter().push('/companies')
			useAlert().openAlert({
				type: 'SUCCESS',
				msg: 'Coporate created successfully'
			})
		}
		loading.value = false
    }

	const populateCorporateForm = (data: any) => {
        createForm.role.value = data.role
        createForm.staff_strength.value = data.staff_strength
        createForm.package_type.value = data.package_type
        createForm.start_date.value = data.start_date
        createForm.corporate_name.value = data.corporate_name
        createForm.fname.value = data.fname
        createForm.lname.value = data.lname
        createForm.email.value = data.email
        createForm.person_phone.value = data.person_phone
        createForm.password.value = data.password
	}

	return { createForm, loading, createCorporate, populateCorporateForm }
}
