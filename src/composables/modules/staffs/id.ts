import { staffs_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

const { metaObject, moveTo, next, prev, setFunction } = usePagination()
const selectedAdmin = ref({} as Record<string, any>)
const selectedAdminId = ref('')
const loading = ref(false)
const staffsData = ref([] as any[])

export const useAdminIdDetails = () => {
    const getAdminById = async (id: string) => {
        selectedAdminId.value = id
        loading.value = true
        metaObject.page_size.value = 10000
        const res = await staffs_api.$_get_staffs(metaObject) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            staffsData.value = res.data.data
            selectedAdmin.value = staffsData.value.find((staff) => staff.id === Number(id))
        }
        loading.value = false
        return res.data
    }
    return { selectedAdmin, loading, getAdminById }
}
