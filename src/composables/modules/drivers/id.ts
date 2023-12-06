import { drivers_api, CustomAxiosResponse } from '@/api_factory/modules'

const selectedDriver = ref({} as Record<string, any>)
const selectedDriverId = ref('')
const documents = computed(() => {
    return selectedDriver.value?.documents.length ? selectedDriver.value.documents : []
})

export const useDriverIdDetails = () => {
    const loading = ref(false)

    const getDriverById = async (id: string) => {
        selectedDriverId.value = id
        loading.value = true
        const res = await drivers_api.$_get_driver_by_id(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            selectedDriver.value = res.data
        }
        loading.value = false
    }
    return { selectedDriver, loading, getDriverById, documents }
}
