import moment from 'moment'
import { users_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'
import { exportAsCsv, useDownloadReport } from '@/composables/utils/csv'

const { loading: downloading } = useDownloadReport()
export const useGetUsersGraph = () => {
    const loading = ref(false)
    const usersGraphData = ref({} as any)

    const getUsersGraph = async () => {
        loading.value = true
        const res = await users_api.$_get_graph() as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            usersGraphData.value = res.data
        }
        loading.value = false
    }

    return { getUsersGraph, loading, usersGraphData }
}

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

    const usersList = ref([] as any)
export const useGetUsersList = () => {
    const loading = ref(false)
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()
    const filterData = {
        status: ref('active'),
        search: ref(''),
        start_date_filter: ref(''),
        end_date_filter: ref(''),
        corporate_id: ref(''),
        is_corporate: ref(0)
    }

    const { $_get_users } = users_api

    const getUsersList = async () => {
        usersList.value = []
        loading.value = true
        const res = await $_get_users(metaObject, filterData) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            usersList.value = res.data.data
            metaObject.total.value = res.data.metadata.total_pages
        }
        loading.value = false
    }
    setFunction(getUsersList)

    watch([filterData.status, filterData.search, filterData.end_date_filter, filterData.start_date_filter], (val) => {
        getUsersList()
    })

    const onFilterUpdate = (data: any) => {
        switch (data.type) {
            case 'status':
                filterData.status.value = data.value === '0' ? 'inactive' : 'active'
                break
            case 'search':
                filterData.search.value = data.value
                break
            case 'dateRange':
                filterData.start_date_filter.value = data.value[0] ? data.value[0] : ''
                filterData.end_date_filter.value = data.value[1] ? data.value[1] : ''
                break
        }
    }

    const downloadUsers = async () => {
		downloading.value = true
		const name = ref(`all-${filterData.status.value}-users`)
		const res = await users_api.$_download_all_users(filterData) as CustomAxiosResponse
        if (res && res?.type !== 'ERROR') {
			const data = res.data.data
            const newArr = data.map((el) => {
                return {
                    Name: `${el?.fname || ''} ${el?.lname || ''}`,
                    Email: el?.email || 'N/A',
                    Phone: el?.phone ? `${el.phone}` : 'N/A',
					Date_joined: el?.created_at ? moment(el?.created_at).format('ll') : 'N/A',
					Wallet_balance: `NGN ${el?.wallet?.amount}`,
					Company_balance: `NGN ${el?.wallet?.credit_amount}`,
                    Status: el?.active === '1' ? 'Active' : 'Inactive'
                }
            })
			if (filterData.start_date_filter.value && filterData.end_date_filter.value) name.value = `${name.value}-from-${filterData.start_date_filter.value}-to-${filterData.end_date_filter.value}`
			exportAsCsv(newArr, name.value)
        }
		downloading.value = false
	}

    return { getUsersList, loading, usersList, filterData, onFilterUpdate, moveTo, ...metaObject, next, prev, downloadUsers }
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
