import { ref, Ref } from 'vue'
import { useFetchConfiguredCharges } from './fetch'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { charges_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'

const loading = ref(false)
const to_delete_id = ref(null) as Ref<number|null>
const back_to_config_list = ref(false)

const { fetchConfiguredCharges } = useFetchConfiguredCharges()
export const useDeleteChargeConfiguration = () => {
	const initDeleteConfiguration = (id:number, backToList = false) => {
		to_delete_id.value = id
		back_to_config_list.value = backToList
		useConfirmationModal().openAlert({ call_function: deleteConfig, desc: 'Are you sure you want to delete this charge configuraion?', title: 'Delete charge configuration', loading, type: 'DANGER' })
	}
	const deleteConfig = async () => {
		loading.value = true
		const res = await charges_api.$_delete_config(to_delete_id.value!) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			useConfirmationModal().closeAlert()
			useAlert().openAlert({ type: 'SUCCESS', msg: 'Charge configuration deleted successfully' })
			if (back_to_config_list.value) useRouter().push('/configuration/pricing/charges')
			fetchConfiguredCharges()
        }
		loading.value = false
	}

	return { loading, initDeleteConfiguration }
}
