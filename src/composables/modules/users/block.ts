import { useUserIdDetails } from './id'
import { useYesConfirmationModal } from '@/composables/core/confirmation'
import { users_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'

const loading = ref(false)
const block_user = ref(false)
const { getUserById } = useUserIdDetails()

export const useBlockUser = () => {
    const handleUserBlocking = async () => {
        const user_id = useRoute().params.id as string
		const payload = {
            isBlocked: block_user.value,
            userType: 'user'
        }
		loading.value = true
		const res = await users_api.$_block_user(user_id, payload) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
			useYesConfirmationModal().closeAlert()
            useAlert().openAlert({
				type: 'SUCCESS',
				msg: `User ${block_user.value ? 'blocked' : 'unblocked'} successfully`
			})
            getUserById()
        }
        loading.value = false
	}

    const initBlockUser = (blockUser: boolean) => {
        block_user.value = blockUser
        useYesConfirmationModal().openAlert({
            call_function: handleUserBlocking,
            desc: `Are you sure you want to ${!blockUser ? 'unblock' : 'block'} this user?`,
            title: 'Are you absolutely sure?',
            loading,
            type: 'DANGER'
        })
    }

    return { loading, initBlockUser }
}
