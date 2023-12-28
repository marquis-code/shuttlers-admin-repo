import moment from 'moment'
import { ref } from 'vue'
import { trip_issues_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'
import { exportAsCsv, useDownloadReport } from '@/composables/utils/csv'

const { loading: downloading } = useDownloadReport()
const resolved_issues = ref([]) as Ref<Record<string, any>[]>
const loading = ref(false)
const selected_resolution_type = ref([]) as Ref<Record<string, any>[]>
const incident = ref('')
const filterData = {
    'filter[incident_type]': computed(() => incident.value),
	'filter[resolution_type]': computed(() => selected_resolution_type.value.map((el) => el.value)),
    startDate: ref(''),
	endDate: ref(''),
    search: ref('')
}

export const useFetchResolved = () => {
	const { prev, metaObject, next, moveTo, setFunction } = usePagination()

	const fetchResolved = async () => {
		loading.value = true
		const res = await trip_issues_api.$_get_all_issues(metaObject, filterData) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            resolved_issues.value = res.data.data?.length ? res.data.data : []
			metaObject.total.value = res.data.metadata.total_pages
        }
		loading.value = false
	}

	const downloadAllResolvedIssues = async () => {
		downloading.value = true
		const name = ref(`all-${incident.value ? `${incident.value}-` : ''}resolved-issues`)
		const res = await trip_issues_api.$_download_all_resolved_issues(filterData) as CustomAxiosResponse
        if (res && res?.type !== 'ERROR') {
			const data = res.data.data
            const newArr = data.map((el) => {
                return {
                    Route_code: el?.routeday?.route?.route_code || 'N/A',
					Pilot: `${el?.driver?.fname || ''} ${el?.driver?.lname || ''} (${el?.driver?.phone || 'No Phone number'})`,
					Start_date_and_time: el?.routeday?.trip_date ? `${moment(el.routeday?.trip_date).format('LL')} (${el?.routeday?.itinerary?.trip_time})` : 'N/A',
					Incident: el?.incident_type || 'N/A',
					Resolution: el?.resolution_type || 'N/A',
					// Checkup_date_and_time: el?.checkup_date_time ? `${moment(el.checkup_date_time).format('LL')} (${moment.utc(el?.checkup_date_time).format('LT')})` : 'N/A',
                    Logged_by: `${el?.staff?.fname || ''} ${el?.staff?.lname || ''}`
                }
            })
			if (filterData.startDate.value && filterData.endDate.value) name.value = `${name.value}-from-${filterData.startDate.value}-to-${filterData.endDate.value}`
			exportAsCsv(newArr, name.value)
        }
		downloading.value = false
	}

	const onFilterUpdate = (data) => {
        switch (data.type) {
            case 'search':
				filterData.search.value = data.value
                break
			case 'dateRange':
				filterData.startDate.value = data.value[0] ? data.value[0] : ''
				filterData.endDate.value = data.value[1] ? data.value[1] : ''
				break
        }
    }

	watch([filterData.search, incident, filterData.endDate, selected_resolution_type], () => {
        fetchResolved()
    })

	setFunction(fetchResolved)

	return { loading, resolved_issues, fetchResolved, prev, ...metaObject, next, moveTo, onFilterUpdate, ...filterData, selected_resolution_type, incident, downloadAllResolvedIssues }
}
