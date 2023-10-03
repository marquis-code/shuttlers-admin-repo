import { GATEWAY_ENDPOINT_WITH_AUTH } from '@/api_factory/axios.config'
import { TMetaObject, useTableFilter } from '@/composables/utils/table'

export const sos_api = {
	$_get_sos: (filterData: Record<string, Ref>, metaObject: TMetaObject) => {
		const queryParams = useTableFilter(filterData)
		const url = `/sos-requests?${queryParams}&limit=${metaObject.page_size.value}&page=${metaObject.page.value}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_sos_request: (id:string) => {
		const url = `/trips/${id}/sos-requests`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_sos_provider_request: (payload: Record<string, any>) => {
		const url = '/sos-provider-requests'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	}
}
