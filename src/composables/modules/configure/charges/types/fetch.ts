import { ref, Ref } from 'vue'
import { charges_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

const loading = ref(false)
const chargeTypes = ref([]) as Ref<any[]>
const search = ref('')
const allChargeTypes = ref([]) as Ref<any[]>

export const useFetchChargeTypes = () => {
	const { prev, metaObject, next, moveTo, setFunction } = usePagination()
	const { $_get_charge_types, $_get_all_charge_types_without_pagination } = charges_api

	const fetchChargeTypes = async () => {
		loading.value = true
		const res = await $_get_charge_types(metaObject, search.value) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            chargeTypes.value = res.data.data
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
		fetchChargeTypes()
	})

	setFunction(fetchChargeTypes)

	const fetchAllChargeTypesWithoutPagination = async () => {
		loading.value = true
		const res = await $_get_all_charge_types_without_pagination() as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			allChargeTypes.value = res.data.data.length ? res.data.data : []
        }
		loading.value = false
	}

	return { loading, chargeTypes, fetchChargeTypes, search, prev, next, moveTo, setFunction, ...metaObject, onFilterUpdate, fetchAllChargeTypesWithoutPagination, allChargeTypes }
}
