import { ref, Ref } from 'vue'
import { useFetchChargeTypes } from './fetch'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { charges_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'

const loading = ref(false)
const to_delete_id = ref(null) as Ref<number|null>

const { fetchAllChargeTypesWithoutPagination, fetchChargeTypes } = useFetchChargeTypes()
export const useDeleteChargeTypes = () => {
	const initDeleteCharge = (id:number) => {
		to_delete_id.value = id
		useConfirmationModal().openAlert({ call_function: deleteCharge, desc: 'Are you sure you want to delete this charge type?', title: 'Delete charge type', loading, type: 'DANGER' })
	}
	const deleteCharge = async () => {
		loading.value = true
		const res = await charges_api.$_delete_charge_types(to_delete_id.value!) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			useConfirmationModal().closeAlert()
			useAlert().openAlert({ type: 'SUCCESS', msg: 'Charge type deleted successfully' })
			fetchChargeTypes()
			fetchAllChargeTypesWithoutPagination()
        }
		loading.value = false
	}

	return { loading, initDeleteCharge }
}
