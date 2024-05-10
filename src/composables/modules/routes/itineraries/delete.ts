import { useItineraries } from './fetch'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { charges_api, routes_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'

const loading = ref(false)
const itineraryId = ref(null) as Ref<number|null>

const { getItineraries } = useItineraries()
export const useDeleteItinerary = () => {
	const initDeleteItinerary = (id:number) => {
		itineraryId.value = id
		useConfirmationModal().openAlert({ call_function: deleteItinerary, desc: 'Customers will no longer discover this route itinerary when searching on the app', title: 'Sure to delete route itinerary?', loading, type: 'DANGER' })
	}
	const deleteItinerary = async () => {
		loading.value = true
		const res = await routes_api.$_delete_itinerary(itineraryId.value!) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			useConfirmationModal().closeAlert()
			useAlert().openAlert({ type: 'SUCCESS', msg: 'Itinerary deleted successfully' })
			const id = useRoute().params.id as string
			useRouter().push(`/trips/routes/${id}/itineraries`)
			getItineraries()
        }
		loading.value = false
	}

	return { loading, initDeleteItinerary }
}
