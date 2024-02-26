import moment from 'moment'
import { pastPayouts_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

const views = ['Payout', 'Deductions']
const active = ref('Payout') as Ref<'Payout'|'Deductions'>
const loading = ref(false)
const pastPayouts = ref([]) as Ref<Record<string, any>[]>
const filterData = {
	startDate: ref(''),
	endDate: ref('')
}

export const usePastPayouts = () => {
	const { metaObject, moveTo, next, prev, setFunction } = usePagination()

    const getPastPayouts = async () => {
        pastPayouts.value = []
        loading.value = true
        const accountSid = useRoute().params.accountSid as string
        const res = await pastPayouts_api.$_get_past_payouts(accountSid, metaObject, filterData) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            pastPayouts.value = res.data?.result?.length ? res.data.result : []
            metaObject.total.value = res.data.metadata?.pages
        }
        loading.value = false
    }

    const getPastDeductions = async () => {
        pastPayouts.value = []
        loading.value = true
        const accountSid = useRoute().params.accountSid as string
        const res = await pastPayouts_api.$_get_past_deductions(accountSid, metaObject, filterData) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            pastPayouts.value = res.data?.result?.length ? res.data.result : []
            metaObject.total.value = res.data.metadata?.pages
        }
        loading.value = false
    }

	setFunction(active.value === 'Payout' ? getPastPayouts : getPastDeductions)

    watch([filterData.endDate, active], () => {
		metaObject.page.value = 1
        active.value === 'Payout' ? getPastPayouts() : getPastDeductions()
    })

	const onFilterUpdate = (data) => {
		switch (data.type) {
			case 'dateRange':
				filterData.startDate.value = data.value[0] ? data.value[0] : ''
				filterData.endDate.value = data.value[1] ? data.value[1] : ''
				break
		}
	}

	return { onFilterUpdate, getPastPayouts, pastPayouts, loading, ...metaObject, moveTo, next, prev, ...filterData, views, active }
}
