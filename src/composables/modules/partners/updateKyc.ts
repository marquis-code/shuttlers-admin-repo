import moment from 'moment'
import { useGetPartnersDriversList } from './id'
import { useYesConfirmationModal } from '@/composables/core/confirmation'
import { partners_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { usePartnerModal } from '@/composables/core/modals'
import { usePartnerIdDetails, useGetPartnerKyc, useGetPartnerEarningSummary, useVerifyPartnerKyc } from '@/composables/modules/partners/id'
import { image_upload_api } from '@/api_factory/core/upload'

const loading = ref(false)
const kycObj = {
    identification: ref(''),
    id_number: ref(''),
    dob: ref(''),
    address: ref({} as Record<string, any>),
    document: ref(null),
    file: ref('')
}

const clearObj = () => {
    kycObj.identification.value = ''
    kycObj.id_number.value = ''
    kycObj.dob.value = ''
    kycObj.address.value = {}
    kycObj.document.value = null
    kycObj.file.value = ''
}

const openIdentity = () => {
    const { partnersKycInformation } = useGetPartnerKyc()
    kycObj.identification.value = partnersKycInformation.value?.identity?.document_type || ''
    kycObj.id_number.value = partnersKycInformation.value?.identity?.document_id || ''
    kycObj.dob.value = partnersKycInformation.value?.identity?.dob || ''
    usePartnerModal().openUpdateIdentity()
}

const openAddress = () => {
    const { partnersKycInformation } = useGetPartnerKyc()
    kycObj.address.value = { name: partnersKycInformation.value?.address?.address }
    kycObj.file.value = partnersKycInformation.value?.address?.document_files?.[0] || ''
    usePartnerModal().openUpdateAddress()
}

export const useUpdateKyc = () => {
    const updateIdentity = async () => {
        const partnerSid = useRoute().params.accountSid as string
        const { selectedPartner } = usePartnerIdDetails()
		const payload = {
            user: {
                document_owner_id: selectedPartner.value?.owner?.id,
                partner_type: selectedPartner.value?.mode
            },
            document: {
                document_id: String(kycObj?.id_number.value),
                type: kycObj.identification.value,
                // dob: moment.utc(new Date(kycObj.dob.value)).format('DD-MM-YYYY'),
                dob: kycObj.dob.value,
                fname: selectedPartner.value?.owner?.fname || '',
                lname: selectedPartner.value?.owner?.lname || ''
            }
        }
		loading.value = true
		const res = await partners_api.$_update_partner_identity_info(partnerSid, payload) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            useAlert().openAlert({
				type: 'SUCCESS',
				msg: 'Partner Identity Information updated successfully'
			})
            usePartnerModal().closeUpdateIdentity()
            useGetPartnerKyc().getPartnerKyc(partnerSid)
        }
        loading.value = false
	}

    const updateAddress = async () => {
        if (!kycObj.document.value && !kycObj.file.value) {
            useAlert().openAlert({
                type: 'ERROR',
                msg: 'Document is compulsory'
            })
            return
        }
        const partnerSid = useRoute().params.accountSid as string
        const { selectedPartner } = usePartnerIdDetails()
        let url = ''
        if (kycObj.document.value) {
            const formData = new FormData()
            formData.append('file', kycObj.document.value)
            const resp = await image_upload_api.$_upload_image(formData)
            url = resp?.data?.files[0]?.Location || ''
        }
		const payload = {
            user: {
                document_owner_id: selectedPartner.value?.owner?.id,
                partner_type: selectedPartner.value?.mode
            },
            document: {
                full_address: kycObj.address.value?.name,
                files: [url || kycObj.file.value]
            }
        }
		loading.value = true
		const res = await partners_api.$_update_partner_address_info(partnerSid, payload) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            useAlert().openAlert({
				type: 'SUCCESS',
				msg: 'Partner Address Information updated successfully'
			})
            usePartnerModal().closeUpdateAddress()
            useGetPartnerKyc().getPartnerKyc(partnerSid)
        }
        loading.value = false
	}

    return { loading, ...kycObj, clearObj, updateIdentity, openIdentity, openAddress, updateAddress }
}
