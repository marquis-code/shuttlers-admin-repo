import { partners_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

export const useGetPartnersList = () => {
    const loading = ref(false)
    const partnersList = ref([] as any)
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()
    const filterData = {
        status: ref(''),
        search: ref('')
    }

    const { $_get_all_partners } = partners_api

    const getPartnersList = async () => {
        loading.value = true

        const res = await $_get_all_partners(metaObject, filterData) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            partnersList.value = res.data.data
            metaObject.total.value = res.data.metadata.total
        }
        loading.value = false
    }
    setFunction(getPartnersList)

    watch([filterData.status, filterData.search], (val) => {
        getPartnersList()
    })

    const onFilterUpdate = (data: any) => {
        switch (data.type) {
            case 'status':
                filterData.status.value = data.value
                break
            case 'search':
                filterData.search.value = data.value
                break
        }
    }

    return { getPartnersList, loading, partnersList, filterData, onFilterUpdate, moveTo, ...metaObject, next, prev }
}

export const useGetNewPartnersList = () => {
    const loading = ref(false)
    const newPartnersList = ref([] as any)
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()
    const filterData = {
        status: ref(''),
        search: ref('')
    }

    const { $_get_new_partners } = partners_api

    const getNewPartnersList = async () => {
        loading.value = true

        const res = await $_get_new_partners(metaObject, filterData) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            newPartnersList.value = res.data.data
            metaObject.total.value = res.data.metadata.total
        }
        loading.value = false
    }
    setFunction(getNewPartnersList)

    watch([filterData.status, filterData.search], (val) => {
        getNewPartnersList()
    })

    const onFilterUpdate = (data: any) => {
        switch (data.type) {
            case 'status':
                filterData.status.value = data.value
                break
            case 'search':
                filterData.search.value = data.value
                break
        }
    }

    return { getNewPartnersList, loading, newPartnersList, filterData, onFilterUpdate, moveTo, ...metaObject, next, prev }
}

export const useGetInterestedPartnersList = () => {
    const loading = ref(false)
    const interestedPartnersList = ref([] as any)
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()
    const filterData = {
        status: ref(''),
        search: ref('')
    }

    const { $_get_interested_partners } = partners_api

    const getInterestedPartnersList = async () => {
        loading.value = true

        const res = await $_get_interested_partners(metaObject, filterData) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            interestedPartnersList.value = res.data.data
            metaObject.total.value = res.data.metadata.total
        }
        loading.value = false
    }
    setFunction(getInterestedPartnersList)

    watch([filterData.status, filterData.search], (val) => {
        getInterestedPartnersList()
    })

    const onFilterUpdate = (data: any) => {
        switch (data.type) {
            case 'status':
                filterData.status.value = data.value
                break
            case 'search':
                filterData.search.value = data.value
                break
        }
    }

    return { getInterestedPartnersList, loading, interestedPartnersList, filterData, onFilterUpdate, moveTo, ...metaObject, next, prev }
}

export const useGetPartnerPayoutList = () => {
    const loadingPayouts = ref(false)
    const partnersPayoutList = ref([] as any)
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()
    const filterData = {
        start_date_filter: ref(''),
        end_date_filter: ref(''),
        search: ref('')
    }

    const { $_get_partner_payout } = partners_api

    const getPartnersPayoutList = async () => {
        loadingPayouts.value = true

        const res = await $_get_partner_payout(metaObject, filterData) as CustomAxiosResponse
        console.log(res?.data?.result, 'here')
        if (res.type !== 'ERROR') {
            partnersPayoutList.value = res?.data?.result
            metaObject.total.value = res?.data?.metadata?.total
        }
        loadingPayouts.value = false
    }
    setFunction(getPartnersPayoutList)

    watch([filterData.start_date_filter, filterData.end_date_filter, filterData.search], (val) => {
        getPartnersPayoutList()
    })

    const onFilterUpdate = (data: any) => {
        switch (data.type) {
            case 'start_date_filter':
                filterData.start_date_filter.value = data?.value
                break
            case 'end_date_filter':
                    filterData.end_date_filter.value = data?.value
                    break
            case 'search':
                filterData.search.value = data?.value
                break
        }
    }

    return { getPartnersPayoutList, loadingPayouts, partnersPayoutList, filterData, onFilterUpdate, moveTo, ...metaObject, next, prev }
}
