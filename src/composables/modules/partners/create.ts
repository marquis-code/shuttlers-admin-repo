import { partners_api, users_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'

const obj = {
	type: ref('existing') as Ref<'existing'|'new'>,
	selected_user: ref({}) as Ref<any>,
	category: ref('individual') as Ref<'individual'|'business'>,
	fname: ref(''),
	lname: ref(''),
	phone: ref(''),
	email: ref(''),
	password: ref(''),
	company: ref({}) as Ref<any>,
	dob: ref(''),
	gender: ref('male') as Ref<'male'|'female'>,
	company_name: ref(''),
	company_email: ref(''),
	company_phone: ref(''),
	company_rc_number: ref(''),
	business_type: ref(''),
	company_address: ref(''),
	experience_start_date: ref(''),
	cities: ref([]) as Ref<Record<string, any>[]>,
	country: ref('Nigeria')
}
const loading = ref(false)
const clearObj = () => {
	obj.type.value = 'existing'
	obj.selected_user.value = {}
	obj.category.value = 'individual'
	obj.fname.value = ''
	obj.lname.value = ''
	obj.email.value = ''
	obj.phone.value = ''
	obj.password.value = ''
	obj.company.value = {}
	obj.dob.value = ''
	obj.gender.value = 'male'
	obj.company_address.value = ''
	obj.company_email.value = ''
	obj.company_name.value = ''
	obj.company_phone.value = ''
	obj.company_rc_number.value = ''
	obj.business_type.value = ''
	obj.experience_start_date.value = ''
	obj.cities.value = []
	obj.country.value = 'Nigeria'
	new_partner_id.value = null
}
const isNew = computed(() => {
	return obj.type.value === 'new'
})
const isBusiness = computed(() => {
	return obj.category.value === 'business'
})
const enableButton = computed(() => {
	if (obj.type.value === 'new' && !obj.dob.value) return false
	if (obj.type.value === 'existing' && !obj.selected_user.value?.id) return false
	if (obj.category.value === 'business' && !obj.experience_start_date.value) return false
	if (!obj.cities.value.length) return false
	return true
})
const new_partner_id = ref(null) as Ref<number|null>

export const useCreatePartner = () => {
	const createPartner = async () => {
		const user_payload = {
			fname: obj.fname.value,
			lname: obj.lname.value,
			phone: String(obj.phone.value),
			email: obj.email.value,
			password: obj.password.value,
			gender: obj.gender.value,
			dob: obj.dob.value,
			corporate_id: obj.company.value?.id || null
		}

		const individual_payload = computed(() => {
			return {
				mode: 'individual',
				partner_user_id: obj.selected_user.value?.id ? obj.selected_user.value?.id : new_partner_id.value
			}
		})

		const business_payload = computed(() => {
			return {
				company_name: obj.company_name.value,
				company_email: obj.company_email.value,
				company_phone: obj.company_phone.value,
				rc_number: obj.company_rc_number.value,
				country: obj.country.value,
				business_type: obj.business_type.value,
				company_address: obj.company_address.value,
				years_of_experience: obj.experience_start_date.value,
				mode: 'business',
				partner_user_id: obj.selected_user.value?.id ? obj.selected_user.value?.id : new_partner_id.value
			}
		})
		const addPartner = async () => {
			loading.value = true
			const res = await partners_api.$_create_partner(isBusiness.value ? business_payload.value : individual_payload.value) as CustomAxiosResponse
			if (res.type !== 'ERROR') {
				useAlert().openAlert({ type: 'SUCCESS', msg: 'Partner created successuflly' })
				clearObj()
				useRouter().push(`/partners/${res.data.id}/${res.data.account_sid}/partner-info`)
			}
			loading.value = false
		}

		loading.value = true
		if (isNew.value) {
			const res = await users_api.$_create_users(user_payload) as CustomAxiosResponse
			if (res.type !== 'ERROR') {
				new_partner_id.value = res.data?.id ? res.data.id : null
				console.log(new_partner_id.value)
				setTimeout(() => {
					addPartner()
				}, 500)
			} else {
				loading.value = false
			}
		} else {
			addPartner()
		}
	}
	return { loading, ...obj, clearObj, isNew, isBusiness, createPartner, enableButton }
}
