import { useGetDriversList } from './fetch'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { drivers_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'

const { getDriversList, filterData } = useGetDriversList()
const selected_drivers = ref([]) as Ref<Record<string, any>[]>
const loading = ref(false)
const selected_drivers_ids = computed(() => {
	return selected_drivers.value.map((el) => el.id)
})

watch(filterData.status, () => {
	selected_drivers.value = []
})

export const useDeactivateDriver = () => {
	const initDeactivate = () => {
		useConfirmationModal().openAlert({
			call_function: deactivateDriver,
			desc: 'Are you sure you want to deactivate the selected driver(s)?',
			title: 'Deactivate driver',
			loading,
			type: 'DANGER'
		})
	}
	const deactivateDriver = async () => {
		const payload = {
			active: 0,
			ids: selected_drivers_ids.value
		}
		loading.value = true
		const res = await drivers_api.$_deactivate_driver(payload) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: 'All selected drivers were successfully deactivated' })
			getDriversList()
			useConfirmationModal().closeAlert()
        }
        loading.value = false
	}

	return { deactivateDriver, selected_drivers, loading, initDeactivate }
}
