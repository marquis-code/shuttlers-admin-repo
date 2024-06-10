import { GATEWAY_ENDPOINT_WITH_AUTH } from '@/api_factory/axios.config'
import { TMetaObject } from '@/composables/utils/table'

export const promotions_api = {
    $_get_promotions: (meta:TMetaObject) => {
        const url = `promo-codes?filter[owner_type]=admin&query=&ascending=1&byColumn=0?limit=${meta.page_size.value}&page=${meta.page.value}`
        return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
    },
	$_get_promotions_by_id: (id:string) => {
		const url = `/promo-codes/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_delete_promotions_by_id: (id:string) => {
		const url = `/promo-codes/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.delete(url)
	}
}
