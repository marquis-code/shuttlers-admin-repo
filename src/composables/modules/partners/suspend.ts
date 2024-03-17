import { usePartnerIdDetails } from './id'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { partners_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'

const partner = ref({}) as Ref<Record<string, any>>
const loading = ref(false)

export const useSuspendPartner = () => {
	const initSuspension = (data: Record<string, any>) => {
		partner.value = data
		useConfirmationModal().openAlert({
			call_function: suspendPartner,
			desc: `Are you sure you want to ${partner.value.status === 'active' ? 'suspend' : 'un-suspend'} this partner?`,
			title: `${partner.value.status === 'active' ? 'Suspend' : 'Un-suspend'} partner`,
			loading,
			type: 'DANGER'
		})
	}
	const suspendPartner = async () => {
		const payload = {
			status: partner.value.status === 'active' ? 'suspended' : 'active'
		}
		loading.value = true
		const id = useRoute().params.id as string
		const res = await partners_api.$_update_partner(id, payload) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
			useConfirmationModal().closeAlert()
            useAlert().openAlert({
				type: 'SUCCESS',
				msg: `Partner was ${partner.value.status === 'active' ? 'suspended' : 'unsuspended'} successfully`
			})
			// useRouter().push(`/drivers/${id}/driver-info`)
			usePartnerIdDetails().getPartnerById(id)
        }
        loading.value = false
	}

	return { initSuspension, loading }
}
