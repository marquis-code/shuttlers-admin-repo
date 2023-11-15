import { ref } from 'vue'
import { useFetchChargeTypes } from './fetch'
import { charges_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { useChargeModal } from '@/composables/core/modals'

const chargeObj = {
	name: ref(''),
	short_name: ref(''),
	desc: ref(''),
	id: ref(null) as Ref<number|null>
}
const loading = ref(false)
const isEditChargeType = ref(false)

const closeAddTypeModal = () => {
	isEditChargeType.value = false
	chargeObj.name.value = ''
	chargeObj.short_name.value = ''
	chargeObj.desc.value = ''
	chargeObj.id.value = null
}
const { fetchChargeTypes, fetchAllChargeTypesWithoutPagination } = useFetchChargeTypes()

export const useCreateChargeType = () => {
	const { $_create_charge_types, $_edit_charge_types } = charges_api
	const createCharge = async () => {
		loading.value = true
		const payload = {
			name: chargeObj.name.value,
			short_name: chargeObj.short_name.value,
			description: chargeObj.desc.value,
			is_compulsory: false
		}
		const res = await $_create_charge_types(payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			useAlert().openAlert({ type: 'SUCCESS', msg: 'Charge type created successfully' })
			fetchChargeTypes()
			fetchAllChargeTypesWithoutPagination()
			useChargeModal().closeCreateChargeTypes()
        }
		loading.value = false
	}

	const initEditCharge = (data) => {
		isEditChargeType.value = true
		chargeObj.id.value = data.id
		chargeObj.name.value = data.name
		chargeObj.short_name.value = data.short_name
		chargeObj.desc.value = data.description
		useChargeModal().openCreateChargeTypes()
	}

	const updateCharge = async () => {
		loading.value = true
		const payload = {
			name: chargeObj.name.value,
			short_name: chargeObj.short_name.value,
			description: chargeObj.desc.value,
			is_compulsory: false
		}

		const res = await $_edit_charge_types(chargeObj.id.value!, payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			useAlert().openAlert({ type: 'SUCCESS', msg: 'Charge type updated successfully' })
			fetchChargeTypes()
			fetchAllChargeTypesWithoutPagination()
			useChargeModal().closeCreateChargeTypes()
        }
		loading.value = false
	}

	return { ...chargeObj, createCharge, loading, closeAddTypeModal, isEditChargeType, initEditCharge, updateCharge }
}
