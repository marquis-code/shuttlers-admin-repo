import { ref } from 'vue'
import { trip_issues_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

const issues = ref([]) as Ref<Record<string, any>[]>
const loading = ref(false)
const filterData = {
    incident: ref(''),
    startDate: ref(''),
	endDate: ref(''),
    search: ref('')
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

	watch([filterData.search, filterData.incident, filterData.endDate], (val) => {
		metaObject.page.value = 1
        fetchIssues()
    })

	setFunction(fetchIssues)

	return { loading, issues, fetchIssues, prev, ...metaObject, next, moveTo, onFilterUpdate, ...filterData }
}
