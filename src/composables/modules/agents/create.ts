import { CustomAxiosResponse } from '@/api_factory/modules'
import { agents_api } from '@/api_factory/modules/agent'
import { useAlert } from '@/composables/core/notification'
import { convertObjWithRefToObj, convertToCurrency } from '@/composables/utils/formatter'

const createForm = {
	fname: ref(''),
	lname: ref(''),
	email: ref(''),
	// nin: ref(''),
	avatar: ref(''),
	phone: ref(''),
	address: ref(''),
	password: ref(''),
	account_type: ref('sales_agent')
}

export const useCreateAgents = () => {
	const loading = ref(false)

	const createAgent = async () => {
		loading.value = true
		const shouldIgnoreKeys = computed(() => {
			if (!createForm.avatar.value) {
				return ['avatar']
			} else {
				return []
		}
		})
		const res = (await agents_api.$_create_agent(convertObjWithRefToObj(createForm, shouldIgnoreKeys.value))) as CustomAxiosResponse
		if (res.type !== 'ERROR') {
			useRouter().push('/agents')
			useAlert().openAlert({
				type: 'SUCCESS',
				msg: 'Agent created successfully'
			})
		}
		loading.value = false
	}

	return { createForm, loading, createAgent }
}
