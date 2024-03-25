<template>
	<main class="">
		<!-- <ButtonGoBack class="mb-6" /> -->
		<Table
			:loading="loadingRoutePrices"
			:has-index="true"
			:headers="tableFields"
			:table-data="formattedPartnersList"
			:has-options="true"
			:page="page"
		>
			<template #header>
				<TableFilter
					:filter-type="{
						showStatus: false,
						showSearchBar: false,
						showDownloadButton: true,
						showDatePicker: false,
						downloading: downloading
					}"
					:align-end="true"
					@filter="onFilterUpdate"
				>
					<template #filter_others>
						<div class="flex gap-3 py-2">
							<select v-model="routeType" class="p-2 bg-transparent border rounded-lg text-sm">
								<option value="">
									All
								</option>
								<option value="shared">
									Shared Routes
								</option>
								<option value="corporate">
									Corporate Routes
								</option>
								<option value="exclusive">
									Exclusive Routes
								</option>
							</select>
							<select v-model="vehicleId" class="p-2 bg-transparent border rounded-lg text-sm">
								<option value="">
									All
								</option>
								<option v-for="n in allVehicles" :key="n.id" :value="n.id">
									{{ n.name }}
								</option>
							</select>
							<button class="px-3 py-2 border text-sm text-dark font-medium border-dark rounded" @click="isEdit = !isEdit">
								{{ isEdit ? 'Save' : 'Edit' }}
							</button>
						</div>
					</template>
				</TableFilter>
			</template>
			<template #item="{ item }">
				<div v-if="item.fname" class="space-y-1 text-blue-600 py-2">
					<span class="block">{{ item.data.fname }} {{ item.data.lname }}</span>
					<span class="block">{{ item.data.email }}</span>
					<span class="block">{{ item.data.phone }}</span>
				</div>
				<span v-if="item.rating" class="flex items-center gap-4">
					<span>{{ item.data.rating ?? "N/A" }}</span>
				</span>
				<span v-if="item.avatar" class="flex items-center gap-4">
					<Avatar :name="item.data.fname" bg="#B1C2D9" />
				</span>
				<div v-if="item.cost_of_supply">
					<AmountTextEditor :amount="item.data.cost_of_supply" :loading="loading_cost_of_supply" @updateVal="(val) => updateRouteCostOfSupply(val, item.data)" />
				</div>
				<div v-if="item.selling_price">
					<AmountTextEditor :amount="item.data.selling_price" :loading="loading_selling_price" @updateVal="(val) => updateRouteSellingPrice(val, item.data)" />
				</div>
				<div v-if="item.pricing_scheme" class="">
					<select :value="item.data.route_itinerary.pricing_scheme" :disabled="!isEdit" class="select_style min-w-[110px]"
						@change="updateRouteOtherPricing(item.data, 'pricing_scheme', ($event.target! as any).value)"
					>
						<option value="per_vehicle">
							Per vehicle
						</option>
						<option value="per_seat">
							Per seat
						</option>
					</select>
				</div>
				<div v-if="item.pricing_type" class="">
					<select :value="item.data.route_itinerary.pricing_type" :disabled="!isEdit" class="select_style !min-w-[210px] w-full"
						@change="updateRouteOtherPricing(item.data, 'pricing_type', ($event.target! as any).value)"
					>
						<option value="route_price_table_lookup">
							Lookup From Pricing Table
						</option>
						<option value="margin_value_generated">
							Auto Generate From Margin
						</option>
					</select>
				</div>
				<div v-if="item.pricing_margin" class="flex items-center gap-2">
					<input :value="item.data.route_itinerary.pricing_margin" :disabled="!isEdit" type="number"
						class="text-sm border py-1 px-2 rounded-md !w-[100px] disabled:cursor-not-allowed"
						@change="updateRouteOtherPricing(item.data, 'pricing_margin', ($event.target! as any).value)"
					>
					<select :value="item.data.route_itinerary.pricing_margin_unit" :disabled="!isEdit" class="select_style !w-[100px]"
						@change="updateRouteOtherPricing(item.data, 'pricing_margin_unit', ($event.target! as any).value)"
					>
						<option value="percent">
							Percent
						</option>
						<option value="flat">
							Flat
						</option>
					</select>
				</div>
			</template>

			<template #footer>
				<TablePaginator
					:current-page="page"
					:total-pages="total"
					:loading="loadingRoutePrices"
					@move-to="moveTo($event)"
					@next="next"
					@prev="prev"
				/>
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import { convertToCurrency } from '@/composables/utils/formatter'
import { useRoutePricesList, useAllVehicleType } from '@/composables/modules/configure/fetch'

const {
  getRoutePricesList, loadingRoutePrices, routePricesList, moveTo, next, prev, total, page, updateRouteOtherPricing,
  vehicleId, routeType, updateRouteCostOfSupply, loading_cost_of_supply, updateRouteSellingPrice, loading_selling_price,
  downloadRoutePriceControl, downloading, onFilterUpdate
} = useRoutePricesList()
const { allVehicles, getAllVehicleWithoutLimit } = useAllVehicleType()

definePageMeta({
  layout: 'dashboard',
  middleware: ['is-authenticated']
})

const isEdit = ref(false)

const form = reactive({
  pricing_type: '',
  pricing_scheme: '',
  pricing_margin: ''
})

const formattedPartnersList = computed(() => {
  if (!routePricesList.value.length) return []
  return routePricesList.value.map((i, index) => {
    return {
		...i,
		route_code: i.route.route_code,
		route_itinerary_time: i.route_itinerary.trip_time,
		vehicle_info: `${i.vehicle?.brand} ${i.vehicle?.name} (${i.vehicle?.registration_number}) - ${i.vehicle?.type}`,
		cost_of_supply: i.cost_of_supply,
		selling_price: i.active_route_price?.fare
    }
  })
})

const tableFields = ref([
  {
    value: 'route_code',
    text: 'Route name'
  },
  {
    value: 'route_itinerary_time',
    text: 'Itinerary'
  },
  {
    value: 'vehicle_info',
    text: 'Vehicle'
  },
  {
    value: 'cost_of_supply',
    text: 'Cost of supply'
  },
  {
    value: 'selling_price',
    text: 'Selling price'
  },
  {
    value: 'pricing_scheme',
    text: 'Pricing Scheme'
  },
  {
    value: 'pricing_type',
    text: 'Pricing Type'
  },

  {
    value: 'pricing_margin',
    text: 'Pricing'
  }
])

getRoutePricesList()
getAllVehicleWithoutLimit()
</script>

<style scoped>
.select_style{
	@apply py-1 px-3 border border-dark rounded min-w-[100px] w-full outline-none disabled:cursor-not-allowed
}
</style>
