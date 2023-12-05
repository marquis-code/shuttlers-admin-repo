/* eslint-disable import/no-named-as-default-member */
import moment from 'moment'
import { trip_issues_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useTripsModal } from '@/composables/core/modals'

const obj = {
	route_code: ref(''),
	trip_start_time: ref(''),
	incident: ref(''),
	desc: ref(''),
	check_up_date: ref(''),
	check_up_time: ref(''),
	isEdit: ref(false)
}
const loading = ref(false)

const clearObj = () => {
	obj.route_code.value = ''
	obj.trip_start_time.value = ''
	obj.incident.value = ''
	obj.desc.value = ''
	obj.check_up_date.value = ''
	obj.check_up_time.value = ''
}

export const useCreateIssues = () => {
	const initLogIssues = (data:Record<string, any>) => {
		obj.route_code.value = data.route_code
		obj.trip_start_time.value = moment.utc(data.trip_start_time).format('hh:mm A')
		useTripsModal().openLogIssues()
	}

	const logIssue = async () => {
		const payload = {
			route_day_id: 4939883,
			incident_type: 'Sick Pilot',
			incident_description: 'Sick Pilot Description',
			checkup_date_time: '2023-10-30 10:11',
			driver_id: 1225,
			vehicle_id: 434
		}
		loading.value = true
		const res = await trip_issues_api.$_create_issues(payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			useTripsModal().closeLogIssues()
        }
		loading.value = false
	}

	return { ...obj, loading, logIssue, clearObj, initLogIssues }
}
