import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'

const loading = ref(false)
const groupDetails = ref({} as Record<string, any>)

export const useCorporateGroupDetails = () => {
    const getGroupDetails = async () => {
        loading.value = true
        const corporate_id = useRoute().params.id as string
        const group_id = useRoute().params.group_id as string
        const res = await corporates_api.$_get_corporate_group_detail_by_id(corporate_id, group_id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            groupDetails.value = res?.data?.id ? res?.data : {}
        }
        loading.value = false
    }

    return { loading, getGroupDetails, groupDetails }
}
