import { ref, Ref } from 'vue'
import { trip_issues_api, CustomAxiosResponse } from '@/api_factory/modules'

const resolution_types = ref([]) as Ref<Record<string, any>[]>
const loading = ref(false)

export const useFetchResolutionTypes = () => {
	const fetchResolutionTypes = async () => {
		loading.value = true
		const res = await trip_issues_api.$_get_all_resolution_types() as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            resolution_types.value = res.data.data?.length ? res.data.data : []
        }
		loading.value = false
	}

	return { loading, resolution_types, fetchResolutionTypes }
}
