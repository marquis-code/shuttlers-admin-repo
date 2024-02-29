import { drivers_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'
import { exportAsCsv, useDownloadReport } from '@/composables/utils/csv'
const { loading: downloading } = useDownloadReport()
const loading = ref(false)
const driverRating = ref([] as any[])
const filterData = {
    creation_date_start: ref(''),
    creation_date_end: ref('')
}

const exportDriverRatings = async () => {
    downloading.value = true
    const id = useRoute().params.id as string
    const name = ref('Driver Ratings')
    const res = await drivers_api.$_download_all_driver_ratings(id, filterData) as CustomAxiosResponse
    if (res && res?.type !== 'ERROR') {
        const data = res.data.data
        const newArr = data.map((el) => {
            return {
                Date_Created: el?.date_created || 'N/A',
                Passenger_Name: el?.passenger_name || 'N/A',
                Rating: el?.star || 'N/A',
                Comment: el?.comment ? el?.comment.map((itm) => itm) : 'N/A',
                Issues: el?.issues ? el?.issues?.map((itm) => itm) : 'N/A',
                Attachments: el?.attachment_urls ? el?.attachment_urls?.map((itm) => itm) : 'N/A',
                Trip_Time: el?.trip_time || 'N/A',
                Route: el?.route || 'N/A'
            }
        })
        if (filterData?.creation_date_start?.value && filterData?.creation_date_end?.value) name.value = `${name.value}-from-${filterData?.creation_date_start?.value}-to-${filterData?.creation_date_end?.value}`
        exportAsCsv(newArr, name.value)
    }
    downloading.value = false
}

export const useDriverRating = () => {
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()
    const { $_get_driver_ratings } = drivers_api

    const getDriverRating = async () => {
        const id = useRoute().params.id as string
        driverRating.value = []
        loading.value = true

        const res = await $_get_driver_ratings(id, metaObject, filterData) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            driverRating.value = res.data.data.length ? res.data.data : []
            metaObject.total.value = res.data.metadata.total_pages
        }
        loading.value = false
    }
    setFunction(getDriverRating)

    watch([filterData.creation_date_end], () => {
        getDriverRating()
    })

    const onFilterUpdate = (data: any) => {
        switch (data.type) {
            case 'dateRange':
                if (data.value.length === 2) {
                    filterData.creation_date_start.value = data.value[0]
                    filterData.creation_date_end.value = data.value[1]
                }
                break
        }
    }

    return { getDriverRating, loading, driverRating, filterData, onFilterUpdate, moveTo, ...metaObject, next, prev, exportDriverRatings, downloading }
}
