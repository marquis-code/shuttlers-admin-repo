const selectedStaffs = ref([]) as Ref<any[]>
const selectedStaffIds = computed(() => {
	const x:number[] = []
    // selectedStaffs.value.map((el) => {
    //     x.push(el.id)
    // })
	selectedStaffs.value.forEach((el) => {
		x.push(el.id)
	})
    return x
})

const handleStaffSelection = async (data:any) => {
	if (selectedStaffs.value.includes(data)) {
		selectedStaffs.value = selectedStaffs.value.filter((el) => el.id !== data.id)
	} else {
		selectedStaffs.value.push(data)
	}
}

export const useSelectedStaff = () => {
	return { selectedStaffIds, selectedStaffs, handleStaffSelection }
}
