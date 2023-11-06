import { staffs_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { useAdminModal } from '@/composables/core/modals'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
import { useConfirmationModal } from '@/composables/core/confirmation'

const createForm = {
	fname: ref(''),
	lname: ref(''),
	phone: ref(''),
	email: ref(''),
    password: ref(''),
    role: ref('')
}

const updatePasswordForm = {
	password: ref('')
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

	const updateAdminPassword = async (id: string) => {
		loading.value = true

        const res = (await staffs_api.$_change_password(
            convertObjWithRefToObj(updatePasswordForm), id
        )) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({
                type: 'SUCCESS',
                msg: 'Password has been changed successfully'
            })
			useAdminModal().closeChangePassword()
        }
        loading.value = false
    }

	const suspendAdmin = async (id: string, type: string) => {
		loading.value = true

        const res = (await staffs_api.$_suspend_admin(
            {
				active: type === 'suspend' ? 0 : 1
			}, id
        )) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({
                type: 'SUCCESS',
                msg: 'Admin has been suspended successfully'
            })
			useAdminModal().closeChangePassword()
			useConfirmationModal().closeAlert()
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

	const populatePasswordUpdateForm = (data) => {
		updatePasswordForm.password.value = data.password || ''
	}

	return { createForm, loading, createAdmin, editAdmin, prePopulateForm, updateAdminPassword, updatePasswordForm, populatePasswordUpdateForm, suspendAdmin }
}
