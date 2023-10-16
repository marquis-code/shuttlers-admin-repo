import { amenities_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

const loadingAmenities = ref(false)
const amenitiesList = ref([] as Record<string, any>[])
const loadingInspectionSites = ref(false)
const inspectionSiteList = ref([] as Record<string, any>[])
const loadingVehicleTypes = ref(false)
const vehicleTypesList = ref([] as Record<string, any>[])

export const useAmenitiesList = () => {
    const { prev, metaObject, next, moveTo, setFunction } = usePagination()
    const { $_get_amenities } = amenities_api

    const getAmenitiesList = async () => {
        loadingAmenities.value = true

        const res = await $_get_amenities(metaObject) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            amenitiesList.value = res.data.data
            metaObject.total.value = res.data.metadata?.total_pages
        }
        loadingAmenities.value = false
    }
    setFunction(getAmenitiesList)

    return { getAmenitiesList, loadingAmenities, amenitiesList, prev, ...metaObject, next, moveTo }
}

export const useInspectionSitesList = () => {
    const { prev, metaObject, next, moveTo, setFunction } = usePagination()
    const { $_get_inspection_sites } = amenities_api

    const getInspectionSiteList = async () => {
        loadingInspectionSites.value = true

        const res = await $_get_inspection_sites(metaObject) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            inspectionSiteList.value = res.data.data
            metaObject.total.value = res.data.metadata?.total_pages
        }
        loadingInspectionSites.value = false
    }
    setFunction(getInspectionSiteList)

    return { getInspectionSiteList, loadingInspectionSites, inspectionSiteList, prev, ...metaObject, next, moveTo }
}

export const useVehicleTypesList = () => {
    const { prev, metaObject, next, moveTo, setFunction } = usePagination()
    const { $_get_vehicle_types } = amenities_api

    const getVehicleTypesList = async () => {
        loadingVehicleTypes.value = true

        const res = await $_get_vehicle_types(metaObject) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            vehicleTypesList.value = res.data.data
            metaObject.total.value = res.data.metadata?.total_pages
        }
        loadingVehicleTypes.value = false
    }
    setFunction(getVehicleTypesList)

    return { getVehicleTypesList, loadingVehicleTypes, vehicleTypesList, prev, ...metaObject, next, moveTo }
}
