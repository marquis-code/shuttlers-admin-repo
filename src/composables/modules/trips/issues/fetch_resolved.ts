import { ref } from 'vue'
import { trip_issues_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

const resolved_issues = ref([]) as Ref<Record<string, any>[]>
const loading = ref(false)
const selected_resolution_type = ref([])
const filterData = {
    incident: ref(''),
	resolution_type: computed(() => selected_resolution_type.value.map((el) => el.value)),
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

	watch([filterData.search, filterData.incident, filterData.endDate, filterData.resolution_type], () => {
        fetchResolved()
    })

	setFunction(fetchResolved)

	return { loading, resolved_issues, fetchResolved, prev, ...metaObject, next, moveTo, onFilterUpdate, ...filterData, selected_resolution_type }
}
