import { useGetDriversList } from './fetch'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { drivers_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'

const { getDriversList } = useGetDriversList()
const obj = {
	title: ref(''),
	desc: ref(''),
	selected_drivers: ref([]) as Ref<Record<string, any>[]>
}
const loading = ref(false)
const selected_drivers_ids = computed(() => {
	return obj.selected_drivers.value.map((el) => el.id)
})

const enableButton = computed(() => {
	return !!(obj.title.value && obj.desc.value && obj.selected_drivers.value.length)
})

const clearObj = () => {
	obj.title.value = ''
	obj.desc.value = ''
	obj.selected_drivers.value = []
}

export const useNotifyDriver = () => {
	const initNotify = () => {
		useConfirmationModal().openAlert({
			call_function: notifyDriver,
			desc: 'Are you sure you want to deactivate the selected driver(s)?',
			title: 'Deactivate driver',
			loading,
			type: 'DANGER'
		})
	}
	const notifyDriver = async () => {
		const payload = {
			title: obj.title.value,
			description: obj.desc.value,
			driver_ids: selected_drivers_ids.value
		}
		loading.value = true
		const res = await drivers_api.$_notify_driver(payload) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: 'All selected drivers were successfully notified' })
			getDriversList()
			clearObj()
			useConfirmationModal().closeAlert()
        }
        loading.value = false
	}

	return { notifyDriver, ...obj, loading, initNotify, enableButton, clearObj }
}
