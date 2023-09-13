import { GATEWAY_ENDPOINT_WITH_AUTH } from '@/api_factory/axios.config'
import { TMetaObject, useTableFilter } from '@/composables/utils/table'

export const partners_api = {

	$_get_all_partners: (meta:TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
        const url = `/partners?${queryParams}&metadata=true&limit=${meta.page_size.value}&page=${meta.page.value}&related=owner`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_new_partners: (meta:TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
        const url = `/partners?${queryParams}&metadata=true&limit=${meta.page_size.value}&page=${meta.page.value}&new_signup=1&related=owner`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
    $_get_interested_partners: (meta:TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
        const url = `/partner-interests?${queryParams}&sort[created_at]=desc&metadata=true&limit=${meta.page_size.value}&page=${meta.page.value}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_partner_by_id: (id:string) => {
		const url = `/partners/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	}
}
