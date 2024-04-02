import { filterData, formattedCSVData } from './helpers'
import { CustomAxiosResponse } from '@/api_factory/modules'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { useTableFilter } from '@/composables/utils/table'
import { useDownloadReport } from '@/composables/utils/csv'
import { useAlert } from '@/composables/core/notification'
import {
  GATEWAY_ENDPOINT,
  GATEWAY_ENDPOINT_WITH_AUTH
} from '@/api_factory/axios.config'

const { download, loading: downloading } = useDownloadReport()

const proceedToDownload = async () => {
  useConfirmationModal().closeAlert()
  downloading.value = true
  const route = useRoute()
  const queryParams = useTableFilter(filterData)
  const routeType = (useRoute().name as string)?.split('-')[2]
  const baseURL = `/trips/${
    routeType === 'cancelled' ? 'upcoming' : routeType
  }?${queryParams}${queryParams ? '&' : ''}metadata=true&sort[created_at]=desc${
    routeType === 'cancelled' ? '&is_cancelled=true' : ''
  }`
  const res = (await GATEWAY_ENDPOINT_WITH_AUTH.get(
    `${baseURL}&limit=${10}&page=${1}`
  )) as CustomAxiosResponse
  if (res.type !== 'ERROR') {
    const total = res.data.metadata.total
    const fromParam = ref('') as any
    const toParam = ref('') as any
    watchEffect(() => {
      if (route?.query?.dateRange) {
        fromParam.value =
          (route?.query?.dateRange as string).split(',')[0] ?? ''
        toParam.value = (route?.query?.dateRange as string).split(',')[1] ?? ''
      }
    })
    const constructApiUrl = computed(() => {
      let url = `${baseURL}&limit=${total}&page=${1}`
      const params = new URLSearchParams()

      if (fromParam.value)
        params.append(
          'from',
          (route?.query?.dateRange as string).split(',')[0]
        )
      if (toParam.value)
        params.append('to', (route?.query?.dateRange as string).split(',')[1])

      const queryString = params.toString()
      if (queryString) url += `&${queryString}`

      return url
    })
    await GATEWAY_ENDPOINT.get(constructApiUrl.value)
      .then((result) => {
        const csvData = formattedCSVData(result.data.data)
        download(csvData, `${routeType} trip report`)
        useAlert().openAlert({
          type: 'SUCCESS',
          msg: `Total ${routeType} Trip report ${
            fromParam?.value ? `${fromParam?.value} to ${toParam?.value}` : ''
          }`
        })
      })
      .catch(() => {
        useAlert().openAlert({ type: 'ERROR', msg: 'No data to download' })
        return null
      })
      .finally(() => {
        downloading.value = false
      })
  }
}

export const downloadReport = async () => {}

export const useDownloadTrips = () => {
  const downloadTrips = () => {
    downloading.value = false
    const loading = ref(false)
    useConfirmationModal().openAlert({
      title: 'Please Note.',
      type: 'NORMAL',
      desc: 'Downloading report for one month may take a lot of time. It is advised that you download report for a maximum of 10 days.',
      loading,
      call_function: () => proceedToDownload(),
      proceedText: 'Proceed',
      cancelText: 'Cancel'
    })
  }

  return { downloadTrips }
}
