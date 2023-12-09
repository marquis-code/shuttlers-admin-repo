import { useConfirmationModal } from '@/composables/core/confirmation'
import { useGetFleets } from '@/composables/modules/fleets/fetch'
const { fleetsList, getFleetsList } = useGetFleets()
export const useExportQR = () => {
    const loading = ref(false)
    onMounted(() => {
        getFleetsList()
    })

    const proceedToExport = () => {
        loading.value = true
        const link = `${import.meta.env.VITE_BASE_URL}/v1/vehicles/qrimages?page=1&limit=${fleetsList.value.length}&status=active`
        window.open(link, '_blank')
        loading.value = false
        useConfirmationModal().closeAlert()
    }
    const exportCode = () => {
        useConfirmationModal().openAlert({
            title: 'Export all vehicle QR codes',
            type: 'NORMAL',
            desc: 'Are you sure you want to export all vehicle QR codes?',
            loading,
            call_function: () => proceedToExport()
        })
    }

    return { exportCode }
}
