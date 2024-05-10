import { useGetDriversList } from './fetch'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { drivers_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'

const { getDriversList } = useGetDriversList()
const obj = {
	title: ref(''),
	desc: ref(''),
	selected_drivers: ref([]) as Ref<Record<string, any>[]>,
	all_drivers: ref(false)
}
const loading = ref(false)
const selected_drivers_ids = computed(() => {
	return obj.selected_drivers.value.map((el) => el.id)
})

const enableButton = computed(() => {
	return !!(obj.title.value && obj.desc.value && (obj.selected_drivers.value.length || obj.all_drivers.value))
})

const clearObj = () => {
	obj.title.value = ''
	obj.desc.value = ''
	obj.selected_drivers.value = []
	obj.all_drivers.value = false
}

watch(obj.all_drivers, () => {
	if (obj.all_drivers) obj.selected_drivers.value = []
})

export const useNotifyDriver = () => {
	const initNotify = () => {
		useConfirmationModal().openAlert({
			call_function: notifyDriver,
			desc: 'Are you sure you want to notify the selected driver(s)?',
            title: 'Notify driver',
			loading,
			type: 'DANGER'
		})
	}
	const notifyDriver = async () => {
		const payload:Record<string, any> = {
			title: obj.title.value,
			description: obj.desc.value
		}
		if (!obj.all_drivers.value) {
			payload.driver_ids = selected_drivers_ids.value
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
