import { staffs_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { useConfirmationModal } from '@/composables/core/confirmation'
import {
  useCorporateStaff,
  useSelectedStaff
} from '@/composables/modules/corporates/staff/index'
import { useCorporateBranches } from '@/composables/modules/corporates/branch'
import { useCorporateWorkShifts } from '@/composables/modules/corporates/shift'
const { getCorporateStaff } = useCorporateStaff()
const { getBranches } = useCorporateBranches()
const { getShifts } = useCorporateWorkShifts()

const selectedRouteToDelete = ref(null) as Record<string, any>
export const useDeleteStaffToRoute = () => {
  const loading = ref(false)
  const removeStaffRoute = async (id) => {
    loading.value = true
    const res = (await staffs_api.$_delete_assigned_staff_route(id)) as CustomAxiosResponse
    if (res.type !== 'ERROR') {
      useAlert().openAlert({
        type: 'SUCCESS',
        msg: 'Staff route has been deleted successfully'
      })
      useConfirmationModal().closeAlert()
      getCorporateStaff()
      getBranches(useRoute().params.id as string)
      getShifts(useRoute().params.id as string)
    }
    loading.value = false
  }

  return {
    removeStaffRoute,
    loading,
    selectedRouteToDelete
  }
}
