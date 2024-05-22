import { GATEWAY_ENDPOINT_WITH_AUTH, AUDIT_GATEWAY_ENDPOINT_WITH_AUTH } from '@/api_factory/axios.config'

export const permissions_api = {
    $_delete_all_staff_permission: (id) => {
        const url = `/super-admin/staff-module-permissions/staff/${id}`
        return GATEWAY_ENDPOINT_WITH_AUTH.delete(url)
    },
    $_delete_staff_permission: (id) => {
        const url = `/super-admin/staff-module-permissions/${id}`
        return GATEWAY_ENDPOINT_WITH_AUTH.delete(url)
    },
    $_update_staff_permission: (payload) => {
        const url = '/super-admin/staff-module-permissions'
        return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
    },
    $_get_staff_permissions: (id:string) => {
        const url = `/super-admin/staff-module-permissions/staff/${id}`
        return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
    },
    $_get_access_module: () => {
        const url = '/super-admin/access-modules?limit=100&page=1'
        return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
    }

}
