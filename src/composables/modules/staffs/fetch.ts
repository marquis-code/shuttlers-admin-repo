import { staffs_api, CustomAxiosResponse } from '@/api_factory/modules'

const { $_get_staffs } = staffs_api

export const useGetStaffs = () => {
    const loading = ref(false)
    const staffsData = ref([] as any)
    const filterKeys = {
        search: ref(''),
        status: ref('1')
    }

    const getStaffs = async () => {
        loading.value = true
        const res = await $_get_staffs() as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            staffsData.value = res.data
        }
        loading.value = false
    }

    const filteredStaffs = computed(() => {
        const searchValue = filterKeys.search?.value?.toLowerCase()
        const statusValue = filterKeys.status.value
        console.log(searchValue, statusValue)
        if (searchValue || statusValue) {
            return staffsData.value.filter((staff) => {
                    console.log(staff.fname.toLowerCase().includes(searchValue))
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

    return { getStaffs, loading, staffsData, filterKeys, filteredStaffs, onFilterUpdate }
}
