import { staffs_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'
import { useAlert } from '@/composables/core/notification'

const loading = ref(false)
const auditList = ref([]) as Ref<Record<string, any>[]>
const filterData = {
	startDate: ref(''),
	endDate: ref(''),
	levelOfImportance: ref(''),
	actors: ref('')
}
const selectedLevel = ref([]) as Ref<Record<string, any>[]>
const selectedActors = ref([]) as Ref<Record<string, any>[]>

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

	setFunction(getAudits)

    watch([filterData.endDate, selectedActors, selectedLevel], () => {
		metaObject.page.value = 1
        getAudits()
    })

	const download = () => {
		alert('donwloading')
	}

	const onFilterUpdate = (data) => {
		switch (data.type) {
			case 'dateRange':
				filterData.startDate.value = data.value[0] ? data.value[0] : ''
				filterData.endDate.value = data.value[1] ? data.value[1] : ''
				break
			case 'download':
				download()
				break
		}
	}

	return { getAudits, download, onFilterUpdate, selectedActors, selectedLevel, auditList, loading, ...metaObject, moveTo, next, prev, ...filterData }
}
