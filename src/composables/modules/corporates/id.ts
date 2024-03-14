import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'
import { useUserIdDetails } from '@/composables/modules/users/id'
const selectedCorporate = ref({} as Record<string, any>)
const selectedCorporateId = ref('')

export const useCorporateIdDetails = () => {
    const loading = ref(false)

    const getCorporateById = async (id: string) => {
        selectedCorporateId.value = id
        loading.value = true
        const res = await corporates_api.$_get_corporate_by_id(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            selectedCorporate.value = res.data
        }
        loading.value = false
    }
    return { selectedCorporate, loading, getCorporateById }
}

const corporateWalletDetails = ref({} as any)
export const useCorporateWalletDetails = () => {
    const { selectedUser } = useUserIdDetails()
    const loading = ref(false)
    const getCorporateWalletObject = async () => {
        const corporate_id = Number(useRoute().params.id)
        loading.value = true
        const res = await corporates_api.$_get_company_wallet_info_by_id(corporate_id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            corporateWalletDetails.value = res.data.data[0]
        }
        loading.value = false
    }
    return { corporateWalletDetails, loading, getCorporateWalletObject }
}

export const useCorporateAccountManagers = () => {
    const loading = ref(false)
    const corporateAccountManagers = ref([] as any)
    const getCorporateAccountManagers = async (id:number) => {
        loading.value = true
        const res = await corporates_api.$_get_accout_managers(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            corporateAccountManagers.value = res.data
        }
        loading.value = false
    }
    return { corporateAccountManagers, loading, getCorporateAccountManagers }
}

export const useCorporateTripReport = () => {
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()
    const filterData = {
        start_date_filter: ref(''),
        end_date_filter: ref('')
    }
    watch([filterData.start_date_filter, filterData.end_date_filter], (val) => {
        getCorporateTripReport()
    })
    const loading = ref(false)
    const corporateTripReport = ref([] as any)
    const getCorporateTripReport = async () => {
        loading.value = true
        const res = await corporates_api.$_get_trip_report(Number(selectedCorporateId.value), metaObject, filterData) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            corporateTripReport.value = res.data
            metaObject.total.value = res.data.pagination?.pageCount
        }
        loading.value = false
    }
    setFunction(getCorporateTripReport)
    const onFilterUpdate = (data) => {
        if (data.type === 'dateRange') {
            filterData.start_date_filter.value = data.value[0]
            filterData.end_date_filter.value = data.value[1]
        }
    }
    return { corporateTripReport, loading, getCorporateTripReport, filterData, onFilterUpdate, next, prev, moveTo, ...metaObject }
}

export const useCorporateGroups = () => {
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()
    const filterData = {
        srearch: ref('')
    }
    watch([filterData.srearch], (val) => {
        getCorporateGroups()
    })
    const loading = ref(false)
    const corporateGroupList = ref([] as any)
    const getCorporateGroups = async () => {
        loading.value = true
        const res = await corporates_api.$_get_trips_groups(Number(selectedCorporateId.value), metaObject, filterData) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            corporateGroupList.value = res.data.data
            metaObject.total.value = res.data.pagination?.pageCount
        }
        loading.value = false
    }
    setFunction(getCorporateGroups)
    const onFilterUpdate = (data) => {
        if (data.type === 'search') {
            filterData.srearch.value = data.value
        }
    }
    return { corporateGroupList, loading, getCorporateGroups, filterData, onFilterUpdate, next, prev, moveTo, ...metaObject }
}

export const useCorporateCreditSystem = () => {
    const loading = ref(false)
    const corporateCreditSystem = ref([] as any)
    const getCorporateCreditSystem = async () => {
        loading.value = true
        const res = await corporates_api.$_get_accout_managers(Number(selectedCorporateId.value)) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            corporateCreditSystem.value = res.data.data
        }
        loading.value = false
    }
    return { corporateCreditSystem, loading, getCorporateCreditSystem }
}

export const useCorporateSetting = () => {
    const loading = ref(false)
    const corporateSettings = ref({} as any)
    const getCorporateSettings = async () => {
        loading.value = true
        const res = await corporates_api.$_get_corperate_settings(Number(selectedCorporateId.value)) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            corporateSettings.value = res.data
        }
        loading.value = false
    }
    return { corporateSettings, loading, getCorporateSettings }
}
