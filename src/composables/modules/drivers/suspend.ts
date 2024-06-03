import { useDriverIdDetails } from './id'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { drivers_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'

const { getDriverById } = useDriverIdDetails()
const driver = ref({}) as Ref<Record<string, any>>
const loading = ref(false)

export const useSuspendDriver = () => {
	const initSuspension = (data: Record<string, any>) => {
		driver.value = data
		useConfirmationModal().openAlert({
			call_function: suspendDriver,
			desc: `Are you sure you want to ${driver.value.active === '1' ? 'suspend' : 'unsuspend'} this driver?`,
			title: `${driver.value.active === '1' ? 'Suspend' : 'Unsuspend'} driver`,
			loading,
			type: 'DANGER'
		})
	}
	const suspendDriver = async () => {
		const payload = {
			active: driver.value.active === '1' ? 0 : 1
		}
		loading.value = true
		const res = await drivers_api.$_update_driver(driver.value.id, payload) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
			useConfirmationModal().closeAlert()
            useAlert().openAlert({
				type: 'SUCCESS',
				msg: `Driver was ${driver.value.active === '1' ? 'suspended' : 'unsuspended'} successfully`
			})
			// useRouter().push(`/drivers/${id}/-info`)
			getDriverById(driver.value.id)
        }
        loading.value = false
	}

	return { initSuspension, loading }
}
