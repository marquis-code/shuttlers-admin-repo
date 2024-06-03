import moment from 'moment'
import { configure_api, CustomAxiosResponse } from '@/api_factory/modules'
export const useGetTripRatingData = () => {
  const tripRatingData = ref([]) as any
  const loadingRatingSetting = ref(false)
  const loadingRatingData = ref(false)
  const getRatingData = async () => {
    loadingRatingSetting.value = true
    const res = (await configure_api.$_get_fleet_trip_rating_settings('trip_rating_service')) as CustomAxiosResponse
    const ratingReference = res?.data?.data?.reference
    const ratingsPayload = {
      settings_id: ratingReference,
      parameter: 'vehicle_id',
      start_date: '2022-01-01',
      end_date: `${moment(new Date()).format('YYYY-MM-DD')}`
    }
    loadingRatingSetting.value = false
    if (res.type !== 'ERROR') {
      loadingRatingData.value = true
      const res = (await configure_api.$_get_trip_rating_data(
        ratingsPayload
      )) as CustomAxiosResponse
      if (res.type !== 'ERROR') {
        tripRatingData.value = res?.data?.data
      }
      loadingRatingData.value = false
    }
  }
  return { tripRatingData, loadingRatingData, getRatingData }
}
