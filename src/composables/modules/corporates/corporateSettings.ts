import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useCorporateIdDetails } from '@/composables/modules/corporates/id'
import { useAlert } from '@/composables/core/notification'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
const { selectedCorporate } = useCorporateIdDetails()
const configPayload = {
    staff_details_config: ref([])
}
export const useUserSetting = () => {
	const loading = ref(false)

	const setStaffDetailsConfig = async () => {
		loading.value = true
        const res = await corporates_api.$_create_company_settings(Number(selectedCorporate.value.id), convertObjWithRefToObj(configPayload)) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
 useAlert().openAlert({
            type: 'SUCCESS',
            msg: 'Staff details configuration set successfully'
          })
        }
	}

    const populateConfig = (data:any) => {
        configPayload.staff_details_config.value = data.staff_details_config
    }

	return { loading, setStaffDetailsConfig, populateConfig }
}
