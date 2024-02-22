import moment from 'moment'
import { earnings_api, partners_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'
import { exportAsCsv, useDownloadReport } from '@/composables/utils/csv'
import { useAlert } from '@/composables/core/notification'

const { loading: downloading } = useDownloadReport()
const partnerInfo = ref({}) as Ref<Record<string, any>>
const earningInfo = ref({}) as Ref<Record<string, any>>
const deductions = ref([]) as Ref<Record<string, any>[]>
const approvers = ref([]) as Ref<Record<string, any>[]>
const loading_partners = ref(false)
const loading_earnings = ref(false)
const loading_deductions = ref(false)

export const usePayoutDetails = () => {
	const fetchParnersInfo = async () => {
		partnerInfo.value = {}
		const partnerId = useRoute().params.id as string
		loading_partners.value = true
		const res = await partners_api.$_get_partner_by_id(partnerId) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			partnerInfo.value = res.data?.id ? res.data : {}
			if (partnerInfo.value?.account_sid) useEarningsRevenues().fetchRevenues()
        }
		loading_partners.value = false
	}

	const fetchEarningInfo = async () => {
		earningInfo.value = {}
		const earningId = useRoute().params.earningId as string
		loading_earnings.value = true
		const res = await earnings_api.$_get_earnings_by_id(earningId) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			earningInfo.value = res.data
			// useAlert().openAlert({ type: 'SUCCESS', msg: res.data?.message || 'Deduction successful' })
        }
		loading_earnings.value = false
	}

	const fetchDeductions = async () => {
		deductions.value = []
		const earningId = useRoute().params.earningId as string
		loading_deductions.value = true
		const res = await earnings_api.$_get_earnings_deductions(earningId) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			const arr = res.data.result?.length ? res.data.result : []
			deductions.value = arr
			// deductions.value = arr.filter((el) => !el.tripRevenueId)
        }
		loading_deductions.value = false
	}

	const fetchApprovers = async () => {
		const earningId = useRoute().params.earningId as string
		const res = await earnings_api.$_get_approvers(earningId) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			approvers.value = res.data?.length ? res.data : []
        }
	}

	return { loading_earnings, loading_partners, loading_deductions, partnerInfo, earningInfo, deductions, approvers, fetchDeductions, fetchApprovers, fetchParnersInfo, fetchEarningInfo }
}

const revenues = ref([]) as Ref<Record<string, any>[]>
const revenueMeta = ref({}) as Ref<Record<string, any>>
const loading = ref(false)
const filterData = {
    startDate: ref(''),
    endDate: ref(''),
    search: ref('')
}

export const useEarningsRevenues = () => {
	const { moveTo, metaObject, next, prev, setFunction } = usePagination()
	const fetchRevenues = async () => {
		revenues.value = []
		const earningId = useRoute().params.earningId as string
		loading.value = true
		const res = await earnings_api.$_get_partner_revenue(partnerInfo.value.account_sid, earningId, metaObject, filterData) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			revenues.value = res.data.result?.length ? res.data.result : []
            metaObject.total.value = res.data.metadata?.pages || 0
			revenueMeta.value = res.data.metadata?.revenue
        }
        loading.value = false
	}

	setFunction(fetchRevenues)

    watch([filterData.endDate, filterData.search], () => {
		metaObject.page.value = 1
        fetchRevenues()
    })

    const onFilterUpdate = (data: any) => {
        switch (data.type) {
            case 'dateRange':
				filterData.startDate.value = data.value[0] ? data.value[0] : ''
				filterData.endDate.value = data.value[1] ? data.value[1] : ''
                break
            case 'search':
                filterData.search.value = data.value
                break
        }
    }

	const downloadRevenues = async () => {
        downloading.value = true
		const earningId = useRoute().params.earningId as string
        const name = ref('all-revenues')
        const total = metaObject.page_size.value * metaObject.total.value
        const res = await earnings_api.$_download_partner_revenue(partnerInfo.value.account_sid, earningId, filterData) as CustomAxiosResponse
        if (res?.type !== 'ERROR') {
            if (res.data.result.length) {
                const data = res.data.result
                const newArr = data.map((el) => {
                    return {
                        Trip_date: el?.tripStartTime ? moment(el?.tripStartTime).format('LLL') : 'N/A',
						Time_of_creation: moment(el?.created_at).format('LL'),
						Pickup: el?.metadata?.pickup || 'N/A',
						Destination: el?.metadata?.dropoff || 'N/A',
						Route_code: el?.metadata?.routeCode || 'N/A',
						Amount_earned: el?.partnersRevenue || 'N/A',
						Deduction: el?.totalDeductedAmount || 'N/A',
						Net_income: el?.finalPartnersRevenue,
						Description: el?.description || 'N/A',
						Status: el?.isSettled ? 'Settled' : 'Not settled'
					}
                })
                if (filterData.startDate.value && filterData.endDate.value) name.value = `${name.value}-from-${filterData.startDate.value}-to-${filterData.endDate.value}`
                exportAsCsv(newArr, name.value)
            } else {
                useAlert().openAlert({ type: 'ERROR', msg: 'No data to download' })
            }
        }
        downloading.value = false
    }

	return { loading, revenues, revenueMeta, fetchRevenues, onFilterUpdate, moveTo, ...metaObject, next, prev, downloadRevenues }
}
