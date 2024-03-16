import { useAgentIdDetails } from './id'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { users_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'

export const useSuspendAgent = () => {
    const { getAgentById } = useAgentIdDetails()
    const loading = ref(false)

    const suspend = (data: any) => {
	const actionType = data.sales_agent_account_active === '1' ? 'suspend' : 'un-suspend'
    useConfirmationModal().openAlert({
        title: 'Please Confirm',
		type: 'NORMAL',
        desc: `Are you sure you want to ${actionType} this Agent`,
		loading,
		call_function: () => suspendAgent(data.id, actionType)
    })
}
    const suspendAgent = async (id: string, type: string) => {
        loading.value = true

        const res = (await users_api.$_edit_users(
            {
                sales_agent_account_active: type === 'suspend' ? '0' : '1'
            }, id
        )) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({
                type: 'SUCCESS',
                msg: `Agent has been ${type === 'suspend' ? 'suspended' : 'un-suspended'} successfully`
            })
            useConfirmationModal().closeAlert()
            getAgentById(id)
        }
        loading.value = false
    }

    return { loading, suspendAgent, suspend }
}
