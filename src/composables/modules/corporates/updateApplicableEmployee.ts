// $_update__applicable_employee

import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'

export const useUpdateApplicableEmployee = () => {
	const loading = ref(false)

    const payload = {
        applicable_employee_value: ref([])
    }

	const updateApplicableEmployee = async (id: number) => {
        loading.value = true
        const res = (await corporates_api.$_update__applicable_employee(Number(id), convertObjWithRefToObj(payload)
        )) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({
                type: 'SUCCESS',
                msg: 'Update was successful'
            })
        }
        loading.value = false
    }

    const populateEmployeeList = (data:any) => {
        payload.applicable_employee_value.value = data.applicable_employee_value
    }

	return { populateEmployeeList, loading, updateApplicableEmployee }
}
