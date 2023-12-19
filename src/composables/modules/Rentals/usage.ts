// import { charter_api } from '@/api_factory/modules/charter'
import { useAlert } from '@/composables/core/notification'

const step = ref(1)
const selectedVehicle = ref({} as Vehicle)
const selectedVehiclessList = ref([] as Vehicle[])

export type Vehicle = {
  id: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
  seats: number;
  images: string[];
  amenities: {
    name: string;
    short_name: string;
    image: string;
  }[];
  count: number;
};

export const useCharterVehicleUsage = () => {
    const loading = ref(false)

    const setSelectedVehicle = (vehicle: Vehicle) => {
        if (!vehicle.count) {
            vehicle.count = 1
        }
        selectedVehicle.value = vehicle
    }
    return { step, setSelectedVehicle, selectedVehicle, selectedVehiclessList }
}
