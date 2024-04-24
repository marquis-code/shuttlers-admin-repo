import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useGetCreditLineExecutions } from '@/composables/modules/corporates/creditLineExecutions'
import { useAlert } from '@/composables/core/notification'
const { getCreditLineExecutions, loadingExecutions, creditLineExecutions, next, prev, moveTo, ...metaObject } = useGetCreditLineExecutions()

const loading = ref(false)
const creditSystem = ref({} as any)
const needCreditSystem = ref(false)
export const useGetCreditSystem = () => {
    const corporate_id = useRoute().params.id as string
    const { $_get_credit_system } = corporates_api
    const getCorporatesCreditSystem = async () => {
        loading.value = true
        const res = await $_get_credit_system(corporate_id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            creditSystem.value = res.data
            getCreditLineExecutions(res.data.id)
        } else {
            needCreditSystem.value = true
        }
        loading.value = false
    }

    return { getCorporatesCreditSystem, loading, needCreditSystem, creditSystem, loadingExecutions, creditLineExecutions, ...metaObject, next, prev, moveTo }
}

const processing = ref(false)
const creditLineObj = {
    users: ref([] as Record<string, any>[]),
    applicable_to: ref('all'),
    amount: ref(0),
    apply_immediately: ref(true)
}

const clearCreditLineObj = () => {
    creditLineObj.users.value = []
    creditLineObj.applicable_to.value = 'all'
    creditLineObj.amount.value = 0
    creditLineObj.apply_immediately.value = true
}
export const useCreateCreditLine = () => {
    const createCreditLine = async () => {
        const payload:Record<string, any> = {
            apply_immediately: creditLineObj.apply_immediately.value,
            applicable_employee_kind: creditLineObj.applicable_to.value,
            is_automatic: 0,
            amount: creditLineObj.amount.value
        }
        if (creditLineObj.applicable_to.value !== 'all') {
            payload.applicable_employee_value = creditLineObj.users.value.map((el) => el?.id)
        }
        processing.value = true
        const corporate_id = useRoute().params.id as string
        const res = await corporates_api.$_create_credit_line(corporate_id, payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Credit line created successfully' })
            const status = useRoute().params.status as string
            useRouter().push(`/companies/${corporate_id}/${status}/credit-line`)
        }
        processing.value = false
    }

    return { processing, ...creditLineObj, clearCreditLineObj, createCreditLine }
}
