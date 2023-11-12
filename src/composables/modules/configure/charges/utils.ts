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
		// try {
		// 	const res = await axios.get('/v1/city/all?limit=1000&fields=id,name')
		// 	allCityNames.value = res.data?.data?.length ? res.data.data : []
		// } catch (err) {
		// 	Swal.fire({ icon: 'error', title: 'Error', text: err?.response?.data?.message ?? 'could not get cities'})
		// }
	}
	const fetchAllCountries = async () => {
		const res = await charges_api.$_get_all_countries() as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            allCountries.value = res.data?.length ? res.data : []
        }
		// try {
		// 	const res = await axios.get('/v1/countries')
		// 	allCountries.value = res.data?.length ? res.data : []
		// } catch (err) {
		// 	Swal.fire({ icon: 'error', title: 'Error', text: err?.response?.data?.message ?? 'could not get countries'})
		// }
	}

	return { allCityNames, allCountries, fetchAllCityNames, fetchAllCountries }
}
