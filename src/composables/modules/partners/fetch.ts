import moment from 'moment'
import { partners_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'
import { exportAsCsv, useDownloadReport } from '@/composables/utils/csv'

const { loading: downloading } = useDownloadReport()

export const useGetPartnersList = () => {
    const loading = ref(false)
    const partnersList = ref([] as any)
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()
    const filterData = {
        status: ref(''),
        search: ref(''),
        start_date: ref(''),
        end_date: ref('')
    }

    const { $_get_all_partners, $_download_all_partners } = partners_api

    const getPartnersList = async () => {
        loading.value = true

        const res = await $_get_all_partners(metaObject, filterData) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            partnersList.value = res.data.data
            metaObject.total.value = res.data.metadata.total_pages
        }
        loading.value = false
    }
    setFunction(getPartnersList)

    watch([filterData.status, filterData.search, filterData.end_date], (val) => {
        metaObject.page.value = 1
        getPartnersList()
    })

    const onFilterUpdate = (data: any) => {
        switch (data.type) {
            case 'status':
                filterData.status.value = data.value === '1' ? 'active' : data.value === '0' ? 'inactive' : ''
                break
            case 'search':
                filterData.search.value = data.value
                break
            case 'dateRange':
                filterData.start_date.value = data.value[0] ? data.value[0] : ''
                filterData.end_date.value = data.value[1] ? data.value[1] : ''
                break
        }
    }

    const downloadAllPartners = async () => {
		downloading.value = true
		const name = ref(`all-${filterData.status.value}-partners`)
		const res = await $_download_all_partners(filterData) as CustomAxiosResponse
        if (res && res?.type !== 'ERROR') {
			const data = res.data.data
            const newArr = data.map((el) => {
                return {
                    Name: `${el.owner?.fname || ''} ${el.owner?.lname || ''}`,
					Email: el?.owner?.email || 'N/A',
					No_of_vehicles: el?.vehicles_count || 'N/A',
					Date: el.created_at ? moment(el.created_at).format('LL') : 'N/A',
                    Status: el.status
                }
            })
			if (filterData.start_date.value && filterData.end_date.value) name.value = `${name.value}-from-${filterData.start_date.value}-to-${filterData.end_date.value}`
			exportAsCsv(newArr, name.value)
        }
		downloading.value = false
	}

    return { getPartnersList, loading, partnersList, filterData, onFilterUpdate, moveTo, ...metaObject, next, prev, downloadAllPartners }
}

export const useGetNewPartnersList = () => {
    const loading = ref(false)
    const newPartnersList = ref([] as any)
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()
    const filterData = {
        status: ref(''),
        search: ref(''),
        start_date: ref(''),
        end_date: ref('')
    }

    const { $_get_new_partners, $_download_new_partners } = partners_api

    const getNewPartnersList = async () => {
        loading.value = true

        const res = await $_get_new_partners(metaObject, filterData) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            newPartnersList.value = res.data.data
            metaObject.total.value = res.data.metadata.total_pages
        }
        loading.value = false
    }
    setFunction(getNewPartnersList)

    watch([filterData.status, filterData.search, filterData.end_date], (val) => {
        metaObject.page.value = 1
        getNewPartnersList()
    })

    const onFilterUpdate = (data: any) => {
        switch (data.type) {
            case 'status':
                // filterData.status.value = data.value
                filterData.status.value = data.value === '1' ? 'active' : data.value === '0' ? 'inactive' : ''
                break
            case 'search':
                filterData.search.value = data.value
                break
            case 'dateRange':
                filterData.start_date.value = data.value[0] ? data.value[0] : ''
                filterData.end_date.value = data.value[1] ? data.value[1] : ''
                break
        }
    }

    const downloadNewPartners = async () => {
		downloading.value = true
		const name = ref(`new-${filterData.status.value}-partners`)
		const res = await $_download_new_partners(filterData) as CustomAxiosResponse
        if (res && res?.type !== 'ERROR') {
			const data = res.data.data
            const newArr = data.map((el) => {
                return {
                    Name: `${el.owner?.fname || ''} ${el.owner?.lname || ''}`,
                    Company_name: el?.company_name || 'N/A',
					Email: el?.owner?.email || 'N/A',
					No_of_vehicles: el?.vehicles_count || 'N/A',
					Date: el.created_at ? moment(el.created_at).format('LL') : 'N/A',
                    Status: el.status
                }
            })
			if (filterData.start_date.value && filterData.end_date.value) name.value = `${name.value}-from-${filterData.start_date.value}-to-${filterData.end_date.value}`
			exportAsCsv(newArr, name.value)
        }
		downloading.value = false
	}

    return { getNewPartnersList, loading, newPartnersList, filterData, onFilterUpdate, moveTo, ...metaObject, next, prev, downloadNewPartners }
}

export const useGetInterestedPartnersList = () => {
    const loading = ref(false)
    const interestedPartnersList = ref([] as any)
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()
    const filterData = {
        status: ref(''),
        search: ref(''),
        start_date: ref(''),
        end_date: ref('')
    }

    const { $_get_interested_partners, $_download_interested_partners } = partners_api

    const getInterestedPartnersList = async () => {
        loading.value = true

        const res = await $_get_interested_partners(metaObject, filterData) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            interestedPartnersList.value = res.data.data
            metaObject.total.value = res.data.metadata.total_pages
        }
        loading.value = false
    }
    setFunction(getInterestedPartnersList)

    watch([filterData.status, filterData.search, filterData.end_date], (val) => {
        metaObject.page.value = 1
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
            case 'dateRange':
                filterData.start_date.value = data.value[0] ? data.value[0] : ''
                filterData.end_date.value = data.value[1] ? data.value[1] : ''
                break
        }
    }

    const downloadInterestedPartners = async () => {
		downloading.value = true
		const name = ref('interested-partners')
		const res = await $_download_interested_partners(filterData) as CustomAxiosResponse
        if (res && res?.type !== 'ERROR') {
			const data = res.data.data
            const newArr = data.map((el) => {
                return {
                    Name: `${el?.fname || ''} ${el?.lname || ''}`,
                    Company_name: el?.company_name || 'N/A',
					Email: el?.email || 'N/A',
                    Phone: el?.phone || 'N/A',
					// No_of_vehicles: el?.vehicles_count || 'N/A',
					Date: el.created_at ? moment(el.created_at).format('LL') : 'N/A'
                    // Status: el.status
                }
            })
			if (filterData.start_date.value && filterData.end_date.value) name.value = `${name.value}-from-${filterData.start_date.value}-to-${filterData.end_date.value}`
			exportAsCsv(newArr, name.value)
        }
		downloading.value = false
	}

    return { getInterestedPartnersList, loading, interestedPartnersList, filterData, onFilterUpdate, moveTo, ...metaObject, next, prev, downloadInterestedPartners }
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
