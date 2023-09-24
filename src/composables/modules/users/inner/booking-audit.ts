import { users_api, CustomAxiosResponse } from '@/api_factory/modules'

export const useUserRefundLogAudit = () => {
    const loadingAduit = ref(false)
    const auditArray = ref([] as any)

    const getRefundAudit = async (id:string) => {
        loadingAduit.value = true
        const res = await users_api.$_refund_audit(id) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            auditArray.value = res.data.data
        }
        loadingAduit.value = false
    }

    return { getRefundAudit, loadingAduit, auditArray }
}
