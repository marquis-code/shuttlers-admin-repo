import { useAlert } from '@/composables/core/notification'
import { inspection_api, CustomAxiosResponse } from '@/api_factory/modules'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
import { useVehicleConfigurationModal } from '@/composables/core/modals'
const inspectionSiteForm = {
  name: ref(''),
  geo_coordinate: ref(''),
  address: ref('')
}

const selectedActionType = ref('')
const selectedVehicleCategory = ref({}) as any
const selectedInspectionData = ref({})
const vehicleCategoryResult = ref({})

const configureVehicleTypeForm = {
  name: ref(''),
  description: ref(''),
  break_even_utilization: ref(''),
  pricing_margin_unit: ref('percent'),
  pricing_margin: ref(10),
  image: ref('')
}

const configureVehicleCategoryForm = {
  name: '',
  description: '',
  cost_of_supply: '',
  break_even_utilization: '',
  pricing_margin: '',
  pricing_margin_unit: ''
}

const configureCostOfSupplyForm = ref([]) as any

export const useCreateVehicle = () => {
  const loading = ref(false)
  const {
    $_create_inspection_sites,
    $_create_vehicle_types,
    $_create_vehicle_cost_of_supply,
    $_delete_vehicle_types,
    $_delete_inspection_site,
    $_update_vehicle_types,
    $_update_inspection_sites
  } = inspection_api

  const createInspectionSite = async () => {
    loading.value = true

    const res = (await $_create_inspection_sites(
      convertObjWithRefToObj(inspectionSiteForm)
    )) as CustomAxiosResponse

    if (res.type !== 'ERROR') {
      useAlert().openAlert({
        type: 'SUCCESS',
        msg: 'New inspection site was successfully created'
      })
      useVehicleConfigurationModal().closeConfigureInspectionSite()
    }
    loading.value = false
  }

  const createVehicleCategory = async () => {
    loading.value = true

    const res = (await $_create_vehicle_types(
      convertObjWithRefToObj(configureVehicleTypeForm)
    )) as CustomAxiosResponse
    vehicleCategoryResult.value = res.data

    if (res.type !== 'ERROR') {
      await createVehicleCostOfSupply()
      useVehicleConfigurationModal().closeConfigureVehicleCategory()
              useAlert().openAlert({
            type: 'SUCCESS',
            msg: 'Vehicle Category was created successfully'
          })
    }
    loading.value = false
  }

  const createVehicleCostOfSupply = async () => {
    loading.value = true
    if (configureCostOfSupplyForm.value.length) {
      configureCostOfSupplyForm.value.forEach(async (itm) => {
        const payload = {
          id: itm.id,
          vehicle_type_id: vehicleCategoryResult?.value?.id,
          city_id: itm.city_id,
          cost_of_supply: itm.cost_of_supply,
          currency: itm.currency
        }
        const res = (await $_create_vehicle_cost_of_supply(
          payload
        )) as CustomAxiosResponse
        if (res.type !== 'ERROR') { /* empty */ }
        loading.value = false
      })
    }
  }

  const editVehicleCategory = async (id:any) => {
    loading.value = true
    const res = (await $_update_vehicle_types(
      convertObjWithRefToObj(configureVehicleTypeForm),
      id
    )) as CustomAxiosResponse

    if (res.type !== 'ERROR') {
      useAlert().openAlert({ type: 'SUCCESS', msg: 'Vehicle category was updated successfully.' })
      useVehicleConfigurationModal().closeConfigureVehicleCategory()
    }
    loading.value = false
  }

  const editInspectionSite = async (id) => {
    loading.value = true

    const res = (await $_update_inspection_sites(
      id,
      convertObjWithRefToObj(inspectionSiteForm)
    )) as CustomAxiosResponse

    if (res.type !== 'ERROR') {
      useAlert().openAlert({
        type: 'SUCCESS',
        msg: 'Inspection site was successfully updated'
      })
      useVehicleConfigurationModal().closeConfigureInspectionSite()
    }
    loading.value = false
  }

  const preInspectionSiteForm = (data: {
    name: string;
    geo_coordinate: string;
    address: string;
  }) => {
    inspectionSiteForm.name.value = data.name
    inspectionSiteForm.geo_coordinate.value = data.geo_coordinate
    inspectionSiteForm.address.value = data.address
  }

  const preConfigureVehicleCategoryForm = (data: any) => {
    configureVehicleTypeForm.name.value = data.name
    configureVehicleTypeForm.description.value = data.description
    configureVehicleTypeForm.break_even_utilization.value =
      data.break_even_utilization
    configureVehicleTypeForm.pricing_margin_unit.value =
      data.pricing_margin_unit
    configureVehicleTypeForm.pricing_margin.value = data.pricing_margin
    configureVehicleTypeForm.image.value = data.image
  }

  const preConfigureVehicleCostOfSuplyForm = (data: any) => {
    configureCostOfSupplyForm.value = data
  }

  const deleteVehicleTypes = async (id: number) => {
    loading.value = true

    const res = (await $_delete_vehicle_types(id)) as CustomAxiosResponse

    if (res.type !== 'ERROR') {
      useAlert().openAlert({
        type: 'SUCCESS',
        msg: 'Vehicle Type has been deleted successfully!'
      })
      useVehicleConfigurationModal().closeDeleteVehicleCategory()
    }
    loading.value = false
  }

  const deleteInspectionSite = async (id: number) => {
    loading.value = true

    const res = (await $_delete_inspection_site(id)) as CustomAxiosResponse

    if (res.type !== 'ERROR') {
      useAlert().openAlert({
        type: 'SUCCESS',
        msg: 'Inspection site has been deleted successfully!'
      })
      useVehicleConfigurationModal().closeDeleteVehicleCategory()
    }
    loading.value = false
  }

  return {
    preInspectionSiteForm,
    preConfigureVehicleCategoryForm,
    createVehicleCategory,
    createInspectionSite,
    configureVehicleTypeForm,
    configureCostOfSupplyForm,
    loading,
    deleteVehicleTypes,
    selectedVehicleCategory,
    selectedInspectionData,
    selectedActionType,
    inspectionSiteForm,
    deleteInspectionSite,
    editVehicleCategory,
    editInspectionSite,
    preConfigureVehicleCostOfSuplyForm,
    createVehicleCostOfSupply
  }
}
