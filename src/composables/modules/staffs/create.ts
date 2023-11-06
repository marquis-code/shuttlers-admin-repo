import { staffs_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'

const createForm = {
	fname: ref(''),
	lname: ref(''),
	phone: ref(''),
	email: ref(''),
    password: ref(''),
    role: ref('')
}

const updatePasswordForm = {
	oldPassword: ref(''),
	newPassword: ref('')
}

export const useCreateAdmin = () => {
	const loading = ref(false)

	const createAdmin = async () => {
		loading.value = true
		const res = (await staffs_api.$_create_admin(
			convertObjWithRefToObj(createForm)
		)) as CustomAxiosResponse
		if (res.type !== 'ERROR') {
			useRouter().push('/admins')
			useAlert().openAlert({
				type: 'SUCCESS',
				msg: 'Admin created successfully'
			})
		}
		loading.value = false
    }
    const editAdmin = async (id: string) => {
		loading.value = true

        const res = (await staffs_api.$_edit_admin(
            convertObjWithRefToObj(createForm, ['password']), id
        )) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useRouter().push('/admins')
            useAlert().openAlert({
                type: 'SUCCESS',
                msg: 'Admin updated successfully'
            })
        }
        loading.value = false
    }

    const prePopulateForm = (data: any) => {
		createForm.fname.value = data.fname || ''
		createForm.lname.value = data.lname || ''
		createForm.phone.value = data.phone || ''
		createForm.email.value = data.email || ''
        createForm.role.value = data.role || ''
	}

	return { createForm, loading, createAdmin, editAdmin, prePopulateForm }
}
