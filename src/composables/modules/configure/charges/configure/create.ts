import { ref, Ref, watch, computed } from 'vue'
import { useFetchConfiguredCharges } from './fetch'
import { charges_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { useChargeModal } from '@/composables/core/modals'

const configureChargeObj = {
	id: ref(null),
	chargeTypeId: ref(null),
	chargeEntityId: ref(null), // this is the country id
	chargeValue: ref(''),
	chargeType: ref('percentage'),
	desc: ref(''),
	cityIds: ref([]) as Ref<any[]>,
	allCity: ref(false),
	isCompulsory: ref(true)
}

const loading = ref(false)
const isEditConfigureCharge = ref(false)
const { fetchConfiguredCharges, fetchSingleConfiguredCharges } = useFetchConfiguredCharges()

const closeConfigureChargeModal = () => {
	isEditConfigureCharge.value = false
	configureChargeObj.chargeTypeId.value = null
	configureChargeObj.chargeEntityId.value = null
	configureChargeObj.chargeValue.value = ''
	configureChargeObj.chargeType.value = 'percentage'
	configureChargeObj.desc.value = ''
	configureChargeObj.cityIds.value = []
	configureChargeObj.allCity.value = false
	configureChargeObj.isCompulsory.value = true
}

const enableButton = computed(() => {
	return !!(configureChargeObj.chargeTypeId.value && configureChargeObj.chargeEntityId.value && configureChargeObj.chargeValue.value &&
	configureChargeObj.chargeType.value && configureChargeObj.desc.value &&
	(configureChargeObj.allCity.value || configureChargeObj.cityIds.value.length))
})

const getIdsFromCityObj = computed(() => {
	if (!configureChargeObj.cityIds.value.length) return []
	return configureChargeObj.cityIds.value.map((item) => item.id)
})

watch(configureChargeObj.cityIds, () => {
	if (configureChargeObj.cityIds.value.length) configureChargeObj.allCity.value = false
})

export const useCreateConfigureCharge = () => {
	const configureCharge = async () => {
		loading.value = true
		const payload = {
			additional_charge_type_id: configureChargeObj.chargeTypeId.value,
			addition_charge_entity: 'country',
			additional_charge_entity_id: configureChargeObj.chargeEntityId.value,
			charge_value: String(configureChargeObj.chargeValue.value),
			charge_type: configureChargeObj.chargeType.value,
			description: configureChargeObj.desc.value,
			city_ids: getIdsFromCityObj.value,
			all_cities: configureChargeObj.allCity.value,
			is_compulsory: configureChargeObj.isCompulsory.value
		}
		const res = await charges_api.$_create_config(payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			useAlert().openAlert({ type: 'SUCCESS', msg: 'Configured successfully' })
			fetchConfiguredCharges()
			useChargeModal().closeCreateChargeConfigurations()
        }
		loading.value = false
	}

	const initEditConfigure = (data) => {
		isEditConfigureCharge.value = true
		configureChargeObj.id.value = data.id
		configureChargeObj.chargeTypeId.value = data.additional_charge_type_id
		configureChargeObj.chargeEntityId.value = data.additional_charge_entity_id
		configureChargeObj.chargeValue.value = data.charge_value
		configureChargeObj.chargeType.value = data.charge_type
		configureChargeObj.desc.value = data.description
		configureChargeObj.cityIds.value = data?.cities_currently_active_in.map((el) => ({ id: el.city_id, name: el.city_name })) || []
		configureChargeObj.isCompulsory.value = data.is_compulsory === 1
		useChargeModal().openCreateChargeConfigurations()
	}

	const updateConfigureCharge = async () => {
		loading.value = true
		const payload = {
			additional_charge_type_id: configureChargeObj.chargeTypeId.value,
			addition_charge_entity: 'country',
			additional_charge_entity_id: configureChargeObj.chargeEntityId.value,
			charge_value: String(configureChargeObj.chargeValue.value),
			charge_type: configureChargeObj.chargeType.value,
			description: configureChargeObj.desc.value,
			city_ids: getIdsFromCityObj.value,
			all_cities: configureChargeObj.allCity.value,
			is_compulsory: configureChargeObj.isCompulsory.value
		}
		const res = await charges_api.$_edit_config(configureChargeObj.id.value!, payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			useAlert().openAlert({ type: 'SUCCESS', msg: 'Configuration updated successfully' })
			fetchConfiguredCharges()
			fetchSingleConfiguredCharges(configureChargeObj.id.value!)
			useChargeModal().closeCreateChargeConfigurations()
        }
		loading.value = false
	}

	return { ...configureChargeObj, loading, isEditConfigureCharge, closeConfigureChargeModal, configureCharge, enableButton, initEditConfigure, updateConfigureCharge }
}
