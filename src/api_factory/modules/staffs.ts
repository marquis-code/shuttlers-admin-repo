import { GATEWAY_ENDPOINT_WITH_AUTH } from '@/api_factory/axios.config'
import { TMetaObject } from '@/composables/utils/table'

export const staffs_api = {
	$_get_staffs: () => {
		const url = '/staff'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_staff_details_by_id: (id:string) => {
		const url = `/staff/${id}`
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
	}

}
