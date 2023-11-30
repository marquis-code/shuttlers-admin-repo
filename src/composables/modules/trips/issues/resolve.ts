import moment from 'moment'
import { trip_issues_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useTripsModal } from '@/composables/core/modals'
import { useAlert } from '@/composables/core/notification'

const obj = {
	route_code: ref(''),
	start_time: ref(''),
	incident: ref(''),
	desc: ref(''),
	resolution: ref('Buffer') as Ref<'Buffer'|'Others'|'Pilot warned'>,
	resolution_desc: ref(''),
	id: ref(null) as Ref<null|number>
}
const loading = ref(false)

const clearObj = () => {
	obj.route_code.value = ''
	obj.start_time.value = ''
	obj.incident.value = ''
	obj.desc.value = ''
	obj.resolution.value = 'Buffer'
	obj.resolution_desc.value = ''
	obj.id.value = null
}

export const useResolveIssues = () => {
	const initResolveIssues = (data:Record<string, any>) => {
		obj.id.value = data.id
		obj.route_code.value = data.routeday?.route?.route_code
		obj.start_time.value = data.routeday?.itinerary?.trip_time
		obj.incident.value = data.incident_type
		obj.desc.value = data.incident_description
		useTripsModal().openResolveIssues()
	}

	const resolveIssue = async () => {
		const payload = {
			resolution_type: obj.resolution.value,
			resolution_description: obj.resolution.value === 'Others' ? obj.resolution_desc.value : ''
		}
		loading.value = true
		const res = await trip_issues_api.$_resolve_issues(obj.id.value!, payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			useAlert().openAlert({ type: 'SUCCESS', msg: 'You have successfully logged a resolution to an issue.' })
			useTripsModal().closeResolveIssues()
        }
		loading.value = false
	}

	return { ...obj, loading, resolveIssue, clearObj, initResolveIssues }
}
