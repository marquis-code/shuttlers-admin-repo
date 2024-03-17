import { useGetPartnersDriversList } from './id'
import { useYesConfirmationModal } from '@/composables/core/confirmation'
import { partners_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { usePartnerModal } from '@/composables/core/modals'

const loading = ref(false)
const drivers = ref([]) as Ref<Record<string, any>[]>

export const useLinkDriver = () => {
    const linkDriver = async () => {
        const partnerId = useRoute().params.id as string
		const payload = drivers.value.map((el) => {
            return {
                driver_id: el.id,
                partner_id: partnerId
            }
        })
		loading.value = true
		const res = await partners_api.$_link_drivers(payload) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
			useYesConfirmationModal().closeAlert()
            useAlert().openAlert({
				type: 'SUCCESS',
				msg: 'Driver(s) linked successfully'
			})
            usePartnerModal().closeLinkDriver()
            useGetPartnersDriversList().getPartnersDriversList()
        }
        loading.value = false
	}

    const initlinkDriver = () => {
        useYesConfirmationModal().openAlert({
            call_function: linkDriver,
            desc: 'If this driver has already been assigned to another vehicle partner, assigning the vehicle/driver to this new partner would automatically unassign the driver from the previous vehicle partner.',
            title: 'Are you absolutely sure?',
            loading,
            type: 'DANGER'
        })
    }

    return { loading, drivers, initlinkDriver }
}
