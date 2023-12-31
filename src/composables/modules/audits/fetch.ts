import moment from 'moment'
import { useAuditFilter } from './filter'
import { staffs_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'
import { useAlert } from '@/composables/core/notification'
import { exportAsCsv, useDownloadReport } from '@/composables/utils/csv'

const { loading: downloading } = useDownloadReport()
const { selectedAdminIds, computedSelectedType } = useAuditFilter()
const loading = ref(false)
const auditList = ref([]) as Ref<Record<string, any>[]>
export const allAdmins = ref([]) as Ref<Record<string, any>[]>
const filterData = {
	startDate: ref(''),
	endDate: ref(''),
	levelOfImportance: computedSelectedType,
	actors: computed(() => selectedAdminIds.value.join(','))
}

export const useAudits = () => {
	const { metaObject, moveTo, next, prev, setFunction } = usePagination()

    const getAudits = async () => {
        loading.value = true
        const res = await staffs_api.$_get_audits(metaObject, filterData) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            auditList.value = res.data?.result?.length ? res.data.result : []
            metaObject.total.value = res.data.metadata?.pages
        }
        loading.value = false
    }

	const getAllAdmins = async () => {
		const res = await staffs_api.$_get_all_staffs() as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            allAdmins.value = res.data?.data?.length ? res.data.data : []
        }
	}

	setFunction(getAudits)

    watch([filterData.endDate, selectedAdminIds, computedSelectedType], () => {
		metaObject.page.value = 1
        getAudits()
    })

	const downloadAllAudits = async () => {
		downloading.value = true
		const name = ref(`all-${computedSelectedType}-audits`)
		const res = await staffs_api.$_download_all_audits(filterData) as CustomAxiosResponse
        if (res && res?.type !== 'ERROR') {
			const data = res.data?.result || []
            const newArr = data.map((el: Record<string, any>) => {
                return {
					Actor: `${el.fname} ${el.lname}`,
					Email: el.userEmail,
					Ip_Address: el?.ipAddress,
					Date: moment(el.createdAt).format('Do MMM, YYYY h:mm A'),
					Action: el.description ? el.description : 'No Description',
					Type: el.levelOfImportance
                }
            })
			if (filterData.startDate.value && filterData.endDate.value) name.value = `${name.value}-from-${filterData.startDate.value}-to-${filterData.endDate.value}`
			exportAsCsv(newArr, name.value)
        }
		downloading.value = false
	}

	const onFilterUpdate = (data) => {
		switch (data.type) {
			case 'dateRange':
				filterData.startDate.value = data.value[0] ? data.value[0] : ''
				filterData.endDate.value = data.value[1] ? data.value[1] : ''
				break
		}
	}

	return { getAudits, getAllAdmins, allAdmins, downloadAllAudits, onFilterUpdate, auditList, loading, ...metaObject, moveTo, next, prev, ...filterData }
}
