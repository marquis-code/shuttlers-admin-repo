import { useCreateAgents } from './create'
import { useAgentIdDetails } from './id'
import { CustomAxiosResponse } from '@/api_factory/modules'
import { users_api } from '@/api_factory/modules/users'
import { useAlert } from '@/composables/core/notification'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'

export const useEditAgents = () => {
    const { createForm } = useCreateAgents()
    const { selectedId, selectedAgent, getAgentById } = useAgentIdDetails()
    const loading = ref(false)

	const initForm = async (agentId: string) => {
		loading.value = true
		await getAgentById(agentId)
        createForm.fname.value = selectedAgent.value.fname
        createForm.lname.value = selectedAgent.value.lname
        createForm.avatar.value = selectedAgent.value.avatar
        createForm.email.value = selectedAgent.value.email
        createForm.address.value = selectedAgent.value.address
		createForm.phone.value = selectedAgent.value.phone

		loading.value = false
    }

	const editAgent = async () => {
		loading.value = true
		const res = (await users_api.$_edit_users(convertObjWithRefToObj(createForm, ['password']), selectedId.value)) as CustomAxiosResponse
		if (res.type !== 'ERROR') {
			useRouter().push(`agents/${selectedId.value}/agent-info`)
			useAlert().openAlert({
				type: 'SUCCESS',
				msg: 'Agent Edited successfully'
			})
		}
		loading.value = false
	}

	return { loading, editAgent, initForm }
}
