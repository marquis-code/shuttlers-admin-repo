import { staffs_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'
import { useAlert } from '@/composables/core/notification'

const { $_get_staffs, $_get_staffs_by_search_query } = staffs_api
const payload = {
    active: ref(''),
    name: ref('get-all-audits')
}

const featureForm = {
	name: ref('').value,
	active: ref('').value
}

export const useGetStaffs = () => {
    const loading = ref(false)
    const staffsData = ref([] as any[])

    const { metaObject, moveTo, next, prev, setFunction } = usePagination()

    const filterKeys = {
        search: ref(''),
        status: ref('1')
    }

    const getStaffs = async () => {
        loading.value = true
        const res = await $_get_staffs(metaObject, filterKeys) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            staffsData.value = res.data.data
            metaObject.total.value = res.data.metadata?.total_pages
        }
        loading.value = false
    }

    const getStaffsBySearchQuery = async () => {
        const updatedFilterData: any = {
            search: ref(filterKeys.search.value)
        }
        loading.value = true
        const res = await $_get_staffs_by_search_query(updatedFilterData) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            staffsData.value = res.data.data
            metaObject.total.value = res.data.metadata?.total_pages
        }
        loading.value = false
    }

    setFunction(getStaffs)

    watch([filterKeys.status], (val) => {
        getStaffs()
    })

    watch(filterKeys.search, (val) => {
       if (val) {
        getStaffsBySearchQuery()
       }

       if (!val.length) {
        getStaffs()
       }
    })

    const filteredStaffs = computed(() => {
        const searchValue = filterKeys.search?.value?.toLowerCase()
        const statusValue = filterKeys.status.value
        if (searchValue || statusValue) {
            return staffsData.value.filter((staff) => {
            return (
                staff.fname.toLowerCase().includes(searchValue) ||
                staff.lname.toLowerCase().includes(searchValue) ||
                staff.email.toLowerCase().includes(searchValue) ||
                staff.phone.toLowerCase().includes(searchValue)
            )
        }).filter((staff) => {
            return statusValue === '1' ? staff.active === '1' : staff.active === '0'
        })
        } else {
            return staffsData.value
        }
    })

    const onFilterUpdate = (data) => {
    switch (data.type) {
        case 'search':
            filterKeys.search.value = data.value
            break
        case 'status':
            filterKeys.status.value = data.value
            break
    }
}

    return { getStaffs, loading, staffsData, filterKeys, filteredStaffs, onFilterUpdate, next, prev, moveTo, ...metaObject }
}

export const useGetPermissions = () => {
    const loading = ref(false)
    const staffPermissions = ref([] as any)
    const { metaObject, moveTo, next, prev } = usePagination()

    const getStaffsPermissions = async () => {
        loading.value = true
        const res = await staffs_api.$_get_permisions(metaObject) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            staffPermissions.value = res.data.data
            metaObject.total.value = res.data.metadata?.pageCount
        }
        loading.value = false
    }

    return { getStaffsPermissions, loading, staffPermissions, next, prev, moveTo, ...metaObject }
}

export const useGetAudits = () => {
    const loading = ref(false)
    const auditList = ref([]) as Ref<Record<string, any>[]>
    const { metaObject, moveTo, next, prev } = usePagination()

    const getAudits = async () => {
        loading.value = true
        const res = await staffs_api.$_get_audits(metaObject) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            auditList.value = res.data?.result?.length ? res.data.result : []
            metaObject.total.value = res.data.metadata?.pages
        }
        loading.value = false
    }

    return { getAudits, loading, auditList, next, prev, moveTo, ...metaObject }
}

export const useFeatureFlaggedAudits = () => {
    const loading = ref(false)
    const featureFlaggedAuditStatus = ref([] as any)
    const { metaObject, moveTo, next, prev } = usePagination()

    const getFeatureFlaggedAudits = async () => {
        loading.value = true
        const res = await staffs_api.$_feature_flag_flagged_audits() as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            featureFlaggedAuditStatus.value = res.data.active
            metaObject.total.value = res.data.metadata?.pageCount
        }
        loading.value = false
    }

    return { getFeatureFlaggedAudits, loading, featureFlaggedAuditStatus, next, prev, moveTo, ...metaObject }
}

export const useHandleFeatureFlaggedAudits = () => {
    const loading = ref(false)
    const featureFlagAudits = async () => {
        loading.value = true
        const res = await staffs_api.$_feature_flag_audits(featureForm) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: `staff audits only status has been ${featureForm?.active ? 'activated' : 'deactivated'}` })
        }
        loading.value = false
    }

    const prePopulateFeatureForm = (data: any) => {
		featureForm.name = data.name || ''
		featureForm.active = data.active || ''
	}

    return { featureFlagAudits, loading, prePopulateFeatureForm }
}
