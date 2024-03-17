import { usePartnerIdDetails } from './id'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { partners_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { usePartnerModal } from '@/composables/core/modals'

const partner = ref({}) as Ref<Record<string, any>>
const loading = ref(false)
const obj = {
    fname: ref(''),
    lname: ref(''),
    email: ref(''),
    phone: ref(''),
    id: ref(null) as Ref<null|number>
}

const clearObj = () => {
    obj.fname.value = ''
    obj.lname.value = ''
    obj.email.value = ''
    obj.phone.value = ''
    obj.id.value = null
}

export const useUpdatePartnerInfo = () => {
	const initUpdate = (data: Record<string, any>) => {
		partner.value = data
        obj.id.value = data?.owner?.id
        obj.fname.value = data?.owner?.fname
        obj.lname.value = data?.owner?.lname
        obj.email.value = data?.owner?.email
        obj.phone.value = data?.phone
        usePartnerModal().openUpdatePartnerInfo()
	}

	const updatePartner = async () => {
		const payload = {
			fname: obj.fname.value,
            lname: obj.lname.value,
            email: obj.email.value,
            phone: obj.phone.value
		}
		loading.value = true
        const id = useRoute().params.id as string
		const res = await partners_api.$_update_partner_user_info(obj.id.value!, payload) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            useAlert().openAlert({
				type: 'SUCCESS',
				msg: 'Partner information was updated successfully'
			})
            usePartnerModal().closeUpdatePartnerInfo()
			usePartnerIdDetails().getPartnerById(id)
        }
        loading.value = false
	}

	return { updatePartner, loading, ...obj, clearObj, initUpdate }
}
