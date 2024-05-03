import axios from 'axios'

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string

const address = ref('')
export const useReverseGeoocoding = async () => {
    const getAddress = async (latlng: google.maps.LatLng) => {
            try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=${GOOGLE_MAPS_API_KEY}`)
        if (response.data.status === 'OK') {
            address.value = response.data.results[0].formatted_address
        } else {
            address.value = 'Unable to geocode. Please try again later.'
        }
    } catch (error) {
        console.error('Error:', error)
        address.value = 'Unable to fetch data. Please try again later.'
    }
    }

    return { getAddress, address }
}
