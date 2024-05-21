import office_svg from '@/assets/icons/source/office_marker.svg'
import marker_svg from '@/assets/icons/source/home_marker.svg'
import busstop_marker_svg from '@/assets/icons/source/stop_marker.svg'
import { map } from '@/composables/core/map'

export const markerType = ref('home')

const home_markers = ref([] as any[])
const bus_stop_markers = ref([] as any[])
const polyline_markers = ref([] as any[])
const polyline_trace_markers = ref([] as any[])

watch(markerType, () => {
  setMapOnAll(map)
})

const polylineOptions = ref({
  geodesic: true,
  strokeColor: '#FF0000',
  strokeOpacity: 1.0,
  strokeWeight: 2
})

export const loadstaffBranches = (branches) => {
    for (const data of branches) {
        const x = data?.location.y
        const y = data?.location.x
        const dataLocation = { lat: x, lng: y }
        const infowindow = new window.google.maps.InfoWindow({
            content: `
          <div class="text-sm font-medium"> ${data?.address} </div>
          `,
            ariaLabel: 'Shuttlers'
        })
        const marker = new window.google.maps.Marker({
            position: dataLocation,
            map,
            icon: office_svg
        })
        marker.addListener('click', () => {
            infowindow.open({
                anchor: marker,
                map
            })
        })
    }
}

export const loadStaffHomeAddresses = (staff_data) => {
    for (const [inx, data] of staff_data.entries()) {
      polyline_markers.value[inx] = []
      if (data?.address?.location) {
        const x = data?.address?.location.y
        const y = data?.address?.location.x
        const dataLocation = { lat: x, lng: y }
        polyline_markers.value[inx].push(dataLocation)

        const infowindow = new window.google.maps.InfoWindow({
          content: `
              <div class="flex flex-col items-start"> <span class="text-sm font-medium">Address:</span> <span>${data?.address?.address || 'N/A'}</span> </div>
              <div class="flex flex-col items-start"> <span class="text-sm font-medium">Staff Name:</span> <span>${data?.fname} ${data?.lname}</span> </div>
              <div class="flex flex-col items-start"> <span class="text-sm font-medium">Work Shift:</span> <span>${data?.workShift?.corporate_work_shift?.description || 'N/A'}</span> </div>
              <div class="flex flex-col items-start"> <span class="text-sm font-medium">Office Branch:</span> <span>${data?.workShift?.officeBranch?.address || 'N/A'}</span> </div>
              `,
          ariaLabel: 'Shuttlers'
        })
        const marker = new window.google.maps.Marker({
          position: dataLocation,
          map,
          icon: marker_svg
        })
        marker.addListener('click', () => {
          infowindow.open({
            anchor: marker,
            map
          })
        })
        home_markers.value.push(marker)
      }

      if (data?.address?.closestBusstop) {
        const x = data?.address?.closestBusstop?.location.y
        const y = data?.address?.closestBusstop?.location.x
        const dataLocation = { lat: x, lng: y }
        polyline_markers.value[inx].push(dataLocation)
        const infowindow = new window.google.maps.InfoWindow({
          content: `
              <div class="flex flex-col items-start"> <span class="text-sm font-medium">closest bus stop:</span> <span> ${data?.address?.closestBusstop?.address || 'N/A'}</span> </div>
              <div class="flex flex-col items-start"> <span class="text-sm font-medium">Staff Name:</span> <span>${data?.fname} ${data?.lname}</span> </div>
              <div class="flex flex-col items-start"> <span class="text-sm font-medium">Work Shift:</span> <span>${data?.workShift?.corporate_work_shift?.description || 'N/A'}</span> </div>
              <div class="flex flex-col items-start"> <span class="text-sm font-medium">Office Branch:</span> <span>${data?.workShift?.officeBranch?.address || 'N/A'}</span> </div>
              `,
          ariaLabel: 'Shuttlers'
        })
        const marker = new window.google.maps.Marker({
          position: dataLocation,
          map,
          icon: busstop_marker_svg
        })
        marker.addListener('click', () => {
          infowindow.open({
            anchor: marker,
            map
          })
        })
        bus_stop_markers.value.push(marker)
      }
    }

      for (const polyline of polyline_markers.value) {
    if (polyline.length > 1) {
      const updatedPolylineOptions = {
        path: polyline,
        ...polylineOptions.value
      }
      const google_polyline_ref = new window.google.maps.Polyline(updatedPolylineOptions)
      polyline_trace_markers.value.push(google_polyline_ref)
    }
  }

  setMapOnAll(map)
}

const setMapOnAll = (map) => {
  if (markerType.value === 'home') {
    for (const element of home_markers.value) {
      element.setMap(map)
    }
    for (const element of bus_stop_markers.value) {
      element.setMap(null)
    }
    for (const element of polyline_trace_markers.value) {
      element.setMap(null)
    }
  } else if (markerType.value === 'bus_stop') {
    for (const element of bus_stop_markers.value) {
      element.setMap(map)
    }
    for (const element of home_markers.value) {
      element.setMap(null)
    }
    for (const element of polyline_trace_markers.value) {
      element.setMap(null)
    }
  } else if (markerType.value === 'both') {
    for (const element of bus_stop_markers.value) {
      element.setMap(map)
    }
    for (const element of home_markers.value) {
      element.setMap(map)
    }
    for (const element of polyline_trace_markers.value) {
      element.setMap(null)
    }
  } else if (markerType.value === 'both_with_line') {
    for (const element of bus_stop_markers.value) {
      element.setMap(map)
    }
    for (const element of home_markers.value) {
      element.setMap(map)
    }
    for (const element of polyline_trace_markers.value) {
      element.setMap(map)
    }
  }
}
