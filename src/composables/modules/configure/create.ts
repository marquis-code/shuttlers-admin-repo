// import { useSosList } from './fetch'
// import { sos_api, CustomAxiosResponse } from '@/api_factory/modules'
// import { useCommuteModal } from '@/composables/core/modals'
// import { useAlert } from '@/composables/core/notification'

// const selectedSosTrip = ref({} as Record<string, any>)

// export const useNotifySos = () => {
//     const loading = ref(false)

//     const sos_data = {
//         sos_request_ids: ref([])
//     }

//     const openNotifier = (data: Record<string, any>) => {
//         selectedSosTrip.value = data
//         useCommuteModal().openSosNotifier()
//     }

//     const notify = async () => {
//         loading.value = true
//         const res = await sos_api.$_sos_provider_request({ sos_request_ids: sos_data.sos_request_ids.value.map((i: any) => i.id) }) as CustomAxiosResponse
//         if (res.type !== 'ERROR') {
//             useCommuteModal().closeSosNotifier()
//             useAlert().openAlert({ type: 'SUCCESS', msg: 'Provider Notified successfully' })
//             useSosList().getSosList()
//         }
//         loading.value = false
//     }

//     return { loading, openNotifier, sos_data, selectedSosTrip, notify }
// }
