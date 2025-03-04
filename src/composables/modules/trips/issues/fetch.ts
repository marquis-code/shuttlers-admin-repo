import { ref } from 'vue'
import moment from 'moment'
import { trip_issues_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'
import { exportAsCsv, useDownloadReport } from '@/composables/utils/csv'

const { loading: downloading } = useDownloadReport()
const issues = ref([]) as Ref<Record<string, any>[]>
const loading = ref(false)
const incident = ref('')
const filterData = {
    // startDate: ref(''),
	// endDate: ref(''),
	checkup_start: ref(''),
	checkup_end: ref(''),
    search: ref(''),
	'filter[incident_type]': computed(() => incident.value)
}

export const useFetchIssues = () => {
	const { prev, metaObject, next, moveTo, setFunction } = usePagination()

	const fetchIssues = async () => {
		loading.value = true
		const res = await trip_issues_api.$_get_all_issues(metaObject, filterData) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            issues.value = res.data.data?.length ? res.data.data : []
			metaObject.total.value = res.data.metadata.total_pages
        }
		loading.value = false
	}

	const downloadAllIssues = async () => {
		downloading.value = true
		const name = ref(`all-${incident.value ? `-${incident.value}-` : ''}issues`)
		const res = await trip_issues_api.$_download_all_issues(filterData) as CustomAxiosResponse
        if (res && res?.type !== 'ERROR') {
			const data = res.data.data
            const newArr = data.map((el) => {
                return {
                    Route_code: el?.routeday?.route?.route_code || 'N/A',
					Pilot: `${el?.driver?.fname || ''} ${el?.driver?.lname || ''} (${el?.driver?.phone || 'No Phone number'})`,
					Start_date_and_time: el?.routeday?.trip_date ? `${moment(el.routeday?.trip_date).format('LL')} (${el?.routeday?.itinerary?.trip_time})` : 'N/A',
					Incident: el?.incident_type || 'N/A',
					Checkup_date_and_time: el?.checkup_date_time ? `${moment(el.checkup_date_time).format('LL')} (${moment.utc(el?.checkup_date_time).format('LT')})` : 'N/A',
                    Logged_by: `${el?.staff?.fname || ''} ${el?.staff?.lname || ''}`
                }
            })
			if (filterData.checkup_start.value && filterData.checkup_end.value) name.value = `${name.value}-from-${filterData.checkup_start.value}-to-${filterData.checkup_end.value}`
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
				filterData.checkup_start.value = data.value[0] ? data.value[0] : ''
				filterData.checkup_end.value = data.value[1] ? data.value[1] : ''
				break
        }
    }

	watch([filterData.search, incident, filterData.checkup_end], (val) => {
		metaObject.page.value = 1
        fetchIssues()
    })

	setFunction(fetchIssues)

	return { loading, issues, fetchIssues, prev, ...metaObject, next, moveTo, onFilterUpdate, ...filterData, incident, downloadAllIssues }
}
