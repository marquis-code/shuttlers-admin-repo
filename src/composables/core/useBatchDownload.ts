import { GATEWAY_ENDPOINT_WITH_AUTH } from '@/api_factory/axios.config'
import { useDownloadReport } from '@/composables/utils/csv'
const { download, loading } = useDownloadReport()
export const useBatchDownload = () => {
    const compiledDataList = ref([]) as any
    const modifiedArray = ref([]) as any
 const fetchCompletedTripsDataInChunks = async () => {
    const page = 1
    const limit = 10
    const url = `/trips/completed?limit=${limit}&page=${page}&metadata=true&sort[created_at]=desc`
    const paginatedResponse = await GATEWAY_ENDPOINT_WITH_AUTH.get(url)
    const data = paginatedResponse.data.data
    const pages = paginatedResponse.data.metadata.total_pages
   if (pages < 2) {
    compiledDataList.value.push(data)
   }
    // callback(data)

    if (pages > 2) {
        for (let page = 2; page <= pages; page++) {
            loading.value = true
            const url = `/trips/completed?limit=${limit}&page=${page}&metadata=true&sort[created_at]=desc`
            const chunkData = await GATEWAY_ENDPOINT_WITH_AUTH.get(url)
            // compiledDataList.value = [...compiledDataList.value, chunkData.data.data]
            compiledDataList.value.push(chunkData.data.data)
            const flattenedArray = compiledDataList.value.flat()
            modifiedArray.value = flattenedArray
            // compiledDataList.value.push(chunkData)
            // callback(chunkData)
        }
        loading.value = false
        download(modifiedArray.value, 'Completed Trip List')
    }
 }
 return { fetchCompletedTripsDataInChunks, compiledDataList }
}
