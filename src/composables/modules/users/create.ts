import { users_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'

export const useCreateUsers = () => {
    const loading = ref(false)
    const createForm = {
    fname: ref(''),
    lname: ref(''),
    phone: ref(''),
    email: ref(''),
    password: ref(''),
    gender: ref(''),
    dob: ref(''),
    corporate_id: ref()
}

    const createUser = async () => {
        loading.value = true
        const res = await users_api.$_get_user_by_id(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useRouter().push('/users')
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Refund logged successfully' })
        }
        loading.value = false
    }

    return { createForm, loading, createUser }
}
