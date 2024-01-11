<template>
	<div class="space-y-4">
		<div>
			<div v-if="!loading">
				<BreadCrums title="Vehicle" :content="breadcrum" />
			</div>
			<Skeleton v-else height="300px" />
		</div>
		<div class="lg:flex lg:gap-x-10 justify-center items-start space-y-10 lg:space-y-0">
			<div v-if="!loading" class="md:w-6/12 bg-white rounded-md shadow-sm p-3">
				<div class="flex justify-between items-center py-2.5 border-b pb-2 px-3">
					<div class="font-medium">
						Vehicle Information
					</div>
					<ButtonDropdown :children="dropdownChildren" :data="selectedVehicle" />
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<div class="flex items-center gap-4 list-group-item">
						<div class="w-28 rounded-md bg-white border">
							<div><FullscreenImage :src="qrCodeImageUrl" alt="QR Code" /></div>
						</div>
						<span class="cursor-pointer text-sm" @click="showAllQrCode">Export QR code</span>
					</div>
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						BRAND
					</p>
					<p class="text-sm">
						{{ `${selectedVehicle?.brand}` ?? 'N/A' }}
					</p>
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						NAME
					</p>
					<p>
						{{ `${selectedVehicle?.name}` ?? 'N/A' }}
					</p>
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						PLATE NUMBER
					</p>
					<p class="text-sm">
						{{ selectedVehicle?.registration_number ?? 'N/A' }}
					</p>
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						CAPACITY
					</p>
					<p class="text-sm">
						{{ selectedVehicle?.seats ?? 'N/A' }}
					</p>
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						TYPE
					</p>
					<p class="text-sm">
						{{ selectedVehicle?.type ?? 'N/A' }}
					</p>
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						AMENITIES
					</p>
					<div v-if="selectedVehicle?.amenities" class="text-sm">
						<p v-for="(itm, idx) in selectedVehicle?.amenities" :key="idx">
							{{ itm.name }}
						</p>
					</div>
					<span v-else>N/A</span>
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						DRIVER
					</p>
					<div class="text-sm">
						<span>{{ selectedVehicle?.driver ? `${selectedVehicle?.driver.fname} ${selectedVehicle?.driver.lname}`: 'Unassigned' }}</span>
					</div>
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						COMMISSIONED SINCE
					</p>
					<p class="text-sm">
						{{ useDateFormat(selectedVehicle.created_at, "MMMM d, YYYY").value }}
					</p>
				</div>
				<div class="flex justify-between items-center py-4 px-3">
					<p class="text-gray-500 text-sm">
						PARTNER
					</p>
					<div>
						<div v-if="selectedVehicle.partner" class="col-auto">
							<NuxtLink to="" class="sh-page-link">
								{{ selectedVehicle?.partner?.company_name ?? 'N/A' }}
							</NuxtLink>
						</div>
						<div v-else class="col-auto">
							<span class="text-muted">No partner assigned</span>
						</div>
					</div>
				</div>
			</div>
			<Skeleton v-else height="300px" />
			<div v-if="!loadingEarnings" class="md:w-6/12 bg-white rounded-md shadow-sm">
				<div class="px-6 border-b py-3">
					<p class="font-medium">
						Vehicle Earnings
					</p>
				</div>

				<div class="flex justify-center gap-y-2 items-center flex-col py-10">
					<p v-if="!loadingEarnings" class="text-4xl font-semibold">
						{{ formattedEarnings }}
					</p>
					<Skeleton v-else height="30px" width="100px" />
					<p class="text-gray-400 text-xs">
						ACCOUNT BALANCE
					</p>
				</div>

				<div class="flex justify-between items-center border-b py-4 px-6">
					<p class="text-gray-500 text-xs">
						Total no. of trips
					</p>
					<p v-if="!loadingTripHistory" class="text-xs">
						{{ fleeTripHistory?.length }}
					</p>
					<Skeleton v-else height="30px" width="100px" />
				</div>
			</div>
			<Skeleton v-else height="300px" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useEditVehicles } from '@/composables/modules/fleets/vehicles/update'
import { useDecommissionVehicle } from '@/composables/modules/fleets/decommision'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { useVehicleModal } from '@/composables/core/modals'
import { useVehicleIdDetails, useGetVehicleEarnings, useGetFleetTripHistory } from '@/composables/modules/fleets/id'
const { openEditBus } = useEditVehicles()
const base_url = import.meta.env.VITE_BASE_URL
const { getFleetsTripHistory, loadingTripHistory, fleeTripHistory } = useGetFleetTripHistory()
const { selectedVehicle, loading, getVehicleById } = useVehicleIdDetails()
const { handleDecommisionVehicle, loading: processing_decommision } = useDecommissionVehicle()
const { getVehicleEarnings, loadingEarnings, fleetEarnings } = useGetVehicleEarnings()

const id = useRoute().params.id as string
getVehicleById(Number(id))
getVehicleEarnings()

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})

const dropdownChildren = computed(() => [
	{ name: 'Change Driver', func: () => { useVehicleModal().openChangeFleetDriver() } },
	{ name: 'Update Tracking Details', func: () => { useVehicleModal().openUpdateVehicleTracking() } },
	{ name: 'Edit Bus', func: (data) => { editVehicle(data) } },
	{ name: 'Export QR Code', func: (data) => { exportQrCode(data) } },
	{ name: `${selectedVehicle.value.status === 'active' ? 'De-commission' : 'Commision'} Vehicle`, func: (data) => { handleDecomission(data) }, class: '!text-red' }
])

const vehicleEarning = computed(() => {
			return fleetEarnings.value.reduce((accumulator, currentValue) => {
				return accumulator + currentValue.finalPartnersRevenue
			}, 0)
		})

const formattedEarnings = computed(() => {
      return !vehicleEarning.value
        ? '₦0.00'
        : `₦${parseFloat(vehicleEarning.value)
            .toFixed(2)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`
    })

	const breadcrum = computed(() => {
		return [
            {
                name: `${selectedVehicle?.value?.brand} ${selectedVehicle?.value?.name}`,
                link: '#'
            },
            {
                name: `${selectedVehicle?.value?.registration_number}`,
                link: '#'
            }
        ]
	})
const openDropdown = ref(false)
const qrCodeImageUrl = computed(() => {
			return `${import.meta.env.VITE_BASE_URL}/v1/vehicles/${selectedVehicle?.value.id}/qrimage.png`
		})

		const showAllQrCode = () => {
			const link = `${import.meta.env.VITE_BASE_URL}/v1/vehicles/${selectedVehicle?.value.id}/qrimage.png`
			window.open(link, '_blank')
		}

		const handleDecomission = (itm) => {
			useConfirmationModal().openAlert({
        title: 'Please Confirm',
		type: 'NORMAL',
        desc: 'Are you sure you want to delete this vehicle?',
		loading: processing_decommision,
		call_function: () => handleDecommisionVehicle(itm.id)
    })
		}

		const editVehicle = (data) => {
			openEditBus(data)
			useVehicleModal().openEditBus()
		}

		const exportQrCode = (data) => {
			const link = `${import.meta.env.VITE_BASE_URL}/v1/vehicles/${data.id}/qrimage.png`
			window.open(link, '_blank')
		}
</script>

<style scoped>

</style>
