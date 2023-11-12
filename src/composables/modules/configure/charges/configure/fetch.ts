import { ref } from 'vue'
import { charges_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

const loading = ref(false)
const configuredCharges = ref([])
const search = ref('')
const singleConfiguredCharge = ref(null) as Ref<any>

export const useFetchConfiguredCharges = () => {
	const { prev, metaObject, next, moveTo, setFunction } = usePagination()
	const { $_get_configurations, $_get_single_config } = charges_api

	const fetchConfiguredCharges = async () => {
		loading.value = true
		const res = await $_get_configurations(metaObject, search.value) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            configuredCharges.value = res.data.data
			metaObject.total.value = res.data.metadata.total_pages
        }
		loading.value = false
	}

	const onFilterUpdate = (data) => {
        switch (data.type) {
            case 'search':
				search.value = data.value
                break
        }
    }

	watch(search, () => {
		fetchConfiguredCharges()
	})

	setFunction(fetchConfiguredCharges)

	const fetchSingleConfiguredCharges = async (id:number|string) => {
		loading.value = true
		const res = await $_get_single_config(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			singleConfiguredCharge.value = res.data
        }
		loading.value = false
	}

	return { loading, configuredCharges, fetchConfiguredCharges, search, prev, next, moveTo, setFunction, ...metaObject, onFilterUpdate, fetchSingleConfiguredCharges, singleConfiguredCharge }
}
