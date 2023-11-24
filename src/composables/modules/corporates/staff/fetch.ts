import { useSelectedStaff } from './select-staff'
import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

const { selectedBranchIds, selectedShiftIds, selectedDays, selectedRoute } = useSelectedStaff()
const loading = ref(false)
const staffs = ref([]) as Ref<any[]>
const totalStaffs = ref(null) as Ref<number|null>
const filters = {
	search: ref(''),
	shift_ids: computed(() => selectedShiftIds.value),
	branch_ids: computed(() => selectedBranchIds.value),
	work_days: selectedDays,
	route: selectedRoute
}

export const useCorporateStaff = () => {
	const id = useRoute().params.id as string
	const { metaObject, moveTo, next, prev, setFunction } = usePagination()
	const getCorporateStaff = async () => {
		loading.value = true
		const res = await corporates_api.$_get_corporate_staffs(Number(id), metaObject, filters) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            staffs.value = res.data.data?.length ? res.data.data : []
            metaObject.total.value = res.data.metadata?.total_pages
			totalStaffs.value = res.data.metadata?.total
        }
        loading.value = false
	}

	const onFilterUpdate = (data) => {
        switch (data.type) {
            case 'search':
				filters.search.value = data.value
                break
        }
    }

	watch([filters.search, selectedShiftIds, selectedBranchIds, selectedDays, selectedRoute], () => {
		metaObject.page.value = 1
		getCorporateStaff()
	}, { deep: true })

	setFunction(getCorporateStaff())

	return { loading, staffs, getCorporateStaff, ...metaObject, moveTo, next, prev, totalStaffs, onFilterUpdate }
}
