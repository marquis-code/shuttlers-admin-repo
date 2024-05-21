import { useSelectedStaff } from './select-staff'
import { loadstaffBranches, markerType, loadStaffHomeAddresses } from './staffMap'
import { useWorkBranches } from '@/composables/modules/corporates/workBranches'
import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'
import { useDownloadReport, exportAsCsv } from '@/composables/utils/csv'
import { useCorporateIdDetails } from '@/composables/modules/corporates/id'
const { download, loading: downloading } = useDownloadReport()

const { selectedBranchIds, selectedShiftIds, selectedDays, selectedRoute } = useSelectedStaff()
const loading = ref(false)
const staffs = ref([]) as Ref<any[]>
const totalStaffs = ref(null) as Ref<number | null>
const filters = {
	search: ref(''),
	shift_ids: computed(() => selectedShiftIds.value),
	branch_ids: computed(() => selectedBranchIds.value),
	work_days: selectedDays,
	route: selectedRoute
}

export const useCorporateStaff = () => {
	const { selectedCorporate } = useCorporateIdDetails()
	const isMapView = ref(false)

	const { metaObject, moveTo, next, prev, setFunction } = usePagination()

	const getCorporateStaff = async () => {
		const id = useRoute().params.id as string
		loading.value = true
		const res = await corporates_api.$_get_corporate_staffs(Number(id), metaObject, filters) as CustomAxiosResponse
		if (res.type !== 'ERROR') {
			staffs.value = res.data.data?.length ? res.data.data : []
			metaObject.total.value = res.data.metadata?.total_pages
			totalStaffs.value = res.data.metadata?.total
		}
		loading.value = false
	}

	watch(isMapView, async (val) => {
		if (val) {
			metaObject.page_size.value = totalStaffs.value!
			const { fetchWorkBranches, loading, workBranches } = useWorkBranches()
			await getCorporateStaff()
			loadStaffHomeAddresses(staffs.value)
			await fetchWorkBranches(selectedCorporate.value.id)
			loadstaffBranches(workBranches.value)
		}
	})

	const onFilterUpdate = (data) => {
		switch (data.type) {
			case 'search':
				filters.search.value = data.value
				break
		}
	}

	const downloadCorporateStaffs = async () => {
		downloading.value = true
		const id = useRoute().params.id as string
		const name = ref(`${selectedCorporate?.value?.corporate_name} Corporate Staffs'`)
		const res = await corporates_api.$_download_corporate_staffs(Number(id), filters) as CustomAxiosResponse
		if (res && res?.type !== 'ERROR') {
			const data = res.data.data
			const newArr = data.map((el) => {
				return {
					first_name: el?.fname || 'N/A',
					last_name: el?.lname || 'N/A',
					email: el?.email || 'N/A',
					phone: el?.phone || 'N/A',
					home_address: el?.address?.address || 'N/A',
					nearest_busstop: el?.address?.closestBusstop?.address || 'N/A',
					office_branch: el?.workShift?.officeBranch?.address || 'N/A',
					work_shift: el?.workShift?.corporate_work_shift?.description || 'N/A',
					work_days: el?.workShift?.work_days.map((itm) => itm) || 'N/A',
					credit_balance: el?.wallet?.amount || 'N/A',
					preferred_routes: el?.preferredRoutes.map((itm: any) => itm?.route?.route_code) || 'N/A'
				}
			})
			download(newArr, name.value)
		}
		downloading.value = false
	}

	watch([filters.search, selectedShiftIds, selectedBranchIds, selectedDays, selectedRoute], () => {
		metaObject.page.value = 1
		getCorporateStaff()
	}, { deep: true })

	setFunction(getCorporateStaff)

	return { loading, staffs, downloadCorporateStaffs, getCorporateStaff, ...metaObject, moveTo, next, prev, totalStaffs, onFilterUpdate, isMapView, markerType }
}
