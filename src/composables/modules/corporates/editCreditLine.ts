import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useGetCreditSystem } from '@/composables/modules/corporates/creditLine'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
import { useAlert } from '@/composables/core/notification'
import { useConfirmationModal } from '@/composables/core/confirmation'
const { creditSystem } = useGetCreditSystem()
const creditSystemForm = {
    applicable_employee_kind: ref(''),
    is_automatic: ref(),
    amount: ref(),
    applicable_employee_value: ref([])
}
export const useEditCreditSystem = () => {
    const loading = ref(false)
    const creditSystem = ref({} as any)
    const { $_update_credit_system } = corporates_api
   onMounted(() => {
      creditSystemForm.amount.value = creditSystem.value.amount
      creditSystemForm.is_automatic.value = creditSystem.value.is_automatic
      creditSystemForm.applicable_employee_kind.value = creditSystem.value.applicable_employee_kind
      creditSystemForm.applicable_employee_value.value = creditSystem.value.applicable_employee
   })
    const editCorporatesCreditSystem = async (id: number) => {
        loading.value = true
        const res = await $_update_credit_system(Number(id), convertObjWithRefToObj(creditSystemForm)) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({
				type: 'SUCCESS',
				msg: 'Credit system has been updated successfully.'
			})
            useConfirmationModal().closeAlert()
        }
        loading.value = false
    }

    const populateCreditSystemForm = (data) => {
        creditSystemForm.amount.value = data.amount
        creditSystemForm.is_automatic.value = data.is_automatic
        creditSystemForm.applicable_employee_kind.value = data.applicable_employee_kind
        creditSystemForm.applicable_employee_value.value = data.applicable_employee_value
    }

    return { editCorporatesCreditSystem, creditSystemForm, loading, populateCreditSystemForm }
}
