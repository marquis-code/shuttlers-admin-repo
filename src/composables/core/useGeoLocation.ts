export const useGeolocationApi = () => {
    const latitude = ref('')
    const longitude = ref('')
    const locationError = ref('')
    function showPosition(position) {
        latitude.value = position.coords.latitude
        longitude.value = position.coords.longitude
    }

    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                locationError.value = 'User denied the request for Geolocation.'
                break
            case error.POSITION_UNAVAILABLE:
                locationError.value = 'Location information is unavailable.'
                break
            case error.TIMEOUT:
                locationError.value = 'The request to get user location timed out.'
                break
            case error.UNKNOWN_ERROR:
                locationError.value = 'An unknown error occurred.'
                break
        }
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError)
    }

    return {
        latitude, longitude, locationError
    }
}
