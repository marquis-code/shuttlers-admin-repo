import { ref } from 'vue'
import moment from 'moment'
import { singleConfiguredCharge } from './fetch'
import { charges_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'
import { exportAsCsv, useDownloadReport } from '@/composables/utils/csv'

const loading = ref(false)
const loading_total = ref(false)
const chargeHistory = ref([]) as Ref<any[]>
const date = ref([])
const status = ref('All')
const totalCharge = ref(null)
const cities = ref([]) as Ref<any[]>
const countries = ref([]) as Ref<any[]>
const { loading: downloading, download } = useDownloadReport()

const getCitiesId = computed(() => {
	return cities.value.map((el) => { return el.value })
})

const getCountriesId = computed(() => {
	return countries.value.map((el) => { return el.value })
})

const filterData = {
    start_date: ref(''),
	end_date: ref(''),
	status: computed(() => status.value),
    search: ref(''),
	city_ids: computed(() => getCitiesId.value.length ? getCitiesId.value : ''),
	country_ids: computed(() => getCountriesId.value.length ? getCountriesId.value : '')
}

export const useDetails = () => {
	const { prev, metaObject, next, moveTo, setFunction } = usePagination()
	const { $_get_charge_history, $_get_total_charges } = charges_api

	const fetchHistory = async () => {
		chargeHistory.value = []
		loading.value = true
		const id = useRoute().params.id as string
		const res = await $_get_charge_history(id, metaObject, filterData) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			chargeHistory.value = res.data?.data?.length ? res.data.data : []
			metaObject.total.value = res.data.metadata.total_pages
        }
		loading.value = false
	}

	const downloadHistory = async () => {
		downloading.value = true
		const name = ref(`${status.value}-charge-history`)
		const id = useRoute().params.id as string
		const res = await charges_api.$_download_charge_history(id, filterData) as CustomAxiosResponse
        if (res && res?.type !== 'ERROR') {
			const data = res.data.data
			const newArr:any[] = []
			for (let i = 0; i < data.length; i++) {
				const el = data[i]
				const y = {
					Name: `${el.user?.fname || ''} ${el.user?.lname || ''}`,
					Email: el?.user?.email || 'N/A',
					Route: el?.route?.route_code || 'N/A',
					Charge_type: singleConfiguredCharge.value?.additionChargeType?.short_name || 'N/A',
					Charge_percent: el.additionalCharge?.charge_type === 'percentage' ? `${el?.additionalCharge?.charge_value} %` : `NGN ${el?.additionalCharge?.charge_value} flat`,
					Total_amount: el?.userRouteSchedule?.unit_cost || 'N/A',
					Charge_Amount: el?.amount || 'N/A',
					Date: el.created_at ? moment(el.created_at).format('LL') : 'N/A'
				}
				newArr.push(y)
			}
			if (filterData.start_date.value && filterData.end_date.value) name.value = `${name.value}-from-${filterData.start_date.value}-to-${filterData.end_date.value}`
			exportAsCsv(newArr, name.value)
        }
		downloading.value = false
	}
	const onFilterUpdate = (data) => {
        switch (data.type) {
            case 'dateRange':
				filterData.start_date.value = data.value[0] ? data.value[0] : ''
				filterData.end_date.value = data.value[1] ? data.value[1] : ''
				date.value = data.value
                break
			case 'search':
				filterData.search.value = data.value
				break
			case 'download':
				downloadHistory()
				break
        }
    }

	setFunction(fetchHistory)

	watch([status, filterData.end_date, filterData.search, cities, countries], () => {
		metaObject.page.value = 1
		fetchHistory()
		getTotalCharges()
	})

	const getTotalCharges = async () => {
		const id = useRoute().params.id as string
		loading_total.value = true
		totalCharge.value = null
		const res = await $_get_total_charges(Number(id), date.value, status.value.toLowerCase()) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			totalCharge.value = res.data
        }
		loading_total.value = false
	}

	return { loading, fetchHistory, chargeHistory, prev, next, moveTo, setFunction, ...metaObject, onFilterUpdate, date, status, getTotalCharges, loading_total, totalCharge, downloading, cities, countries, downloadHistory }
}
