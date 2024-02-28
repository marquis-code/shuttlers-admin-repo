import { GATEWAY_ENDPOINT } from '@/api_factory/axios.config'
import { useAlert } from '@/composables/core/notification'
export function usePaginatedFetchAndDownload() {
  const isDownloading = ref(false)
  const mergedData = ref([]) as Record<string, any>
  const total_pages = ref() as any
  const error = ref(null) as Record<string, any>

  async function fetchDataPage(url, page) {
    const response = await GATEWAY_ENDPOINT.get(`${url}&page=${page}`)
    const pageData = response.data
    return pageData
  }

  async function fetchAllPagesAndDownload(url) {
    isDownloading.value = true
    error.value = null
    mergedData.value = []

    try {
      const firstPageData = await fetchDataPage(url, 1)
      const totalPages = firstPageData.metadata.total_pages
      total_pages.value = totalPages
      for (let page = 1; page <= totalPages; page++) {
        const pageData = await fetchDataPage(url, page)
        mergedData.value = [...mergedData.value, ...pageData.data]
      }
    } catch (e) {
      useAlert().openAlert({ type: 'ERROR', msg: 'Something went wrong while downloading report.' })
      error.value = e
    } finally {
      isDownloading.value = false
    }
  }

  return { fetchAllPagesAndDownload, isDownloading, error, mergedData, total_pages }
}
