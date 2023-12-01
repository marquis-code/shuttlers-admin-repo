import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
import { useCorporateIdDetails } from '@/composables/modules/corporates/id'
import { useCompaniesModal } from '@/composables/core/modals'
const { selectedCorporate } = useCorporateIdDetails()
const createWorkShiftForm = {
        startTime: ref(''),
        endTime: ref(''),
        description: ref('')
    }
    const isEditShift = ref(false)

    export const useCreateWorkShift = () => {
        const loading = ref(false)

        const createWorkShift = async () => {
            loading.value = true
            const res = (await corporates_api.$_create_work_shift(selectedCorporate.value.id,
                convertObjWithRefToObj(createWorkShiftForm)
            )) as CustomAxiosResponse
            if (res.type !== 'ERROR') {
                useCompaniesModal().closeAddWorkShift()
                useAlert().openAlert({
                    type: 'SUCCESS',
                    msg: 'New work shift created successfully'
                })
            }
            loading.value = false
        }

        const updateWorkShift = async (id:number) => {
            loading.value = true
            const res = (await corporates_api.$_update_work_shift(selectedCorporate.value.id, convertObjWithRefToObj(createWorkShiftForm), id)) as CustomAxiosResponse
            if (res.type !== 'ERROR') {
                useCompaniesModal().closeAddWorkShift()
                useAlert().openAlert({
                    type: 'SUCCESS',
                    msg: 'Work shift updated successfully'
                })
            }
            loading.value = false
        }

        const deleteWorkShift = async (id:number) => {
            loading.value = true
            const res = (await corporates_api.$_delete_work_shift(selectedCorporate.value.id, id)) as CustomAxiosResponse
            if (res.type !== 'ERROR') {
                useCompaniesModal().closeAddWorkShift()
                useAlert().openAlert({
                    type: 'SUCCESS',
                    msg: 'Work shift was deleted successfully'
                })
            }
            loading.value = false
        }

        const populateWorkShift = (data: any) => {
            createWorkShiftForm.startTime.value = data.startTime
            createWorkShiftForm.endTime.value = data.endTime
            createWorkShiftForm.description.value = data.description
        }

        return { createWorkShiftForm, loading, createWorkShift, populateWorkShift, deleteWorkShift, updateWorkShift, isEditShift }
    }

    export const useWorkShifts = () => {
        const loading = ref(false)
        const workShifts = ref([] as any)
        const fetchWorkShifts = async (id) => {
          loading.value = true
          const res = await corporates_api.$_get_work_shifts(id) as CustomAxiosResponse
          if (res.type !== 'ERROR') {
              workShifts.value = res.data.data
          }
          loading.value = false
        }
        return { fetchWorkShifts, loading, workShifts }
      }
