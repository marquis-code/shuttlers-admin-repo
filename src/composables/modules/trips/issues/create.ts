import moment from 'moment'
import { useFetchIssues } from './fetch'
import { trip_issues_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useTripsModal } from '@/composables/core/modals'
import { useAlert } from '@/composables/core/notification'

const obj = {
	route_code: ref(''),
	trip_start_time: ref(''),
	route_day_id: ref(null) as Ref<null | number>,
	incident: ref(''),
	desc: ref(''),
	check_up_date: ref(''),
	check_up_time: ref(''),
	driver_id: ref(null) as Ref<null | number>,
	vehicle_id: ref(null) as Ref<null | number>,
	id: ref(null) as Ref<null | number>,
	isEdit: ref(false)
}
const loading = ref(false)

const clearObj = () => {
	obj.route_code.value = ''
	obj.trip_start_time.value = ''
	obj.route_day_id.value = null
	obj.incident.value = ''
	obj.desc.value = ''
	obj.check_up_date.value = ''
	obj.check_up_time.value = ''
	obj.driver_id.value = null
	obj.vehicle_id.value = null
	obj.id.value = null
	obj.isEdit.value = false
}

export const useCreateIssues = () => {
	const initLogIssues = (data:Record<string, any>) => {
		obj.route_code.value = data.route_code
		obj.trip_start_time.value = moment.utc(data.trip_start_time).format('hh:mm A')
		obj.route_day_id.value = data.id
		obj.driver_id.value = data.driver_id
		obj.vehicle_id.value = data.vehicle_id
		useTripsModal().openLogIssues()
	}

	const logIssue = async () => {
		const payload = {
			route_day_id: obj.route_day_id.value,
			incident_type: obj.incident.value,
			incident_description: obj.desc.value,
			checkup_date_time: `${obj.check_up_date.value} ${obj.check_up_time.value}`,
			driver_id: obj.driver_id.value,
			vehicle_id: obj.vehicle_id.value
		}
		loading.value = true
		const res = await trip_issues_api.$_create_issues(payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			useTripsModal().closeLogIssues()
			// useAlert().openAlert({ type: 'SUCCESS', msg: 'Issue logged successfully' })
			useTripsModal().openCreateIssues()
        }
		loading.value = false
	}

	const initUpdateIssues = (data:Record<string, any>) => {
		obj.id.value = data.id
		obj.route_code.value = data.routeday?.route?.route_code || ''
		// obj.trip_start_time.value = moment.utc(data.trip_start_time).format('hh:mm A')
		obj.trip_start_time.value = data.routeday?.itinerary?.trip_time || ''
		obj.route_day_id.value = data.routeday?.id
		obj.driver_id.value = data.driver_id
		obj.vehicle_id.value = data.vehicle_id
		obj.incident.value = data.incident_type
		obj.desc.value = data.incident_description
		obj.check_up_date.value = moment(data.checkup_date_time).format('YYYY-MM-DD')
		obj.check_up_time.value = moment.utc(data.checkup_date_time).format('hh:mm A')
		obj.isEdit.value = true
		useTripsModal().openLogIssues()
	}

	const updateIssue = async () => {
		const payload = {
			incident_type: obj.incident.value,
			incident_description: obj.desc.value,
			checkup_date_time: `${obj.check_up_date.value} ${obj.check_up_time.value}`
		}
		loading.value = true
		const res = await trip_issues_api.$_update_issues(obj.id.value!, payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			useTripsModal().closeLogIssues()
			useAlert().openAlert({ type: 'SUCCESS', msg: 'Issue updated successfully' })
			useFetchIssues().fetchIssues()
        }
		loading.value = false
	}

	return { ...obj, loading, logIssue, clearObj, initLogIssues, initUpdateIssues, updateIssue }
}

// route_day_id: 4939883,
// incident_type: 'Sick Pilot',
// incident_description: 'Sick Pilot Description',
// checkup_date_time: '2023-10-30 10:11',
// driver_id: 1225,
// vehicle_id: 434
