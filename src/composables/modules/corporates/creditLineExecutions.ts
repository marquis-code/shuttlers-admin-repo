import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'
import { useAlert } from '@/composables/core/notification'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { useCompaniesModal } from '@/composables/core/modals'
import { useCorporateIdDetails } from '@/composables/modules/corporates/id'

const creditSystemScheduleForm = {
    scheduled: ref(),
    scheduled_for: ref(''),
    amount: ref(),
    narration: ref('')
}

export const useGetCreditLineExecutions = () => {
    const loadingExecutions = ref(false)
    const creditLineExecutions = ref([])

        const { metaObject, moveTo, next, prev, setFunction } = usePagination()

    const { $_get_credit_system_exectutions } = corporates_api

    const getCreditLineExecutions = async (creditLineId:number) => {
        loadingExecutions.value = true
        const res = await $_get_credit_system_exectutions(creditLineId, metaObject) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            creditLineExecutions.value = res.data.data
            metaObject.total.value = res.data.pagination?.pageCount
        }
        loadingExecutions.value = false
    }
    setFunction(getCreditLineExecutions)

    return { getCreditLineExecutions, loadingExecutions, creditLineExecutions, ...metaObject, next, prev, moveTo }
}

export const useApplyCreditSystem = () => {
    const loading = ref(false)

    const { $_apply_credit_system } = corporates_api

    const applyCreditSystem = async (creditLineId:number) => {
        loading.value = true
        const res = await $_apply_credit_system(creditLineId) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({
                type: 'SUCCESS',
                msg: 'Credit system has been applied successfully'
              })
              useConfirmationModal().closeAlert()
        }
        loading.value = false
    }

    return { applyCreditSystem, loading }
}

export const useScheduleCreditSystem = () => {
    const loading = ref(false)

    const { $_schedule_credit_system } = corporates_api

    const scheduleCreditSystem = async (creditLineId:number) => {
        loading.value = true
        const res = await $_schedule_credit_system(creditLineId, convertObjWithRefToObj(creditSystemScheduleForm)) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({
                type: 'SUCCESS',
                msg: 'Credit system has been scheduled successfully'
              })
              useCompaniesModal().closeScheduledCreditLine()
        }
        loading.value = false
    }

    const populateCreditSystemScheduleForm = (data:any) => {
        creditSystemScheduleForm.amount.value = data.amount
        creditSystemScheduleForm.narration.value = data.narration
        creditSystemScheduleForm.scheduled_for.value = data.scheduled_for
        creditSystemScheduleForm.scheduled.value = data.scheduled
    }

    return { populateCreditSystemScheduleForm, scheduleCreditSystem, loading }
}

export const useDeleteCreditSystemSchedule = () => {
    const loading = ref(false)

    const { $_cancel_credit_system } = corporates_api

    const deleteCreditSystemSchedule = async (executionId:number) => {
        loading.value = true
        const res = await $_cancel_credit_system(executionId) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({
                type: 'SUCCESS',
                msg: 'Credit system has been deleted successfully'
              })
        }
        loading.value = false
    }

    return { deleteCreditSystemSchedule, loading }
}
