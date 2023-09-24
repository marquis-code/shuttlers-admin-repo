import { users_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'

const createForm = {
	fname: ref(''),
	lname: ref(''),
	phone: ref(''),
	email: ref(''),
	password: ref(''),
	gender: ref(''),
	dob: ref(''),
	corporate_id: ref()
}

export const useCreateUsers = () => {
	const loading = ref(false)

	const createUser = async () => {
		loading.value = true
		const res = (await users_api.$_create_users(
			convertObjWithRefToObj(createForm)
		)) as CustomAxiosResponse
		if (res.type !== 'ERROR') {
			useRouter().push('/users')
			useAlert().openAlert({
				type: 'SUCCESS',
				msg: 'User created successfully'
			})
		}
		loading.value = false
    }
    const editUser = async (id: string) => {
		loading.value = true

        const res = (await users_api.$_edit_users(
            convertObjWithRefToObj(createForm, ['password']), id
        )) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useRouter().push(`/users/${id}/user-info`)
            useAlert().openAlert({
                type: 'SUCCESS',
                msg: 'User updated successfully'
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
		createForm.gender.value = data.gender || ''
		createForm.dob.value = data.dob || ''
		createForm.corporate_id.value = data.corporate_id || ''
	}

	return { createForm, loading, createUser, editUser, prePopulateForm }
}
