import { events_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'
import { useEventIdDetails } from '@/composables/modules/events/id'
import { exportAsCsv, useDownloadReport } from '@/composables/utils/csv'
import { getDatesInRange, formatToWeekDay } from '@/composables/utils/old-helper'

export const useGetEventAttendees = () => {
    const { selectedEvent } = useEventIdDetails()
    const loadingEventAttendees = ref(false)
    const eventAttendeesList = ref([] as any)
    const { metaObject, moveTo, next, prev, setFunction } = usePagination()

    const filterData = {
        search: ref(''),
        fromdate: ref(''),
        todate: ref('')
    }

    watch([filterData.fromdate, filterData.todate, filterData.search], (val) => {
        metaObject.page.value = 1
        getEventAttendeesList()
    })

    const getEventAttendeesList = async () => {
        if (!selectedEvent.value.id) return
        loadingEventAttendees.value = true

        const res = await events_api.$_get_event_attendees(selectedEvent.value.id, metaObject, filterData) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            eventAttendeesList.value = res.data.data
            metaObject.total.value = res.data.metadata?.pageCount
        }
        loadingEventAttendees.value = false
    }

    setFunction(getEventAttendeesList)

    const onFilterUpdate = (data) => {
        switch (data.type) {
            case 'dateRange':
                filterData.fromdate.value = data.value[0] ? data.value[0] : ''
                filterData.todate.value = data.value[1] ? data.value[1] : ''
                break
            case 'search':
                filterData.search.value = data.value
                break
        }
    }

    const downloadAttendees = async () => {
        const { loading: downloading } = useDownloadReport()

        downloading.value = true
        const name = ref('Attendee list')
        const res = await events_api.$_get_event_attendees(selectedEvent.value.id, metaObject, filterData) as CustomAxiosResponse
        if (res && res?.type !== 'ERROR') {
            const dataRes = res.data.data
            const csvData = dataRes.map((data) => {
                return {
                    name: data.firstName + ' ' + data.lastName,
                    phone_number: data.phoneNumber,
                    pickupLocation: data.pickupLocation,
                    returnLocation: data.returnLocation,
                    status: data.status,
                    programDays: getDatesInRange(data.tripDate, data.returnDate).join(', ')
                }
            })
            exportAsCsv(csvData, name.value)
        }
        downloading.value = false
    }

    return { getEventAttendeesList, loadingEventAttendees, eventAttendeesList, filterData, onFilterUpdate, ...metaObject, next, prev, moveTo, downloadAttendees }
}
