import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'

const shifts = ref([]) as Ref<any[]>
const loading = ref(false)

export const useCorporateWorkShifts = () => {
	const getShifts = async (id:string|number) => {
		loading.value = true
		const res = await corporates_api.$_get_corporate_shifts(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            shifts.value = res.data.data?.length ? res.data.data : []
        }
        loading.value = false
	}

	return { loading, shifts, getShifts }
}
