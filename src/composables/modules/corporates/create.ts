import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { useCorporateIdDetails } from '@/composables/modules/corporates/id'
const { selectedCorporate } = useCorporateIdDetails()

const createForm = {
	role: ref(''),
    staff_strength: ref(''),
    package_type: ref(''),
    start_date: ref(''),
    corporate_name: ref(''),
    fname: ref(''),
    lname: ref(''),
    email: ref(''),
    person_phone: ref(''),
    password: ref('')
}

const editForm = {
    corporate_name: ref(''),
    corporate_phone: ref(''),
    email: ref(''),
    industry: ref(''),
    corporate_address: ref(''),
    fname: ref(''),
    lname: ref(''),
    person_phone: ref(''),
    person_email: ref(''),
    password: ref(''),
    cico_option: ref('')
}
const corporateId = useRoute().params.id as string
export const useCreateCorporate = () => {
	const loading = ref(false)

	const createCorporate = async () => {
		loading.value = true
		const res = (await corporates_api.$_create_corporate(convertObjWithRefToObj(createForm))) as CustomAxiosResponse
		if (res.type !== 'ERROR') {
			useRouter().push('/companies')
			useAlert().openAlert({
				type: 'SUCCESS',
				msg: 'Corporate was created successfully'
			})
            useConfirmationModal().closeAlert()
		}
		loading.value = false
    }

    const editCorporate = async () => {
		loading.value = true
		const res = (await corporates_api.$_edit_corporate(convertObjWithRefToObj(editForm), corporateId)) as CustomAxiosResponse
		if (res.type !== 'ERROR') {
			useRouter().push(`/companies/${corporateId}/${selectedCorporate.value.active === 1 ? 'active' : 'inactive'}/company-info`)
			useAlert().openAlert({
				type: 'SUCCESS',
				msg: 'Corporate was edited successfully'
			})
            useConfirmationModal().closeAlert()
		}
		loading.value = false
    }

	const populateCorporateForm = (data: any) => {
            createForm.role.value = data.role
            createForm.staff_strength.value = data.staff_strength
            createForm.package_type.value = data.package_type
            createForm.start_date.value = data.start_date
            createForm.corporate_name.value = data.corporate_name
            createForm.fname.value = data.fname
            createForm.lname.value = data.lname
            createForm.email.value = data.person_email
            createForm.person_phone.value = data.person_phone
            createForm.password.value = data.password
	}

    const populateEditCorporateForm = (data: any) => {
        editForm.corporate_name.value = data.corporate_name
        editForm.corporate_phone.value = data.corporate_phone
        editForm.email.value = data.email
        editForm.corporate_address = data.corporate_address
        editForm.fname.value = data.fname
        editForm.lname.value = data.lname
        editForm.industry.value = data.industry
        editForm.person_phone.value = data.person_phone
        editForm.person_email.value = data.person_email
        editForm.password.value = data.password
        editForm.cico_option.value = data.cico_option
    }

	return { createForm, loading, createCorporate, populateEditCorporateForm, editCorporate, populateCorporateForm }
}
