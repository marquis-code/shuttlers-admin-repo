import { earnings_api, partners_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

const partnerInfo = ref({}) as Ref<Record<string, any>>
const earningInfo = ref({}) as Ref<Record<string, any>>
const deductions = ref([]) as Ref<Record<string, any>[]>
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

	return { loading_earnings, loading_partners, loading_deductions, partnerInfo, earningInfo, deductions, fetchDeductions, fetchParnersInfo, fetchEarningInfo }
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

	return { loading, revenues, revenueMeta, fetchRevenues, onFilterUpdate, moveTo, ...metaObject, next, prev }
}
