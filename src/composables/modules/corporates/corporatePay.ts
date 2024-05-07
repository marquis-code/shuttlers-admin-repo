import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useCorporateIdDetails } from '@/composables/modules/corporates/id'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { useAlert } from '@/composables/core/notification'

const corporatePaySettings = {
    book_on_corporate_routes: ref(true),
    book_on_public_routes: ref(true),
    booking_limits_active: ref(true),
    corporate_id: ref(),
    default_corporate_payment_limit: {
        id: ref(),
        limit_type: ref('none'),
        limit_value: ref(0),
        limit_value_unit: ref('none')
    },
    exemptions: ref([] as Record<string, any>[]),
    id: ref(),
    staff_can_view_wallet_limit_usage: ref()
}

const isEditingExemption = ref(false)
const exemption_obj = {
    type: ref('amount'),
    book_or_amount_limit: ref(),
    select_period: ref(''),
    subject_ids: ref(''),
    subject_type: ref('')
}

const clear_exemption_obj = () => {
    exemption_obj.book_or_amount_limit.value = undefined
    exemption_obj.select_period.value = ''
    exemption_obj.subject_ids.value = ''
    exemption_obj.subject_type.value = ''
}

const getPeriod = (str) => {
    if (str === 'per_day') {
        return 'day'
    } else if (str === 'per_week') {
        return 'week'
    } else if (str === 'per_month') {
        return 'month'
    } else {
        return 'year'
    }
}

const getExemptionLimitWriteUp = (data) => {
    if (data.limit_type === 'trip') {
        return `Allow an employee book ${data.limit_value} trips per ${getPeriod(data.limit_value_unit)}`
    } else {
        return `Allow an employee spend ₦${data.limit_value} per ${getPeriod(data.limit_value_unit)}`
    }
}

export const useCorporatePaySetting = () => {
    const loading = ref(false)
    const { selectedCorporate } = useCorporateIdDetails()
    const fetchCorporatePaySetting = async () => {
        loading.value = true
        const { $_fetch_corporate_payment_settings } = corporates_api
        const corporate_id = Number(useRoute().params.id)
        const res = await $_fetch_corporate_payment_settings(corporate_id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            const data = res?.data
			corporatePaySettings.book_on_corporate_routes.value = data.book_on_corporate_routes
			corporatePaySettings.book_on_public_routes.value = data.book_on_public_routes
			corporatePaySettings.booking_limits_active.value = data.booking_limits_active
			corporatePaySettings.corporate_id.value = data.corporate_id
			corporatePaySettings.staff_can_view_wallet_limit_usage.value = !!data.staff_can_view_wallet_limit_usage
			corporatePaySettings.default_corporate_payment_limit.id.value = data.default_corporate_payment_limit?.id
			corporatePaySettings.default_corporate_payment_limit.limit_type.value = data.default_corporate_payment_limit?.limit_type
			corporatePaySettings.default_corporate_payment_limit.limit_value.value = data.default_corporate_payment_limit?.limit_value
			corporatePaySettings.default_corporate_payment_limit.limit_value_unit.value = data.default_corporate_payment_limit?.limit_value_unit
			corporatePaySettings.exemptions.value = data.exemptions
			corporatePaySettings.id.value = data.id
        }
        loading.value = false
    }

    const saveCorporatePaySettings = async (val: any) => {
        loading.value = true
        const { $_update_corporate_payment_settings } = corporates_api
        const corporate_id = Number(useRoute().params.id)
        const res = await $_update_corporate_payment_settings(corporate_id, val) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({
				type: 'SUCCESS',
				msg: 'Settings saved successfully.'
			})
            fetchCorporatePaySetting()
            useConfirmationModal().closeAlert()
        }
        loading.value = false
    }

	const updateExemptions = async () => {
        loading.value = true
        const { $_update_corporate_payment_settings } = corporates_api
        const payload = {
                exemptions: [
                    {
                        limit_type: exemption_obj.type.value,
                        limit_value: exemption_obj.book_or_amount_limit.value,
                        limit_value_unit: exemption_obj.select_period.value,
                        subject_id: exemption_obj.subject_ids.value,
                        subject_type: exemption_obj.subject_type.value
                    }
                ]
            }
        const res = await $_update_corporate_payment_settings(selectedCorporate.value.id, payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({
				type: 'SUCCESS',
				msg: 'Settings saved successfully'
			})
            fetchCorporatePaySetting()
            useConfirmationModal().closeAlert()
        }
        loading.value = false
    }

    const deleteExemption = async (excemptionId) => {
        loading.value = true
        const { $_delete_corporate_payment_exemption } = corporates_api
        const res = await $_delete_corporate_payment_exemption(excemptionId) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({
				type: 'SUCCESS',
				msg: 'Exemption deleted successfully.'
			})
        }
        loading.value = false
    }

    const editExemption = (data) => {
        exemption_obj.type.value = data.limit_type
        exemption_obj.book_or_amount_limit.value = data.limit_value
        exemption_obj.select_period.value = data.limit_value_unit
        exemption_obj.subject_type.value = data.subject_type
        exemption_obj.subject_ids.value = data.subject_id
        isEditingExemption.value = true
    }

    const toggleStaffsAbilityToViewCorporatePayUsage = () => {
        corporatePaySettings.staff_can_view_wallet_limit_usage.value = !corporatePaySettings.staff_can_view_wallet_limit_usage.value
    }

    return {
 ...corporatePaySettings, corporatePaySettings, loading, fetchCorporatePaySetting, saveCorporatePaySettings,
		isEditingExemption, exemption_obj, clear_exemption_obj, getExemptionLimitWriteUp,
		updateExemptions, deleteExemption, editExemption, toggleStaffsAbilityToViewCorporatePayUsage
	}
}
