import { ref } from 'vue'
import moment from 'moment'
import { charges_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'
import { exportAsCsv } from '@/composables/utils/csv'

const loading = ref(false)
const loading_total = ref(false)
const chargeHistory = ref([]) as Ref<any[]>
const date = ref([])
const status = ref('All')
const totalCharge = ref(null)
const downloading = ref(false)

const sample_data = [
	{
		id: 1,
		user_id: 6,
		additional_charge_id: 2,
		user_route_schedule_id: 29,
		is_remitted: 0,
		amount: '2',
		payment_reference: null,
		created_at: '2023-11-19 15:54:34',
		updated_at: '2023-11-19 15:54:34',
		user: { fname: 'Sherif', lname: 'Abubakrri', email: 'saykeed@gmail.com' },
		additionalCharge: {},
		userRouteSchedule: {},
		route: {
			route_code: 'SG-code'
		}
	},
	{
		id: 2,
		user_id: 7,
		additional_charge_id: 2,
		user_route_schedule_id: 29,
		is_remitted: 0,
		amount: '2',
		payment_reference: null,
		created_at: '2023-11-09 15:54:34',
		updated_at: '2023-11-09 15:54:34',
		user: { fname: 'Ope', lname: 'Yemi', email: 'opeyemi@gmail.com' },
		additionalCharge: {},
		userRouteSchedule: {},
		route: {
			route_code: 'SG-code'
		}
	}
]

export const useDetails = () => {
	const { prev, metaObject, next, moveTo, setFunction } = usePagination()
	const { $_get_charge_history, $_get_total_charges } = charges_api

	const fetchHistory = async () => {
		loading.value = true
		const id = useRoute().params.id as string
		const res = await $_get_charge_history(id, metaObject, date.value, status.value.toLowerCase()) as CustomAxiosResponse
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
		const res = await charges_api.$_download_charge_history(id, date.value, status.value.toLowerCase()) as CustomAxiosResponse
        if (res && res?.type !== 'ERROR') {
			const data = res.data.data
			const newArr:any[] = []
			for (let i = 0; i < data.length; i++) {
				const el = data[i]
				const y = {
					Name: `${el.user?.fname || ''} ${el.user?.lname || ''}`,
					Email: el?.user?.email || 'N/A',
					Route: el?.route?.route_code || 'N/A',
					Total_amount: el?.userRouteSchedule?.unit_cost || 'N/A',
					Charge_Amount: el?.amount || 'N/A',
					Date: el.created_at ? moment(el.created_at).format('LL') : 'N/A'
				}
				newArr.push(y)
			}
			if (date.value[0] && date.value[1]) name.value = `${name.value}-from-${date.value[0]}-to-${date.value[1]}`
			exportAsCsv(newArr, name.value)
        }
		downloading.value = false
	}
	const onFilterUpdate = (data) => {
        switch (data.type) {
            case 'dateRange':
				date.value = data.value
                break
			case 'download':
				downloadHistory()
				break
        }
    }

	setFunction(fetchHistory)

	watch([status, date], () => {
		fetchHistory()
		getTotalCharges()
	})

	const getTotalCharges = async () => {
		const id = useRoute().params.id as string
		loading_total.value = true
		totalCharge.value = null
		const res = await $_get_total_charges(Number(id), date.value) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			totalCharge.value = res.data
        }
		loading_total.value = false
	}

	return { loading, fetchHistory, chargeHistory, prev, next, moveTo, setFunction, ...metaObject, onFilterUpdate, date, status, getTotalCharges, loading_total, totalCharge, downloading }
}
