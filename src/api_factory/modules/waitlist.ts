import { GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH } from '@/api_factory/axios.config'
import { TMetaObject, useTableFilter } from '@/composables/utils/table'

export const waitlist_api = {
	$_get_waitlist: (meta:TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
        const url = `/waitlist/getlist?${queryParams}&size=${meta.page_size.value}`
		return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.get(url)
	},
	$_get_waitlist_by_id: (meta:TMetaObject, id: string, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `waitlist/date/${id}?${queryParams}&page=${meta.page.value}&size=${meta.page_size.value}`
		return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.get(url)
	},
	$_get_waitlist_by_itinerary: (meta:TMetaObject, waitlistId: string, routeCode: string, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `waitlist/itenery/${routeCode}/${waitlistId}?${queryParams}&page=${meta.page.value}&size=${meta.page_size.value}`
		return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.get(url)
	},
	$_notify_waitlist_itinerary_user: (notificationId: any) => {
		const url = `/waitlist/notify/single/${notificationId}`
		return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.get(url)
	}
}
