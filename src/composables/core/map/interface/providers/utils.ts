import { Loader } from '@googlemaps/js-api-loader'

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string

export const loader = new Loader({
	apiKey: GOOGLE_MAPS_API_KEY as string,
	  libraries: ['places', 'marker', 'drawing'],
  version: 'beta'
})
