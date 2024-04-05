import { users_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { convertObjWithRefToObj, convertToCurrency } from '@/composables/utils/formatter'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { useUserModal } from '@/composables/core/modals'
import { useUserIdDetails, useGetBusCaptainRoutes } from '@/composables/modules/users/id'

const createForm = {
	fname: ref(''),
	lname: ref(''),
	phone: ref(''),
	email: ref(''),
	password: ref(''),
	gender: ref(''),
	dob: ref(''),
	corporate_id: ref('')
}
const updatePasswordForm = {
	password: ref('')
}

const walletUpdateForm = {
	amount: ref(''),
    title: ref(''),
    source: ref(''),
	type: ref('')
}

const createBusCaptainForm = {
	user_id: ref(''),
    route_itinerary_id: ref(''),
    route_vehicle_id: ref('')
}

const walletActionType = ref('')

export const useCreateUsers = () => {
	const { getUserById, selectedUserId } = useUserIdDetails()

	const loading = ref(false)

	const createUser = async () => {
		loading.value = true
		const payload = convertObjWithRefToObj(createForm)
		if (!payload?.corporate_id && payload.hasOwnProperty('corporate_id')) {
			delete payload.corporate_id
		}
		const res = (await users_api.$_create_users(payload)) as CustomAxiosResponse
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
		const formData = convertObjWithRefToObj(createForm)
		const { password, ...formDataExceptPassword } = formData
        const res = (await users_api.$_edit_users(
            formDataExceptPassword, id
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
		createForm.corporate_id.value = data.corporate_id
	}

	const updateUserPassword = async (id: string) => {
		loading.value = true

        const res = (await users_api.$_change_password(
            convertObjWithRefToObj(updatePasswordForm), id
        )) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({
                type: 'SUCCESS',
                msg: 'Password has been changed successfully'
            })
			useUserModal().closeChangeUserPassword()
			getUserById()
        }
        loading.value = false
    }

	const suspendUsers = async (id: string, type: string) => {
		loading.value = true

        const res = (await users_api.$_edit_users(
            {
				active: type === 'suspend' ? 0 : 1
			}, id
        )) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({
                type: 'SUCCESS',
                msg: `User has been ${type === 'suspend' ? 'suspended' : 'un-suspended'} successfully`
            })
			useConfirmationModal().closeAlert()
			getUserById()
        }
        loading.value = false
    }

	const updateUserWallet = async (id: string, walletId: string) => {
		loading.value = true

        const res = (await users_api.$_update_wallet(convertObjWithRefToObj(walletUpdateForm), id, walletId)) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({
                type: 'SUCCESS',
                msg: `User wallet was ${walletActionType.value === 'debit' ? 'debited of' : 'credited with'} ${convertToCurrency(Number(walletUpdateForm?.amount?.value))} successfully`
            })
			useUserModal().closeWalletUpdate()
			getUserById()
        }
        loading.value = false
    }

	const createBusCaptains = async () => {
		const { getBusCaptainRoutesById } = useGetBusCaptainRoutes()
		loading.value = true

        const res = (await users_api.$_create_bus_captain(convertObjWithRefToObj(createBusCaptainForm))) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({
                type: 'SUCCESS',
                msg: 'User was successfully added as a bus captain!'
            })
			useUserModal().closeMakeBusCaptain()
        }
		loading.value = false
		useConfirmationModal().closeAlert()
		getUserById()
		getBusCaptainRoutesById()
    }
	const populateWalletUpdateForm = (data: any) => {
		walletUpdateForm.amount.value = data.amount || ''
		walletUpdateForm.title.value = data.title || ''
		walletUpdateForm.source.value = data.source || ''
		walletUpdateForm.type.value = data.type || ''
	}

	const populatePasswordUpdateForm = (data: any) => {
		updatePasswordForm.password.value = data.password
	}

	const setUpdateWalletActionType = (data: any) => {
		walletActionType.value = data || ''
	}

	const populateCreateBusCaptainForm = (data: any) => {
		createBusCaptainForm.user_id.value = data.user_id || ''
		createBusCaptainForm.route_itinerary_id.value = data.route_itinerary_id || ''
		createBusCaptainForm.route_vehicle_id.value = data.route_vehicle_id || ''
	}

	const updateUserAvatar = async (payload:Record<string, any>) => {
		loading.value = true
		const userId = useRoute().params.id as string
        const res = await users_api.$_upload_user_avatar(userId, payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({
                type: 'SUCCESS',
                msg: 'User avatar was uploaded successfully'
            })
			useUserModal().closeChangeProfile()
        }
        loading.value = false
	}

	return { createForm, loading, createUser, editUser, prePopulateForm, suspendUsers, updateUserWallet, populateWalletUpdateForm, setUpdateWalletActionType, walletActionType, updateUserPassword, populatePasswordUpdateForm, populateCreateBusCaptainForm, createBusCaptains, updateUserAvatar }
}
