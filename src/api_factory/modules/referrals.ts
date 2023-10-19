import { GATEWAY_ENDPOINT_WITH_AUTH } from '@/api_factory/axios.config'
import { TMetaObject } from '@/composables/utils/table'

export const referrals_api = {
    $_get_referrals: (meta:TMetaObject) => {
        const url = `promo-codes?filter[owner_type]=customer&query=&ascending=1&byColumn=0&size=10?size=${meta.page_size.value}&page=${meta.page.value}`
        return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
    },
	$_get_referrals_by_id: (id:string) => {
		const url = `/promo-codes/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	}
}
