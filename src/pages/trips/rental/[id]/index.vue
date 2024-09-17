<template>
	<main class="flex flex-col gap-4 items-start">
		<ButtonGoBack />
		<section v-if="!loadingRental" id="section-one" class="flex gap-4 w-full">
			<ModulesTripsRentalSectionOne :rental-details="rentalDetails" />
			<section class="w-6/12 flex flex-col gap-4">
				<div v-if="!isEmptyObject(rentalDetails?.userRoute)" class="card">
					<h1 class="card-header">
						Assigned routes
					</h1>

					<div class="flex gap-3 flex-wrap">
						<nuxt-link :to="`/trips/routes/${rentalDetails.route.id}/details/`" class="badge">
							{{ rentalDetails.route.route_code }} - {{ rentalDetails.route.pickup }} - {{ rentalDetails.route.destination }}
						</nuxt-link>
					</div>
				</div>
			</section>
		</section>

		<!-- New table section -->
		<section v-if="!loadingRental && charterVehicleOrder.length" class="w-full">
			<Table :loading="loading" :headers="tableFields" :table-data="charterVehicleOrder" :has-index="true">
				<template #header>
					<div v-if="!shouldDisableTable" class="flex justify-end border border-grey8 p-4 gap-4 rounded-t-2xl">
						<button class="btn-outline border-red text-red" :disabled="shouldDisableTable" @click="rejectRental">
							Reject
						</button>
						<button class="btn-primary" :disabled="shouldDisableTable || isAcceptButtonDisabled" @click="acceptRental">
							Accept
						</button>
					</div>
				</template>
				<template #item="{ item }">
					<div v-if="item.dropoff_address">
						<RouteDescription :pickup="item.data.pickup_address" :destination="item.data.dropoff_address" />
					</div>
					<span v-if="item.charterVehicle">{{ item.data.charterVehicle?.name }}</span>
					<span v-if="item.stops">{{ JSON.parse(item.data.stops)?.length || 0 }}</span>
					<span v-if="item.margin">
						<input type="number" :value="item.data.margin || ''" placeholder="Enter amount" class="input-field" :disabled="shouldDisableTable" @input="updateMargin($event, item.data)">
					</span>
					<span v-if="item.assigned_vehicle">
						<button :disabled="shouldDisableTable" class="link" @click.prevent="updateVehicle(item.data)">
							<span v-if="!shouldDisableTable">
								{{ item.data.main_vehicle ? `${item.data.main_vehicle.brand} - ${item.data.main_vehicle.name}` : 'Click to add' }}
							</span>
							<span v-else>
								{{ item.data?.userRoute?.driver?.vehicle?.id ? `${item.data.userRoute?.driver?.vehicle?.brand} - ${item.data.userRoute?.driver?.vehicle?.name}` : 'N/A' }}
							</span>
						</button>
					</span>
					<span v-if="item.cost_of_supply">
						<input type="number" :value="item.data.cost_of_supply || item.data.cost || ''" placeholder="Enter amount" class="input-field" :disabled="shouldDisableTable" @input="updateCostOfSupply($event, item.data)">
					</span>
					<span v-if="item.actions">
						<button class="btn-outline py-2" :disabled="shouldDisableTable" @click="saveOrder(item.data)">
							Save
						</button>
					</span>
				</template>
			</Table>
		</section>

		<Skeleton v-else height="100vh" />
	</main>
</template>

<script setup lang="ts">
import { convertToCurrency } from '@/composables/utils/formatter'
import { usePageHeader } from '@/composables/utils/header'
import { useGetRentalById } from '@/composables/modules/Rentals/id'
import { isEmptyObject } from '@/composables/utils/basics'
import { useUpdateCharter } from '@/composables/modules/Rentals/update'
import { useCharterVehicleUsage } from '@/composables/modules/Rentals'
import { useRouteModal } from '@/composables/core/modals'

const id = useRoute().params.id as string

const { getRentalById, loadingRental, rentalDetails } = useGetRentalById()

const { charterVehicleOrder, updateCharterOrder, loading, charterStatus, updateVehicle, checkMainVehicleIdExists, globalRentalDetails } = useUpdateCharter()

getRentalById(id)

const shouldDisableTable = computed(() => {
	return rentalDetails.value.status !== 'pending'
})

const rejectRental = () => {
	globalRentalDetails.value = rentalDetails.value
	useRouteModal().openRejectRental()
}

const acceptRental = () => {
	charterStatus.value = 'accepted'
	updateCharterOrder(rentalDetails.value)
}

watch(rentalDetails, () => {
	charterVehicleOrder.value = []
	if (!isEmptyObject(rentalDetails.value)) {
		charterVehicleOrder.value = []
		rentalDetails.value.vehicle_orders.forEach((vehicle) => {
			charterVehicleOrder.value.push(vehicle)
		})
	}
})

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})

usePageHeader().setPageHeader({
	preTitle: 'Overview',
	title: 'Rental Details'
})

const isAcceptButtonDisabled = computed(() => {
	return charterVehicleOrder.value.some((order) => {
		return !order.margin || !order.cost_of_supply
	})
})

const tableFields = ref([
	{ text: 'ROUTES', value: 'dropoff_address' },
	{ text: 'VEHICLE TYPE', value: 'charterVehicle' },
	{ text: 'STOPS', value: 'stops' },
	{ text: 'MARGIN', value: 'margin' },
	{ text: 'ASSIGNED VEHICLE', value: 'assigned_vehicle' },
	{ text: 'COST OF SUPPLY', value: 'cost_of_supply' },
	{ text: 'ACTIONS', value: 'actions' }
])

const updateCostOfSupply = (event, order) => {
	order.cost_of_supply = event.target.value
}

const updateMargin = (event, order) => {
	order.margin = event.target.value
}

const saveOrder = (order) => {
	updateCharterOrder(rentalDetails.value)
}

</script>

<style scoped>
.badge {
	@apply rounded-md bg-[#EFF2F7] p-2
}
</style>
