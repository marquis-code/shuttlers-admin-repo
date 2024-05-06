import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'
import { useAlert } from '@/composables/core/notification'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { useCompaniesModal } from '@/composables/core/modals'
import { useCorporateIdDetails } from '@/composables/modules/corporates/id'
const router = useRouter()
const route = useRoute()
const creditSystemScheduleForm = {
    scheduled: ref(),
    scheduled_for: ref(''),
    amount: ref(),
    narration: ref('')
}

const batchCreditSystemScheduleForm = {
    narration: ref(''),
    amount: ref(),
    increment_credit_wallet: ref(),
    is_topup: ref(),
    selected_employee: ref(null),
    scheduled: ref(),
    scheduled_for: ref(),
    only_selected_staff: ref(null)
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

    return { populateCreditSystemScheduleForm, scheduleCreditSystem, loading, creditSystemScheduleForm }
}

export const useBatchScheduleCreditSystem = () => {
    const loading = ref(false)

    const { $_schedule_credit_system } = corporates_api
    const scheduleBatchCreditSystem = async (creditLineId:number) => {
        loading.value = true
        const payload = convertObjWithRefToObj(batchCreditSystemScheduleForm)
        const formData = new FormData()
        for (const key in payload) {
            if (payload[key]) {
                formData.append(key, payload[key])
            }
        }
        let res:CustomAxiosResponse
        if (payload?.only_selected_staff?.length) {
            res = await $_schedule_credit_system(Number(creditLineId), payload) as CustomAxiosResponse
        } else {
            res = await corporates_api.$_schedule_credit_system_form_data(Number(creditLineId), formData) as CustomAxiosResponse
        }
        if (res.type !== 'ERROR') {
            useAlert().openAlert({
                type: 'SUCCESS',
                msg: 'Credit system has been scheduled successfully'
              })
             useRouter().push(`/companies/${route.params.id}/${route.params.status}/credit-line`)
        }
        loading.value = false
    }

    const populateBatchCreditSystemScheduleForm = (data:any) => {
        batchCreditSystemScheduleForm.narration.value = data.narration
        batchCreditSystemScheduleForm.amount.value = data.amount
        batchCreditSystemScheduleForm.increment_credit_wallet.value = data.increment_credit_wallet
        batchCreditSystemScheduleForm.is_topup.value = data.is_topup
        batchCreditSystemScheduleForm.selected_employee.value = data.selected_employee
        batchCreditSystemScheduleForm.scheduled.value = data.scheduled
        batchCreditSystemScheduleForm.scheduled_for.value = data.scheduled_for
        batchCreditSystemScheduleForm.only_selected_staff.value = data.only_selected_staff
    }

    return { batchCreditSystemScheduleForm, populateBatchCreditSystemScheduleForm, loading, scheduleBatchCreditSystem }
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
              useConfirmationModal().closeAlert()
        }
        loading.value = false
    }

    return { deleteCreditSystemSchedule, loading }
}

export const ussCreditSystemForSelectedUsers = () => {
    const loading = ref(false)

    const { $_handle_selected_users_credit_line } = corporates_api

    const handleCreditSystemForSelectedUsers = async (executionId:number, payload) => {
        loading.value = true
        const res = await $_handle_selected_users_credit_line(executionId, payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({
                type: 'SUCCESS',
                msg: 'Credit system for selected users was set successfully'
              })
        }
        loading.value = false
    }

    return { handleCreditSystemForSelectedUsers, loading }
}
