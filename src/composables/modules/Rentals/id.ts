import { rental_api, CustomAxiosResponse } from '@/api_factory/modules'

const rentalDetails = ref({} as Record<string, any>)
const loadingRental = ref(false)

export const useGetRentalById = () => {
    const getRentalById = async (id) => {
        loadingRental.value = true
        const res = await rental_api.$_get_rental_by_id(id) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            rentalDetails.value = res.data
        }
        loadingRental.value = false
    }

    return { getRentalById, loadingRental, rentalDetails }
}
