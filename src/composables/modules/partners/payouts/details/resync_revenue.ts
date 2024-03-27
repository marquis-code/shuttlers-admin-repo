import moment from 'moment'
import { useEarningsRevenues } from './fetch'
import { CustomAxiosResponse, trips_api, partners_api } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { usePayoutModal } from '@/composables/core/modals'

const loading = ref(false)
const loading_vehicles = ref(false)
const vehicles = ref([]) as Ref<Record<string, any>[]>
const selectedVehiclesId = ref([]) as Ref<number[]>

const clearObj = () => {
    vehicles.value = []
    selectedVehiclesId.value = []
}

export const useResyncRevenues = () => {
    const getPartnerVehicles = async () => {
        loading_vehicles.value = true
        const partnerId = useRoute().params.id as string
        const res = await partners_api.$_get_all_partner_vehicle_by_id(partnerId) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			vehicles.value = res.data.data?.length ? res.data.data : []
        }
        loading_vehicles.value = false
    }

    const resyncRevenue = async () => {
        const payload = {
            endDate: moment().clone().endOf('month').format('YYYY-MM-DD'),
            partner_id: useRoute().params.id as string,
            startDate: moment().clone().startOf('month').format('YYYY-MM-DD'),
            vehicle_ids: selectedVehiclesId.value
        }
        loading.value = true
        const res = await trips_api.$_resync_revenue(payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
			if (res.data?.success) {
                useAlert().openAlert({ type: 'SUCCESS', msg: res.data?.message || 'Resync revenue successful' })
                usePayoutModal().closeResyncRevenue()
                useEarningsRevenues().fetchRevenues()
            } else {
                useAlert().openAlert({ type: 'ERROR', msg: res.data?.message || 'Unable to resync revenue' })
            }
        }
        loading.value = false
    }

    return { loading, loading_vehicles, vehicles, selectedVehiclesId, clearObj, getPartnerVehicles, resyncRevenue }
}
