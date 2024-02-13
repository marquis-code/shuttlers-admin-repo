import { useUserIdDetails } from '../id'
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
      startDate: ref('') as any,
      staffId: ref(''),
      endDate: ref('') as any
    }

    const getUserCreditLineUsage = async () => {
        loading.value = true
        if (!selectedUser?.value?.corporate_id) {
            return
        }
        // const id = selectedUser?.value?.corporate_id
        const res = await corporates_api.$_get_credit_line_usage(selectedUser.value.corporate_id, metaObject, filterData) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            creditLineUsageList.value = res.data
            metaObject.total.value = res.data.total
        }
        loading.value = false
    }

    setFunction(getUserCreditLineUsage)

    watch([filterData.startDate, filterData.endDate], (val) => {
        getUserCreditLineUsage()
    })

    const onFilterUpdate = (data: any) => {
        switch (data.type) {
            case 'start_date':
                filterData.startDate.value = data.value
                break
            case 'end_date':
                filterData.endDate.value = data.value
                break
        }
    }
    return { creditLineUsageList, loading, getUserCreditLineUsage, onFilterUpdate, filterData, moveTo, ...metaObject, next, prev, setFunction }
}
