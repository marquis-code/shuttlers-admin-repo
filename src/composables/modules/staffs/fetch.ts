import { staffs_api, CustomAxiosResponse } from '@/api_factory/modules'

const { $_get_staffs } = staffs_api

export const useGetStaffs = () => {
    const loading = ref(false)
    const staffsData = ref([])

    const getStaffs = async () => {
        loading.value = true
        const res = await $_get_staffs() as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            staffsData.value = res.data
            console.log(staffsData.value)
        }
        loading.value = false
    }

    return { getStaffs, loading, staffsData }
}
