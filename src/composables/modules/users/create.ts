import { users_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'

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
        const res = await users_api.$_create_users(convertObjWithRefToObj(createForm)) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useRouter().push('/users')
            useAlert().openAlert({ type: 'SUCCESS', msg: 'User created successfully' })
        }
        loading.value = false
    }

    return { createForm, loading, createUser }
}
