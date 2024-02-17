import { usePartnerIdDetails } from './id'
import { partners_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { usePartnerModal } from '@/composables/core/modals'

const { getPartnerById } = usePartnerIdDetails()
const loading = ref(false)
const obj = {
    password: ref(''),
    c_password: ref(''),
    id: ref(null) as Ref<null|number>
}

const clearObj = () => {
    obj.password.value = ''
    obj.c_password.value = ''
    obj.id.value = null
}

export const useUpdatePartnerPassword = () => {
	const initUpdatePassword = (data: Record<string, any>) => {
        obj.id.value = data?.owner?.id
        usePartnerModal().openUpdatePartnerPassword()
	}

	const updatePartnerPassword = async () => {
		const payload = {
			password: obj.password.value
		}
		loading.value = true
        const id = useRoute().params.id as string
		const res = await partners_api.$_update_partner_user_info(obj.id.value!, payload) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            useAlert().openAlert({
				type: 'SUCCESS',
				msg: 'Partner password was updated successfully'
			})
            usePartnerModal().closeUpdatePartnerPassword()
			getPartnerById(id)
        }
        loading.value = false
	}

	return { updatePartnerPassword, loading, ...obj, clearObj, initUpdatePassword }
}
