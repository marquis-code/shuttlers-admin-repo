import { useDateFormat } from '@vueuse/core'

const requestQueue: (() => Promise<void>)[] = [] // Array to store the API request functions
let isQueueRunning = false // Flag to track the loading status

// Function to add API request functions to the queue
const addToQueue = (request: () => Promise<void>) => {
  requestQueue.push(request)
  if (!isQueueRunning) {
    runQueue()
  }
}

// Function to run the API request queue
const runQueue = async () => {
  isQueueRunning = true
  while (requestQueue.length > 0) {
    const request = requestQueue.shift()
    if (request) {
      await request()
    }
  }
  isQueueRunning = false
}

const filterData = {
    from: ref(''),
    to: ref(''),
    search: ref(''),
    route_type: ref(''),
    route_visibility: ref(''),
    // occupancy_rate_from: ref(''),
    // occupancy_rate_to: ref(''),
    city_ids: ref(''),
    vehicle_categories: ref(''),
    trip_time_list: ref('')
}

const onFilterUpdate = (data: any) => {
    switch (data.type) {
        case 'search':
            filterData.search.value = data.value
            break
        case 'routeType':
            filterData.route_type.value = data.value.length === 0 || data.value.length === 2 ? '' : data.value.map((item: any) => item.value).join('')
            break
        case 'visibility':
            filterData.route_visibility.value = data.value.length === 0 || data.value.length === 2 ? '' : data.value.map((item: any) => item.value).join('')
            break
        case 'city':
            filterData.city_ids.value = data.value.length === 0 ? '' : JSON.stringify(data.value.map((item: any) => item.value))
            break
        case 'vehicleType':
            filterData.vehicle_categories.value = data.value.length === 0 ? '' : JSON.stringify(data.value.map((item: any) => item.value))
            break
        case 'startTime':
            filterData.trip_time_list.value = data.value.length === 0 ? '' : JSON.stringify(data.value.map((item: any) => item.value))
            break
        case 'occupancy':
            // filterData.occupancy_rate_from.value = data.value[0]
            // filterData.occupancy_rate_to.value = data.value[1]
            break
        case 'dateRange':
            filterData.from.value = data.value[0] ? data.value[0] : ''
            filterData.to.value = data.value[1] ? data.value[1] : ''
            break
    }
}
const watchArray = [filterData.search, filterData.from, filterData.to, filterData.route_type, filterData.route_visibility,
    filterData.vehicle_categories, filterData.city_ids, filterData.trip_time_list
    // filterData.occupancy_rate_from, filterData.occupancy_rate_to
]

const formattedCSVData = (data: any[]) => {
    return data.map((trip) => {
        return {
            date: useDateFormat(trip.trip_start_time, 'YYYY-MM-DD').value,
            time: trip?.itinerary?.trip_time ?? 'N/A',
            routeCode: trip.route.route_code,
            pickup: trip.route.pickup || 'N/A',
            destination: trip.route.destination,
            partnerName: trip.vehicle?.partner?.company_name,
            vehicle: trip.vehicle?.vehicle_name,
            vehicleType: trip.vehicle?.vehicle_category?.category_name,
            occupancy: trip.vehicle?.occupancy,
            routeVisibility: trip.route?.route_visibility === '1' ? 'Public' : 'Private',
            routeType: trip.route?.route_type === '1' ? 'Fixed' : 'Flexible',
            status: trip.status === '1' ? 'Active' : trip.status === '2' ? 'Cancelled' : 'Completed'
        }
    })
}

export {
    formattedCSVData,
    watchArray,
    filterData,
    onFilterUpdate,
    addToQueue
}
