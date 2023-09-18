import { users_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

export const useGetRecentSignupsList = () => {
    const loadingSignups = ref(false)
    const signupList = ref([] as any)
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()

    const { $_get_users } = users_api

    const getSignupList = async () => {
        loadingSignups.value = true
        metaObject.page_size.value = 5
        const res = await $_get_users(metaObject) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            signupList.value = res.data.data
        }
        loadingSignups.value = false
    }

    return { getSignupList, loadingSignups, signupList }
}

export const useGetUsersList = () => {
    const loading = ref(false)
    const usersList = ref([] as any)
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()
    const filterData = {
        status: ref(''),
        search: ref('')
    }

    const { $_get_users } = users_api

    const getUsersList = async () => {
        loading.value = true

        const res = await $_get_users(metaObject, filterData) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            usersList.value = res.data.data
            metaObject.total.value = res.data.metadata.total_pages
        }
        loading.value = false
    }
    setFunction(getUsersList)

    watch([filterData.status, filterData.search], (val) => {
        getUsersList()
    })

    const onFilterUpdate = (data: any) => {
        switch (data.type) {
            case 'status':
                filterData.status.value = data.value === '0' ? 'inactive' : 'active'
                break
            case 'search':
                filterData.search.value = data.value
        }
    }

    return { getUsersList, loading, usersList, filterData, onFilterUpdate, moveTo, ...metaObject, next, prev }
}

export const useGetUserByCorporateId = () => {
    const loadingCorporateUsers = ref(false)
    const corporateUsersList = ref([] as any)

    const { $_get_users_by_corporate_id } = users_api

    const getCorporatesByIdList = async (id:string) => {
        loadingCorporateUsers.value = true
        const res = await $_get_users_by_corporate_id(id) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            corporateUsersList.value = res.data.data
        }
        loadingCorporateUsers.value = false
    }

    return { getCorporatesByIdList, loadingCorporateUsers, corporateUsersList }
}
