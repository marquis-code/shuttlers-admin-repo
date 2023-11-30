import { ref } from 'vue'
import { trip_issues_api, CustomAxiosResponse } from '@/api_factory/modules'
// import { usePagination } from '@/composables/utils/table'

const issues_types = ref([]) as Ref<Record<string, any>[]>
const loading = ref(false)

export const useFetchIssueTypes = () => {
	const fetchIssuesTypes = async () => {
		loading.value = true
		const res = await trip_issues_api.$_get_all_issues_types() as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            issues_types.value = res.data.data?.length ? res.data.data : []
        }
		loading.value = false
	}

	return { loading, issues_types, fetchIssuesTypes }
}
