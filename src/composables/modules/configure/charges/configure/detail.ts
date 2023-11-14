import { ref } from 'vue'
import { charges_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

const loading = ref(false)
const loading_total = ref(false)
const chargeHistory = ref([]) as Ref<any[]>
const date = ref([])
const status = ref('All')
const totalCharge = ref(null)

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
		const res = await $_get_charge_history(metaObject, date.value, status.value.toLowerCase()) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			chargeHistory.value = res.data?.data?.length ? res.data.data : []
			metaObject.total.value = res.data.metadata.total_pages
        }
		loading.value = false
	}

	const onFilterUpdate = (data) => {
        switch (data.type) {
            case 'dateRange':
				date.value = data.value
                break
        }
    }

	setFunction(fetchHistory)

	watch([status, date], () => {
		fetchHistory()
		getTotalCharges()
	})

	const getTotalCharges = async () => {
		loading_total.value = true
		const res = await $_get_total_charges(date.value) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			totalCharge.value = res.data || null
        }
		loading_total.value = false
	}

	return { loading, fetchHistory, chargeHistory, prev, next, moveTo, setFunction, ...metaObject, onFilterUpdate, date, status, getTotalCharges, loading_total, totalCharge }
}
