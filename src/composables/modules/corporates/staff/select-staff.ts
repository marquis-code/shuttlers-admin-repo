import { computed } from 'vue'

const selectedStaffs = ref([]) as Ref<any[]>
const selectedBranches = ref([]) as Ref<any[]>
const selectedShifts = ref([]) as Ref<any[]>
const selectedDays = ref([]) as Ref<any[]>
const searchedRoute = ref('')

const selectedStaffIds = computed(() => {
	const x:number[] = []
	selectedStaffs.value.forEach((el) => {
		x.push(el.id)
	})
    return x
})
const selectedBranchIds = computed(() => {
	return selectedBranches.value.map((el) => el.id)
})
const selectedShiftIds = computed(() => {
	return selectedShifts.value.map((el) => el.id)
})

const handleStaffSelection = async (data:any) => {
	if (selectedStaffs.value.includes(data)) {
		selectedStaffs.value = selectedStaffs.value.filter((el) => el.id !== data.id)
	} else {
		selectedStaffs.value.push(data)
	}
}

const handleBranchSelection = async (data:any) => {
	if (selectedBranches.value.includes(data)) {
		selectedBranches.value = selectedBranches.value.filter((el) => el.id !== data.id)
	} else {
		selectedBranches.value.push(data)
	}
}
const handleShiftSelection = async (data:any) => {
	if (selectedShifts.value.includes(data)) {
		selectedShifts.value = selectedShifts.value.filter((el) => el.id !== data.id)
	} else {
		selectedShifts.value.push(data)
	}
}

const handleDaysSelection = async (data:string) => {
	if (selectedDays.value.includes(data)) {
		selectedDays.value = selectedDays.value.filter((el) => el !== data)
	} else {
		selectedDays.value.push(data)
	}
}

export const useSelectedStaff = () => {
	return { selectedStaffIds, selectedStaffs, handleStaffSelection, handleDaysSelection, handleShiftSelection, handleBranchSelection, selectedBranches, selectedDays, selectedShifts, searchedRoute, selectedBranchIds, selectedShiftIds }
}
