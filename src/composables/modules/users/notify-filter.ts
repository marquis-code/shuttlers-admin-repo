// import { useCreateNotification } from './notification'
import { users_api, CustomAxiosResponse, corporates_api } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { usePagination } from '@/composables/utils/table'

const users = ref([] as Record<string, any>[])
const type = ref('all') as Ref<'all'|'company'>
const selectedCompany = ref({} as Record<string, any>)
const loading_users = ref(false)
const all_users_selected = ref(false)
// const { selectedUsers } = useCreateNotification()

const filterData = {
    status: ref('active'),
    search: ref(''),
    is_corporate: computed(() => type.value === 'company' ? 1 : ''),
    corporate_id: computed(() => selectedCompany.value?.id ? selectedCompany.value?.id : '')
}

export const useUserNotifyFilter = () => {
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()

    const getUsers = async () => {
        loading_users.value = true
        const res = await users_api.$_get_users(metaObject, filterData) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            users.value = res.data.data?.length ? res.data?.data : []
            // if (type.value === 'company' && selectedCompany.value?.id) selectedUsers.value = res.data.data?.length ? res.data?.data : []
        }
        loading_users.value = false
    }

    watch(selectedCompany, () => {
        getUsers()
    })

    // const getCorporates = async () => {
    //     const res = await corporates_api.$_get(metaObject, userFilterData) as CustomAxiosResponse
    //     if (res.type !== 'ERROR') {
    //         users.value = res.data.data
    //     }
    // }

    return { users, type, filterData, selectedCompany, loading_users, getUsers, all_users_selected }
}
