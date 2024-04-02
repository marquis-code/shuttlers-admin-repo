import { useGetPartnersDriversList } from './id'
import { useYesConfirmationModal } from '@/composables/core/confirmation'
import { partners_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { usePartnerModal } from '@/composables/core/modals'

const loading = ref(false)
const driver_emails = ref([]) as Ref<string[]>
const driver_emails_errors = ref([]) as Ref<Record<string, any>[]>

const clearObj = () => {
    driver_emails.value = []
    driver_emails_errors.value = []
}

export const useEmailToLinkDriver = () => {
    const linkDriverWithEmail = async () => {
        const partnerId = useRoute().params.id as string
		const payload = driver_emails.value.map((el) => {
            return {
                driver_id: el,
                partner_id: partnerId
            }
        })
		loading.value = true
		const res = await partners_api.$_link_drivers(payload) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
			useYesConfirmationModal().closeAlert()
            if (res?.data?.errors?.length) {
                useAlert().openAlert({ type: 'ERROR', msg: 'Some driver emails not found' })
                driver_emails_errors.value = res?.data?.errors
            } else {
                useAlert().openAlert({ type: 'SUCCESS', msg: 'Drivers linked successfully' })
                usePartnerModal().closeBatchLinkDriver()
                useGetPartnersDriversList().getPartnersDriversList()
            }
        }
        loading.value = false
	}

    const initLinkDriverWithEmail = () => {
        useYesConfirmationModal().openAlert({
            call_function: linkDriverWithEmail,
            desc: 'If this driver has already been assigned to another vehicle partner, assigning the vehicle/driver to this new partner would automatically unassign the driver from the previous vehicle partner.',
            title: 'Are you absolutely sure?',
            loading,
            type: 'DANGER'
        })
    }

    return { loading, driver_emails, driver_emails_errors, initLinkDriverWithEmail, clearObj }
}
