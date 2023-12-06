import { GATEWAY_ENDPOINT_WITH_AUTH } from '@/api_factory/axios.config'
import { TMetaObject, useTableFilter } from '@/composables/utils/table'
import { CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'

export const charges_api = {
	$_get_configurations: (metaObject: TMetaObject, search?: string) => {
		const url = `/additional-charges?limit=${metaObject.page_size.value}&page=${metaObject.page.value}&search=${search}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_single_config: (id:number|string) => {
		const url = `/additional-charges/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_activate_config: (id:number, payload: any) => {
		const url = `/additional-charges/${id}/routes`
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_create_config: (payload:any) => {
		const url = '/additional-charges'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_edit_config: (id:number, payload:any) => {
		const url = `/additional-charges/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	},
	$_delete_config: (id:number) => {
		const url = `/additional-charges/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.delete(url)
	},
	$_get_charge_history: (id:number|string, metaObject: TMetaObject, date:string[], status:string, cityId:string[]) => {
		const url = `/additional-charges-history?id=${id}&limit=${metaObject.page_size.value}&page=${metaObject.page.value}${date[0] && date[1] ? `&start_date=${date[0]}&end_date=${date[1]}` : ''}&status=${status}${cityId.length ? `&city_ids=${cityId.join(',')}` : ''}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_download_charge_history: async (id:number|string, date:string[], status:string) => {
		const url = `/additional-charges-history?id=${id}&limit=5&page=1${date[0] && date[1] ? `&start_date=${date[0]}&end_date=${date[1]}` : ''}&status=${status}`
		const res = await GATEWAY_ENDPOINT_WITH_AUTH.get(url) as CustomAxiosResponse
		if (res.type !== 'ERROR') {
			if (res.data?.data?.length) {
				const total = res.data.metadata.total
				return GATEWAY_ENDPOINT_WITH_AUTH.get(`/additional-charges-history?id=${id}&limit=${total}&page=1${date[0] && date[1] ? `&start_date=${date[0]}&end_date=${date[1]}` : ''}&status=${status}`)
			} else {
				useAlert().openAlert({ type: 'ERROR', msg: 'No data to download' })
				return null
			}
        }
	},
	$_get_total_charges: (id:number|string, date:string[], status:string) => {
		const url = `/additional-charges-history-total/fare/${id}?status=${status}${date[0] && date[1] ? `&start_date=${date[0]}&end_date=${date[1]}` : ''}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_remit_charge: (id:number|string, payload:any) => {
		const url = `/additional-charges-history/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	},

	// for chage types
	$_create_charge_types: (payload:any) => {
		const url = '/additional-charges-types'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_edit_charge_types: (id:number, payload:any) => {
		const url = `/additional-charges-types/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	},
	$_delete_charge_types: (id:number) => {
		const url = `/additional-charges-types/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.delete(url)
	},
	$_get_charge_types: (metaObject: TMetaObject, search:string) => {
		const url = `/additional-charges-types?limit=${metaObject.page_size.value}&page=${metaObject.page.value}&search=${search}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_all_charge_types_without_pagination: async (configured_types = true) => {
		const url = '/additional-charges-types?limit=10&page=1'
		const res = await GATEWAY_ENDPOINT_WITH_AUTH.get(url) as CustomAxiosResponse
		if (res.type !== 'ERROR') {
			const total = res.data.metadata.total
			return GATEWAY_ENDPOINT_WITH_AUTH.get(`/additional-charges-types?limit=${total}&page=1`)
        }
	},
	$_get_all_cities: () => {
		const url = '/city/all?limit=1000&fields=id,name'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_all_countries: () => {
		const url = '/countries'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	}
}
