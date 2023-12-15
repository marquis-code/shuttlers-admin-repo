import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
import { useAlert } from '@/composables/core/notification'
import { useCorporateIdDetails } from '@/composables/modules/corporates/id'
import { useCompaniesModal } from '@/composables/core/modals'
const { selectedCorporate } = useCorporateIdDetails()

const actionType = ref('create')

const configurationForm = {
    id: ref('') as any,
    vehicle_type: ref(''),
    seats: ref('')
}

export const useCreateCapacityConfiguration = () => {
    const loading = ref(false)
    const { $_create_corporate_vehicle_capacity } = corporates_api
    const createCapacityConfiguration = async () => {
        loading.value = true
        let createConfigurationForm = {}
        if (actionType.value === 'create') {
            const { id, ...createConfigurationPayload } = configurationForm
            createConfigurationForm = createConfigurationPayload
            // const name = 'id'
            // delete configurationForm[name]
        }
        const payload = actionType.value === 'edit' ? configurationForm : createConfigurationForm
        const res = await $_create_corporate_vehicle_capacity(selectedCorporate.value.id, convertObjWithRefToObj(payload)) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({
				type: 'SUCCESS',
				msg: actionType.value === 'edit' ? 'Capacity was successfully Edited' : 'Capacity was successfully created'
			})
            useCompaniesModal().closeCorporateVehicleCapacityConfig()
        }
        loading.value = false
    }

    const populateConfigForm = (data) => {
        configurationForm.seats.value = data?.seats || ''
        configurationForm.vehicle_type.value = data?.vehicle_type || ''
        configurationForm.id.value = data?.id || ''
    }

    return { createCapacityConfiguration, loading, configurationForm, actionType, populateConfigForm }
}
