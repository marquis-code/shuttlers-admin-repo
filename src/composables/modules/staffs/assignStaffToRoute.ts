import { staffs_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { useCompaniesModal } from '@/composables/core/modals'
import {
  useCorporateStaff,
  useSelectedStaff
} from '@/composables/modules/corporates/staff/index'
import { useCorporateBranches } from '@/composables/modules/corporates/branch'
import { useCorporateWorkShifts } from '@/composables/modules/corporates/shift'

const assignForm = {
  itinerary_ids: [],
  user_id: ''
}

const selectedStaffToAssign = ref(null) as any
const selectedStaffPreferredRoutes = ref([]) as any
export const useAssignStaffToRoute = () => {
  const loading = ref(false)
  const assignStaff = async () => {
    const { getCorporateStaff } = useCorporateStaff()
    const { getBranches } = useCorporateBranches()
    const { getShifts } = useCorporateWorkShifts()
    loading.value = true
    const res = (await staffs_api.$_assign_staff_to_route(
      assignForm
    )) as CustomAxiosResponse
    if (res.type !== 'ERROR') {
      useCompaniesModal().closeAssignStaffToRoute()
      getCorporateStaff()
      getBranches(Number(useRoute().params.id))
      getShifts(Number(useRoute().params.id))
      useAlert().openAlert({
        type: 'SUCCESS',
        msg: 'Staff has been successfully assigned to route'
      })
    }
    loading.value = false
  }

  const populateAssignStaffToRouteForm = (data: any) => {
    assignForm.itinerary_ids = data.itinerary_ids
    assignForm.user_id = data.user_id
  }

  return {
    populateAssignStaffToRouteForm,
    assignStaff,
    assignForm,
    selectedStaffToAssign,
    selectedStaffPreferredRoutes,
    loading
  }
}
