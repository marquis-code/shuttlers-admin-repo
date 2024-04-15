import { useAlert } from '@/composables/core/notification'
import { telemetry_api, CustomAxiosResponse } from '@/api_factory/modules'
import { loadPolyline } from '@/composables/core/map'
import { loadMarkeronMap } from '@/composables/core/map/tracking'

const selectedVehicle = ref({} as any)
const positionList = ref([] as Record<string, any>[])

export const useRouteReplay = () => {
    const loadingVehicle = ref(false)
    const loadingPosition = ref(false)
    const vehicleList = ref([] as Record<string, any>[])

    const filterData = {

    }

    const getVehicle = async () => {
        loadingVehicle.value = true
        const res = await telemetry_api.$_get_vehicles() as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            vehicleList.value = res.data.filter((item) => item.name)
        }
        loadingVehicle.value = false
    }

    const getPosition = async (id: string) => {
        loadingPosition.value = true
        const res = await telemetry_api.$_get_vehicle_positions(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            if (res.data.data.length === 0) {
                loadingPosition.value = false
                useAlert().openAlert({ type: 'ERROR', msg: 'No Path found' })
                return
            }

            positionList.value = res.data.data.map((obj: any) => ({
                lat: obj.position_latitude,
                lng: obj.position_longitude,
                id: obj.vehicle_id,
                dir: obj.position_direction
            }))

            await loadPolyline(positionList.value as any)
            await loadMarkeronMap(positionList.value[0] as any, () => { }, '/bus.svg', 270)
        }
        loadingPosition.value = false
    }

    return { getVehicle, getPosition, loadingVehicle, loadingPosition, positionList, vehicleList, selectedVehicle }
}

export const useRouteReplayControls = () => {
    const count = ref(0)
    const countEnd = computed(() => positionList.value.length - 1)
    const interval = ref()
    const isPlaying = ref(false)
    const currentSpeed = ref(1000)
    const play = async () => {
        if (countEnd.value <= 0) return useAlert().openAlert({ type: 'ERROR', msg: 'No Path found' })
        isPlaying.value = true
        interval.value = setInterval(() => {
            if (count.value === countEnd.value) {
                clearInterval(interval.value)
                isPlaying.value = false
            } else {
                count.value++
                loadMarkeronMap(positionList.value[count.value] as any, () => { }, '/bus.svg', positionList.value[count.value].dir)
            }
        }, currentSpeed.value)
    }

    const pause = () => {
        clearInterval(interval.value)
        isPlaying.value = false
    }

    const next = () => {
        if (count.value === countEnd.value) return
        count.value = count.value + 5
        loadMarkeronMap(positionList.value[count.value] as any, () => { }, '/bus.svg', positionList.value[count.value].dir)
    }

    const prev = () => {
        if (count.value === 0) return
        count.value = count.value - 5
        loadMarkeronMap(positionList.value[count.value] as any, () => { }, '/bus.svg', positionList.value[count.value].dir)
    }

    const changeSpeed = (speed: number) => {
        if (countEnd.value <= 0) return useAlert().openAlert({ type: 'ERROR', msg: 'No Path found' })
        currentSpeed.value = speed
        clearInterval(interval.value)
        play()
         useAlert().openAlert({ type: 'Alert', msg: `Speed set to ${speed / 1000}` })
    }

    return { count, countEnd, interval, isPlaying, next, prev, play, pause, changeSpeed, currentSpeed }
}

// function rotateImage(rotation) {
//   const img = document.querySelector('img[src="/bus.svg"]')
//   const imgHolder = document.querySelector('img[src="https://maps.gstatic.com/mapfiles/transparent.png"]')
//   if (img) {
//     img.style.transform = `rotate(${rotation}deg)`
//     imgHolder.style.transform = `rotate(${rotation}deg)`
//   }
// }
