import { useUserIdDetails } from './id'
import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

const { selectedUser } = useUserIdDetails()

export const useUserCreditLineUsage = () => {
    const loading = ref(false)
    const creditLineUsageList = ref([] as any)
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()
    const filterData = {
      ascending: ref('1'),
      byColumn: ref('0'),
      startDate: ref(''),
      staffId: ref(''),
      endDate: ref('')
    }
    // @Marquis the solution to this is to use a watch on the selectedUser because on load the selectedUser is null and you need to watch for it and trigger the function after it loads
    watch(selectedUser, () => {
        getUserCreditLineUsage()
    })

    const getUserCreditLineUsage = async () => {
        if (!selectedUser?.value?.corporate_id) {
            return
        }
        loading.value = true
        const id = selectedUser?.value?.corporate_id
        const res = await corporates_api.$_get_credit_line_usage(selectedUser.value.corporate_id, metaObject, filterData) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            creditLineUsageList.value = res.data
            metaObject.total.value = res.data.metadata.total_pages
        }
        loading.value = false
    }

    setFunction(getUserCreditLineUsage)

    watch([filterData.startDate.value, filterData.endDate.value], (val) => {
        getUserCreditLineUsage()
    })

    const onFilterUpdate = (data: any) => {
        switch (data.type) {
            case 'startDate':
                filterData.startDate.value = data.value
                break
            case 'endDate':
                filterData.endDate.value = data.value
                break
        }
    }
    return { creditLineUsageList, loading, getUserCreditLineUsage, onFilterUpdate, filterData, moveTo, ...metaObject, next, prev, setFunction }
}
