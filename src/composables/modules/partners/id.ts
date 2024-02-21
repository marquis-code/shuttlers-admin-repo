import { partners_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { useAlert } from '@/composables/core/notification'
import { useUser } from '@/composables/auth/user'

const selectedPartner = ref({} as Record<string, any>)
const selectedPartnerId = ref('')
const selectedPartnerAccountSid = ref('')
const partnerId = ref<number>()

export const usePartnerIdDetails = () => {
    const loading = ref(false)

    const getPartnerById = async (id: string) => {
        selectedPartnerId.value = id
        loading.value = true
        const res = await partners_api.$_get_partner_by_id(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            selectedPartner.value = res.data
        }
        loading.value = false
    }
    return { selectedPartner, loading, getPartnerById }
}

export const useGetPartnersVehiclesList = () => {
    const loading = ref(false)
    const partnersVehiclesList = ref([] as any)
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()
    const filterData = {
        status: ref('')
    }

    const { $_get_partner_vehicles_by_id } = partners_api

    const getPartnersVehiclesList = async (id:number) => {
        loading.value = true
        partnerId.value = id
        const res = await $_get_partner_vehicles_by_id(id, metaObject, filterData) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            partnersVehiclesList.value = res.data.data
            metaObject.total.value = res.data.metadata.total
        }
        loading.value = false
    }
    setFunction(getPartnersVehiclesList)

    watch([filterData.status], (val) => {
        getPartnersVehiclesList(Number(partnerId.value))
    })

    const onFilterUpdate = (data: any) => {
        switch (data.type) {
            case 'status':
                filterData.status.value = data.value
                break
        }
    }

    return { getPartnersVehiclesList, loading, partnersVehiclesList, filterData, onFilterUpdate, moveTo, ...metaObject, next, prev }
}

export const useGetPartnersDriversList = (account_sid: string) => {
    const loading = ref(false)
    const partnersDriversList = ref([] as any)
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()
    const filterData = {
        status: ref('')
    }

    const { $_get_partner_drivers_by_id } = partners_api

    const getPartnersDriversList = async (account_sid:string) => {
        loading.value = true

        const res = await $_get_partner_drivers_by_id(account_sid, metaObject, filterData) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            partnersDriversList.value = res.data.data
            metaObject.total.value = res.data.metadata.total
        }
        loading.value = false
    }
    setFunction(getPartnersDriversList)

    watch([filterData.status], (val) => {
        getPartnersDriversList(account_sid)
    })

    const onFilterUpdate = (data: any) => {
        switch (data.type) {
            case 'status':
                filterData.status.value = data.value
                break
        }
    }

    return { getPartnersDriversList, loading, partnersDriversList, filterData, onFilterUpdate, moveTo, ...metaObject, next, prev }
}

export const useGetPartnersCompletedTripsList = () => {
    const loading = ref(false)
    const partnersCompletedTripsList = ref([] as any)
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()
    const filterData = {
        status: ref(''),
        search: ref(''),
        isSettled: ref(false)
    }

    const { $_get_partner_completed_trips_by_id } = partners_api

    const getPartnersCompletedTrips = async (account_sid:string) => {
        loading.value = true
        const res = await $_get_partner_completed_trips_by_id(account_sid, metaObject, filterData) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            partnersCompletedTripsList.value = res.data.result
            metaObject.total.value = res.data.metadata.total
        }
        loading.value = false

            watch([filterData.status], (val) => {
        getPartnersCompletedTrips(account_sid)
    })
    }
    setFunction(getPartnersCompletedTrips)

    const onFilterUpdate = (data: any) => {
        switch (data.type) {
            case 'status':
                filterData.status.value = data.value
                break
            case 'search':
                    filterData.search.value = data.value
                break
            case 'isSettled':
                    filterData.isSettled.value = data.value
                break
        }
    }

    return { getPartnersCompletedTrips, loading, partnersCompletedTripsList, filterData, onFilterUpdate, moveTo, ...metaObject, next, prev }
}

export const useGetPartnersAccountsList = (account_sid: string) => {
    const loading = ref(false)
    const partnersAccountList = ref([] as any)
    selectedPartnerAccountSid.value = account_sid
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()

    const { $_get_partner_accounts_by_id } = partners_api

    const getPartnersAccountList = async () => {
        loading.value = true

        const res = await $_get_partner_accounts_by_id(account_sid, metaObject) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            partnersAccountList.value = res.data.data
            metaObject.total.value = res.data.metadata.total
        }
        loading.value = false
    }
    setFunction(getPartnersAccountList)

    return { getPartnersAccountList, loading, partnersAccountList, moveTo, ...metaObject, next, prev }
}

export const useGetPartnerKyc = () => {
    const loadingKycDetails = ref(false)
    const partnersKycInformation = ref({}) as Ref<Record<string, any>>

    const { $_get_partner_kyc_by_id } = partners_api

    const getPartnerKyc = async (account_sid:string) => {
        loadingKycDetails.value = true

        const res = await $_get_partner_kyc_by_id(account_sid) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            partnersKycInformation.value = res.data.data
        }
        loadingKycDetails.value = false
    }

    return { getPartnerKyc, loadingKycDetails, partnersKycInformation }
}

export const useVerifyPartnerKyc = () => {
    const loading = ref(false)
    const documentObj = ref({}) as Ref<Record<string, any>>

    const verify = async () => {
        loading.value = true
        const account_sid = useRoute().params.accountSid as string
        const { user } = useUser()
        const payload = {
            user_id: user.value.id
        }
        const res = await partners_api.$_verify_partner_document(account_sid, documentObj.value.id, payload) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            console.log(res.data)
            useAlert().openAlert({ type: 'SUCCESS', msg: 'You have successfully verified this partners identity' })
        }
    }

    const initVerifyKyc = (document:Record<string, any>, documentType: 'Identity'|'Address') => {
        documentObj.value = document
        useConfirmationModal().openAlert({
			call_function: verify,
			desc: 'Are you sure you want to continue?',
			title: `Verify ${documentType}`,
			loading,
			type: 'DANGER'
		})
    }

    return { initVerifyKyc, loading }
}

export const useGetPartnerEarningSummary = () => {
    const loadingEarnings = ref(false)
    const partnersEarningInformation = ref({}) as Ref<Record<string, any>>

    const { $_get_partner_earnings_by_id } = partners_api

    const getPartnerEarning = async (account_sid:string) => {
        loadingEarnings.value = true

        const res = await $_get_partner_earnings_by_id(account_sid) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            partnersEarningInformation.value = res.data
        }
        loadingEarnings.value = false
    }

    return { getPartnerEarning, loadingEarnings, partnersEarningInformation }
}

export const useGetPartnerAccount = () => {
    const loadingAccounts = ref(false)
    const partnersAccountInformation = ref([])
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()

    const { $_get_partner_accounts_by_id } = partners_api

    const getPartnerAccount = async (account_sid:string) => {
        loadingAccounts.value = true

        const res = await $_get_partner_accounts_by_id(account_sid, metaObject) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            partnersAccountInformation.value = res.data.data
            metaObject.total.value = res.data.metadata.total
        }
        loadingAccounts.value = false
    }

    setFunction(getPartnerAccount)

    return { getPartnerAccount, loadingAccounts, partnersAccountInformation, moveTo, ...metaObject, next, prev }
}
