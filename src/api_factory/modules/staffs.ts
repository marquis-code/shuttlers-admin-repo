import { GATEWAY_ENDPOINT_WITH_AUTH, AUDIT_GATEWAY_ENDPOINT_WITH_AUTH } from '@/api_factory/axios.config'
import { TMetaObject, useTableFilter } from '@/composables/utils/table'
import { useAlert } from '@/composables/core/notification'
import { CustomAxiosResponse } from '@/api_factory/modules'

export const staffs_api = {
	$_get_staffs: (metaObject: TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/staff?${queryParams}&page=${metaObject.page.value}&limit=${metaObject.page_size.value}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_all_staffs: () => {
		const url = `/staff?page=${1}&limit=${10000}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_permisions: (metaObject: TMetaObject) => {
		const url = `v1/super-admin/access-modules?page=${metaObject.page.value}&limit=${metaObject.page_size.value}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_staff_permisions: (id:string) => {
		const url = `/super-admin/staff-module-permissions/staff/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_create_admin: (payload) => {
		const url = '/staff'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_edit_admin: (payload, id) => {
		const url = `/staff/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	},
	$_change_password: (payload, id) => {
		const url = `/staff/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	},
	$_suspend_admin: (payload, id) => {
		const url = `/staff/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
	},
	$_get_audit_operation_type: () => {
		const url = 'audits/operation-type'
		return AUDIT_GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_audits: (metaObject: TMetaObject, filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
		const url = `/audits?${queryParams}&metadata=true&page=${metaObject.page.value}&perPage=${metaObject.page_size.value}`
		return AUDIT_GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_download_all_audits: async (filterData?: Record<string, Ref>) => {
		const queryParams = useTableFilter(filterData)
        // const url = `/partners?${queryParams}&metadata=true&limit=${10}&page=${1}&related=owner`
		const url = `/audits?${queryParams}&metadata=true&page=${1}&perPage=${10}`
		const res = await AUDIT_GATEWAY_ENDPOINT_WITH_AUTH.get(url) as CustomAxiosResponse
		if (res.type !== 'ERROR') {
			if (res.data?.result?.length) {
				const total = res.data.metadata.total
				return AUDIT_GATEWAY_ENDPOINT_WITH_AUTH.get(`/audits?${queryParams}&metadata=true&page=${1}&perPage=${total}`)
			} else {
				useAlert().openAlert({ type: 'ERROR', msg: 'No data to download' })
				return null
			}
        }
	},
	$_feature_flag_audits: (payload) => {
		const url = '/feature-flag'
		return AUDIT_GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_feature_flag_flagged_audits: () => {
		const url = '/feature-flag?name=get-all-audits'
		return AUDIT_GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_update_profile_picture: (id, payload) => {
		const url = `/staffs/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.put(url, payload)
	},
	$_get_staffs_for_selector_component: (search = '') => {
		const url = `/staffs?limit=${20}&page=${1}&search=${search}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	}
}
