import { ref } from 'vue'
import moment from 'moment'
import { trip_issues_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'
import { exportAsCsv, useDownloadReport } from '@/composables/utils/csv'

const { loading: downloading } = useDownloadReport()
const issues = ref([]) as Ref<Record<string, any>[]>
const loading = ref(false)
const routeDay = ref('')
const filterData = {
	'filter[route_day_id]': computed(() => routeDay.value),
    search: ref('')
}

export const useUpcomingTripIssues = () => {
	const { prev, metaObject, next, moveTo, setFunction } = usePagination()

	const fetchParticularTripIssue = async () => {
		// const routeday_id = useRoute().params.id as string
		routeDay.value = useRoute().params.id as string
		loading.value = true
		const res = await trip_issues_api.$_get_all_issues(metaObject, filterData) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            issues.value = res.data.data?.length ? res.data.data : []
			metaObject.total.value = res.data.metadata.total_pages
        }
		loading.value = false
	}

	const downloadParticularTripIssues = async () => {
		routeDay.value = useRoute().params.id as string
		downloading.value = true
		const name = ref(`all-${routeDay.value}-upcoming-trip-issues`)
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
			exportAsCsv(newArr, name.value)
        }
		downloading.value = false
	}

	const onFilterUpdate = (data) => {
        switch (data.type) {
            case 'search':
				filterData.search.value = data.value
                break
        }
    }

	watch([filterData.search], (val) => {
		metaObject.page.value = 1
        fetchParticularTripIssue()
    })

	setFunction(fetchParticularTripIssue)

	return { loading, issues, fetchParticularTripIssue, prev, ...metaObject, next, moveTo, onFilterUpdate, ...filterData, downloadParticularTripIssues }
}
