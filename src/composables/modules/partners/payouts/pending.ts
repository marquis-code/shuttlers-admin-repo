import moment from 'moment'
import { earnings_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'
import { exportAsCsv, useDownloadReport } from '@/composables/utils/csv'
import { useAlert } from '@/composables/core/notification'
import { formatDateToGetTheLastDay } from '@/composables/utils/formatter'

const { loading: downloading } = useDownloadReport()
const payouts = ref([]) as Ref<Record<string, any>[]>
const payoutsMeta = ref({}) as Ref<Record<string, any>>
const loading = ref(false)
const filterData = {
    status: ref('pending-payout,pending-settlement'),
    startDate: ref(''),
    endDate: ref(''),
    search: ref(''),
    cycle: ref('all')
}

export const usePendingPayouts = () => {
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()
    const fetchPendingPayouts = async () => {
        loading.value = true
        const res = await earnings_api.$_get_earnings(metaObject, filterData) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            payouts.value = res.data.result?.length ? res.data.result : []
            metaObject.total.value = res.data.metadata?.pages || 0
            payoutsMeta.value = res.data.metadata?.revenue
        }
        loading.value = false
    }

    setFunction(fetchPendingPayouts)

    watch([filterData.endDate, filterData.search, filterData.cycle], () => {
        metaObject.page.value = 1
        fetchPendingPayouts()
    })

    const onFilterUpdate = (data: any) => {
        switch (data.type) {
            case 'dateRange':
                filterData.startDate.value = data.value[0] ? `${data.value[0]}-01` : ''
                filterData.endDate.value = data.value[1] ? formatDateToGetTheLastDay(data.value[1]) : ''
                break
            case 'search':
                filterData.search.value = data.value
                break
        }
    }

    const downloadPayouts = async () => {
        downloading.value = true
        const name = ref('all-pending-payouts')
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
                        Payout_period: el?.earningPeriod?.start ? `${moment(el.earningPeriod.start).format('ll')} - ${moment(el.earningPeriod.end).format('ll')}` : 'N/A',
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

    return { loading, payouts, payoutsMeta, fetchPendingPayouts, onFilterUpdate, moveTo, ...metaObject, next, prev, downloadPayouts, filterData }
}
