import { useCharterVehicleUsage } from './usage'
import { useFetchCharterVehicle } from './fetch'
import { useAlert } from '@/composables/core/notification'
import { rental_api, CustomAxiosResponse } from '@/api_factory/modules'
const user = ref({}) as Ref<Record<string, any>>

const { selectedVehiclessList, selectedVehicle, step } = useCharterVehicleUsage()

const selectedUser = ref()
const credentials = {
    from: ref({} as any),
    id: ref(),
    passengers: ref(1),
    to: ref({} as any),
    pickup_date: ref('' as any),
    pickup_time: ref('' as any),
    return_date: ref(''),
    return_time: ref('' as any),
    status: ref('New'),
    stopsCount: ref(),
    isReturning: ref(false),
    stops: ref([] as string[]),
    vehicle_orders: ref([] as Record<string, any>[]),
    fname: ref(''),
    lname: ref(''),
    email: ref(''),
    phone: ref('')

}

const reset_form = () => {
    const inputs = document.querySelectorAll('input') as NodeListOf<HTMLInputElement>
    inputs.forEach((input) => {
        input.value = ''
    })
    credentials.from.value = {}
    credentials.id.value = ''
    credentials.passengers.value = 1
    credentials.to.value = {}
    credentials.pickup_date.value = ''
    credentials.pickup_time.value = ''
    credentials.return_date.value = ''
    credentials.return_time.value = ''
    credentials.status.value = 'New'
    credentials.stopsCount.value = 0
    credentials.isReturning.value = false
    credentials.stops.value = []
    credentials.vehicle_orders.value = []
    credentials.fname.value = ''
    credentials.lname.value = ''
    credentials.email.value = ''
    credentials.phone.value = ''
    selectedVehiclessList.value = []
    selectedVehicle.value = {} as any
    step.value = 1

    useFetchCharterVehicle().fetch()
}

export const use_post_charter = () => {
    const loading = ref(false)

    const disabled = computed({
        get: () => {
            if (Object.keys(credentials.from.value).length <= 0) return true
            if (Object.keys(credentials.to.value).length <= 0) return true
            if (credentials.pickup_date.value === '') return true
            if (credentials.pickup_time.value === '') return true
            if (credentials.isReturning.value === true && credentials.return_date.value === '') return true
            if (credentials.isReturning.value === true && credentials.return_time.value === '') return true
            return false
        },
        set: () => { }
    })

    const charter = async () => {
        loading.value = true

        const sent_data = {
            user_id: selectedUser.value?.id,
                pickup_address: credentials.from.value.name,
                pickup_date: credentials.pickup_date.value,
                pickup_geometry: `${credentials.from.value.lat}, ${credentials.from.value.lng}`,
                pickup_time: credentials.pickup_time.value,
                dropoff_address: credentials.to.value.name,
                dropoff_geometry: `${credentials.to.value.lat}, ${credentials.to.value.lng}`,
                email: user.value.email || credentials.email.value,
                fare: null,
                fname: user.value.fname || credentials.fname.value,
                id: user.value.id || '',
                lname: user.value.lname || credentials.lname.value,
                passengers: credentials.passengers.value,
                phone: user.value.phone || credentials.phone.value,
                return_address: credentials.to.value.name,
                return_date: credentials.isReturning.value ? credentials.return_date.value : null,
                return_geometry: `${credentials.from.value.lat}, ${credentials.from.value.lng}`,
                return_time: credentials.isReturning.value ? credentials.return_time.value : null,
                status: credentials.status.value,
                stops: credentials.stops.value.map((stop:any) => { return { address: stop.name, geometry: `${stop.lat}, ${stop.lng}` } }),
                vehicle_orders: selectedVehiclessList.value.map((vehicle) => { return { charter_vehicle_id: vehicle.id, quantity: vehicle.count } })
            }
        try {
            const res = await rental_api.$_request_charter(sent_data) as CustomAxiosResponse

            if (res.type !== 'ERROR') {
                reset_form()
				useAlert().openAlert({ type: 'SUCCESS', msg: 'Your charter request has been sent successfully. Our agents would reach out to you shortly.' })
            }
        } catch (error) {
            useAlert().openAlert({ type: 'ERROR', msg: 'Something went wrong, please try again' })
        } finally {
            loading.value = false
        }
    }
    return { loading, charter, disabled, credentials, selectedUser }
}
