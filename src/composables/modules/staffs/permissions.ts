import { useAlert } from '@/composables/core/notification'
import { staffs_api, CustomAxiosResponse } from '@/api_factory/modules'
import { permissions_api } from '@/api_factory/modules/permissions'
import { useConfirmationModal } from '@/composables/core/confirmation'

const staffPermission = ref([] as any[])
const staffData = ref({} as Record<string, any>)
const currentLoader = ref([] as any[])
const addCurrentLoader = (id) => { currentLoader.value.push(id) }
const removeCurrentLoader = (id) => {
    const index = currentLoader.value.indexOf(id)
    if (index > -1) {
        currentLoader.value.splice(index, 1)
    }
}

export const useStaffPermission = () => {
    const loadingStaffPermission = ref(false)

    const getStaffPermission = async (id: string) => {
        const res = await permissions_api.$_get_staff_permissions(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            staffPermission.value = res.data.permissions
            staffData.value = res.data.staff
        }
        loadingStaffPermission.value = false
    }

    const selectedPermission = async ($event, permission) => {
        const found = staffPermission.value.find((perm) => perm.id === permission.id)
        const staff_permission_id = found?.staff_permission_id

        if ($event.target.checked) {
            addCurrentLoader(permission.id)
            const res = await permissions_api.$_update_staff_permission({ permission_id: permission.id, staff_id: staffData.value.id }) as CustomAxiosResponse

            if (res.type !== 'ERROR') {
                useAlert().openAlert({ type: 'SUCCESS', msg: 'Permission status was updated successfully' })
            }
            await getStaffPermission(staffData.value.id)
            removeCurrentLoader(permission.id)
        } else {
            if (!found) {
                useAlert().openAlert({ type: 'ERROR', msg: 'Invalid request' })
                return
            }

            addCurrentLoader(permission.id)
            const res = await permissions_api.$_delete_staff_permission(staff_permission_id) as CustomAxiosResponse

            if (res.type !== 'ERROR') {
                useAlert().openAlert({ type: 'SUCCESS', msg: 'Permission status was updated successfully' })
            }

            await getStaffPermission(staffData.value.id)
            removeCurrentLoader(permission.id)
        }
    }

    const deleteAllStaffPermission = () => {
            useConfirmationModal().openAlert({ title: 'Please Confirm', type: 'DANGER', desc: 'Are you sure you want to delete all permissions?', loading: loadingStaffPermission, call_function: () => handlePermissionsDelete() })
    }
    const handlePermissionsDelete = async () => {
        loadingStaffPermission.value = true
        const res = await permissions_api.$_delete_all_staff_permission(staffData.value.id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            await getStaffPermission(staffData.value.id)
            useConfirmationModal().closeAlert()
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Permissions have been successfully deleted' })
        }
        loadingStaffPermission.value = false
    }

    return { loadingStaffPermission, staffPermission, staffData, getStaffPermission, currentLoader, selectedPermission, deleteAllStaffPermission }
}

export const useGetUserAccessModule = () => {
    const accessModuleLoading = ref(false)
    const accessModules = ref([] as any[])

    const getUserAccessModule = async () => {
        accessModuleLoading.value = true
        const res = await permissions_api.$_get_access_module() as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            accessModules.value = res.data.data.sort((a, b) => {
                const nameA = a.name.toLowerCase()
                const nameB = b.name.toLowerCase()

                if (nameA < nameB) {
                    return -1
                }
                if (nameA > nameB) {
                    return 1
                }
                return 0
            })
        }
        accessModuleLoading.value = false
    }

    return { accessModuleLoading, accessModules, getUserAccessModule }
}
