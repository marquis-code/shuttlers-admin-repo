import { GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH } from '@/api_factory/axios.config'
import { TMetaObject, useTableFilter } from '@/composables/utils/table'

export const events_api = {
	$_get_events: (metaObject: TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/event/admin/events?metadata=true&page=${metaObject.page.value}&size=${metaObject.page_size.value}&related=itineraries${queryParams}`
		return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.get(url)
	},
	    $_create_event: (credentials: any) => {
        const url = '/event/create'
        return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.post(url, credentials)
    },
	$_get_events_by_id: (id:string) => {
		const url = `/event/admin/events/${id}`
		return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.get(url)
	}
}
