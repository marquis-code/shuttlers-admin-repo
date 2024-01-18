import { useAlert } from '@/composables/core/notification'
import { configure_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAmenitiesList } from '@/composables/modules/configure'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
const amenitiesForm = {
    name: ref(''),
	short_name: ref(''),
	image: ref('') as any
}

const tripCategoryPayload = {
    settings_id: ref(''),
    name: ref('')
}

const tripOptionsPayload = {
    name: ref(''),
    settings_id: ref(''),
    category_id: ref('')
}
const isRequestSuccessful = ref(false)

export const useCreateAmentiites = () => {
const loading = ref(false)
const deletingAmenity = ref(false)
    const handleCreateAmenity = async () => {
        loading.value = true
        const payload = {
            image: amenitiesForm.image.value,
            name: amenitiesForm.name.value,
            short_name: amenitiesForm.short_name.value
        }
        const res = await configure_api.$_create_amenity(payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: 'New Amenity successfully created' })
            useAmenitiesList().getAmenitiesList()
            isRequestSuccessful.value = true
            amenitiesForm.image.value = ''
            amenitiesForm.name.value = ''
            amenitiesForm.short_name.value = ''
        }
        loading.value = false
    }

    const deleteAmenity = async (id) => {
      deletingAmenity.value = true
      const res = await configure_api.$_delete_amenity(id) as CustomAxiosResponse
      if (res.type !== 'ERROR') {
        useAlert().openAlert({ type: 'SUCCESS', msg: 'Amenity was successfully deleted' })
        useAmenitiesList().getAmenitiesList()
       useConfirmationModal().closeAlert()
    }
    deletingAmenity.value = false
    }
    return { amenitiesForm, isRequestSuccessful, loading, handleCreateAmenity, deletingAmenity, deleteAmenity }
}

export const useCreateTripRating = () => {
    const loadingTripRatingCategories = ref(false)
    const loadingTripRatingOptions = ref(false)
    const { $_create_trip_rating_catogory, $_create_trip_rating_options } = configure_api

    const createTripRatingCategory = async (serviceId: string) => {
        loadingTripRatingCategories.value = true

        const res = await $_create_trip_rating_catogory(serviceId, convertObjWithRefToObj(tripCategoryPayload)) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: 'New trip rating cateegory was successfully created' })
        }
        loadingTripRatingCategories.value = false
    }

    const createTripRatingOption = async (serviceId: string) => {
        loadingTripRatingOptions.value = true

        const res = await $_create_trip_rating_options(serviceId, convertObjWithRefToObj(tripOptionsPayload)) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: 'New trip rating option was successfully created' })
        }
        loadingTripRatingOptions.value = false
    }

    const prefillTripCategoryForm = (data: { settings_id: string, name: string}) => {
        tripCategoryPayload.settings_id.value = data.settings_id
        tripCategoryPayload.name.value = data.name
    }

    const prefillTripOptionsForm = (data: { settings_id: string, category_id: string, name: string }) => {
        tripOptionsPayload.settings_id.value = data.settings_id
        tripOptionsPayload.category_id.value = data.category_id
        tripOptionsPayload.name.value = data.name
    }

    return { prefillTripCategoryForm, prefillTripOptionsForm, createTripRatingOption, createTripRatingCategory, loadingTripRatingCategories, loadingTripRatingOptions }
}
