import { useAlert } from '@/composables/core/notification'
import { configure_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAmenitiesList } from '@/composables/modules/configure'
import { useConfirmationModal } from '@/composables/core/confirmation'
const amenitiesForm = {
    name: '',
	short_name: '',
	image: '' as any
}

export const useCreateAmentiites = () => {
const loading = ref(false)
const deletingAmenity = ref(false)
    const handleCreateAmenity = async () => {
        loading.value = true
        const payload = {
            image: amenitiesForm.image,
            name: amenitiesForm.name,
            short_name: amenitiesForm.short_name
        }
        const res = await configure_api.$_create_amenity(payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: 'New Amenity successfully created' })
            useAmenitiesList().getAmenitiesList()
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
    return { amenitiesForm, loading, handleCreateAmenity, deletingAmenity, deleteAmenity }
}
