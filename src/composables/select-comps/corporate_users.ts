import { users_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

const loadingQueriedUsers = ref(false)
const queriedUsers = ref([] as any)
export const useQueryCorporateUsers = () => {
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()

    const queryUsers = async (corporateId:number|string, search: string) => {
        const filterData = {
            // status: ref('active'),
            search: ref(search),
            is_corporate: ref(1),
            corporate_id: computed(() => corporateId)
        }
        loadingQueriedUsers.value = true
        const res = await users_api.$_get_users(metaObject, filterData) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            queriedUsers.value = res.data?.data?.length ? res.data?.data : []
        }
        loadingQueriedUsers.value = false
    }

    return { queryUsers, loadingQueriedUsers, queriedUsers }
}
