import { useDateFormat } from '@vueuse/core'
import moment from 'moment'
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
    occupancy_rate_from: ref(''),
    occupancy_rate_to: ref(''),
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
            filterData.occupancy_rate_from.value = data.value[0]
            filterData.occupancy_rate_to.value = data.value[1]
            break
        case 'dateRange':
            filterData.from.value = data.value[0] ? data.value[0] : ''
            filterData.to.value = data.value[1] ? data.value[1] : ''
            break
    }
}
const watchArray = [filterData.search, filterData.from, filterData.to, filterData.route_type, filterData.route_visibility,
filterData.vehicle_categories, filterData.city_ids, filterData.trip_time_list,
    filterData.occupancy_rate_from, filterData.occupancy_rate_to
]

const formattedCSVData = (data: any[]) => {
    return data.map((trip) => {
        return {
            Date: moment.utc(trip.trip_start_time).format('YYYY-MM-DD'),
            time: moment.utc(trip?.trip_date_time).format('h:mm A') ?? 'N/A',
            'Route Code': trip.route.route_code,
            Pickup: trip.route.pickup || 'N/A',
            Destination: trip.route.destination,
            'Partner Name': trip.vehicle?.partner?.company_name,
            'Driver Name': trip.driver ? `${trip.driver.fname} ${trip.driver.lname}` : trip.route.driver ? `${trip.route.driver.fname} ${trip.route.driver.lname}` : 'N/A',
            'Driver Phone': trip?.driver?.phone || 'N/A',
            'Passengers Count': trip.passengers_count || 0,
            Seats: trip?.vehicle?.seats || 0,
            'Vehicle Name': trip?.vehicle?.name || 'N/A',
            'Vehicle Brand': trip?.vehicle?.brand || 'N/A',
            'Vehicle Registration Number': trip?.vehicle?.registration_number || 'N/A',
            'Cost of Supply': trip.cost_of_supply || 0
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
