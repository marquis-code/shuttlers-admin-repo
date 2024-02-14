import moment from 'moment'
import { earnings_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'
import { exportAsCsv, useDownloadReport } from '@/composables/utils/csv'
import { useAlert } from '@/composables/core/notification'

const { loading: downloading } = useDownloadReport()
const payouts = ref([]) as Ref<Record<string, any>[]>
const payoutsMeta = ref({}) as Ref<Record<string, any>>
const loading = ref(false)
const filterData = {
    status: ref('settled'),
    startDate: ref(''),
    endDate: ref(''),
    search: ref('')
}

export const useCompletedPayouts = () => {
	const { moveTo, metaObject, next, prev, setFunction } = usePagination()
	const fetchCompletedPayouts = async () => {
		loading.value = true
		const res = await earnings_api.$_get_earnings(metaObject, filterData) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
			payouts.value = res.data.result?.length ? res.data.result : []
            metaObject.total.value = res.data.metadata?.pages || 0
            payoutsMeta.value = res.data.metadata?.revenue
        }
        loading.value = false
	}

	setFunction(fetchCompletedPayouts)

    watch([filterData.endDate, filterData.search], () => {
		metaObject.page.value = 1
        fetchCompletedPayouts()
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

    const downloadPayouts = async () => {
        downloading.value = true
        const name = ref('all-completed-payouts')
        const total = metaObject.page_size.value * metaObject.total.value
        const res = await earnings_api.$_download_earnings(total, filterData) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            if (res.data.result.length) {
                const data = res.data.result
                const newArr = data.map((el) => {
                    return {
                        Partner_name: `${el?.owner?.fname || ''} ${el?.owner?.lname || ''}`,
                        Company_name: el?.company_name || 'N/A',
                        Email: el?.company_email || 'N/A',
                        Payout_date: el?.referenceTime ? moment(el.referenceTime).format('LL') : 'N/A',
                        Amount: `NGN ${el?.amount || 0}`,
                        Approval: `${el?.approvalsCount || 0} of 2`
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

	return { loading, payouts, payoutsMeta, fetchCompletedPayouts, onFilterUpdate, moveTo, ...metaObject, next, prev, downloadPayouts }
}
