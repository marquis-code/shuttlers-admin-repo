import { ref, Ref } from 'vue'
import { charges_api, CustomAxiosResponse } from '@/api_factory/modules'

const allCityNames = ref([]) as Ref<any[]>
const allCountries = ref([]) as Ref<any[]>

export const useCityAndCountry = () => {
	const fetchAllCityNames = async () => {
		const res = await charges_api.$_get_all_cities() as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            allCityNames.value = res.data?.data?.length ? res.data.data : []
        }
	}
	const fetchAllCountries = async () => {
		const res = await charges_api.$_get_all_countries() as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            allCountries.value = res.data?.length ? res.data : []
        }
	}

	return { allCityNames, allCountries, fetchAllCityNames, fetchAllCountries }
}
