<template>
	<div class="bg-light flex flex-col gap-2 rounded-lg">
		<Table
			:loading="loading_drivers"
			:has-index="true"
			:headers="tableFields"
			:table-data="itineraryDrivers"
			:page="page"
		>
			<template #header>
				<div class="flex flex-col gap-y-2 gap-x-4 md:flex-row md:items-center md:justify-between border border-b-0 p-3 rounded-tl-lg  rounded-tr-lg">
					<h3 class="text-base font-medium text-neut9">
						Associated Drivers & Vehicles
					</h3>
					<div class="flex items-center gap-2">
						<router-link class="border border-dark p-2 text-dark text-sm rounded-lg" :to="`/trips/routes/${$route.params.id}/itineraries/${$route.params.iti_id}/new-auction`">
							Auction route itinerary
						</router-link>
						<button class="p-2 rounded-lg bg-dark text-white" @click="useDriverModal().openAddDriver()">
							Add driver
						</button>
					</div>
				</div>
			</template>
			<template #item="{ item }">
				<p v-if="item.driver">
					{{ item.data.driver?.fname || '' }} {{ item.data.driver?.lname || '' }} - {{ item.data.driver?.phone }}
				</p>
				<p v-if="item.vehicle" class="min-w-[150px]">
					{{ item.data.vehicle?.seats }} seater - {{ item.data.vehicle?.name }} ({{ item.data.vehicle?.registration_number }})
				</p>
				<p v-if="item.cost_of_supply" class="whitespace-nowrap">
					NGN {{ item.data?.cost_of_supply || 'N/A' }}
				</p>
				<p v-if="item.utilization" class="whitespace-nowrap">
					{{ item.data?.break_even_utilization ? item.data.break_even_utilization * 100 : 0 }}%
				</p>
				<p v-if="item.margin" class="whitespace-nowrap">
					{{ item.data?.pricing_margin }} {{ item.data?.pricing_margin_unit }}
				</p>
				<p v-if="item.fare" class="whitespace-nowrap">
					{{ item.data?.max_fare ? `NGN ${item.data?.max_fare}` : 'N/A' }}
				</p>
				<span v-if="item.action">
					<ButtonIconDropdown :children="dropdownChildren" :data="item.data" class-name="w-40" />
				</span>
			</template>
		</Table>
		<div class="p-2 flex flex-col gap-3">
			<div class="p-4 bg-[#FAFAFA] rounded border flex flex-col gap-2">
				<h3 class="text-sm font-medium text-[#101211] pb-3 border-bottom">
					Auctions
				</h3>
				<div class="w-full overflow-auto">
					<div class="min-w-[500px] flex flex-col gap-3">
						<div class="w-full grid grid-cols-5 gap-4">
							<p class="text-xs font-medium text-[#6E717C]">
								Preferred vehicle
							</p>
							<p class="text-xs font-medium text-[#6E717C]">
								Trip start time
							</p>
							<p class="text-xs font-medium text-[#6E717C]">
								Auction start time
							</p>
							<p class="text-xs font-medium text-[#6E717C]">
								Status
							</p>
							<p class="text-xs font-medium text-[#6E717C]">
								Bids
							</p>
						</div>

						<div class="w-full grid grid-cols-5 gap-4 items-start">
							<div class="flex flex-col gap-1">
								<p class="text-[13px] text-[#313533] font-medium">
									Toyota Sedan 2022
								</p>
								<p class="text-[13px] text-[#313533] font-medium">
									(24 seats)
								</p>
							</div>
							<p class="text-[13px] text-[#313533] font-medium">
								Wed Oct 29 2023
							</p>
							<div class="flex flex-col gap-1">
								<p class="text-[13px] text-[#313533] font-medium">
									11:00 AM
								</p>
								<p class="text-[13px] text-[#313533] font-medium">
									Wed Oct 29 2023
								</p>
							</div>
							<p class="text-xs bg-[#FFFCEB] !border !border-[#FFDF18] rounded p-2 w-fit text-[#313533] font-medium">
								Pending
							</p>
							<button class="text-sm font-bold text-[#313533] w-fit bg-transparent border-none">
								...
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useItineraries, useItineraryDrivers } from '@/composables/modules/routes/itineraries'
import { useAddDriver, useDeleteDriverFromItinerary, useTransferBooking } from '@/composables/modules/routes/itineraries/driver'
import { useDriverModal } from '@/composables/core/modals'

const { singleItinerary: itinerary } = useItineraries()
const { loading: loading_drivers, getItineraryDrivers, page, total, moveTo, next, prev, itineraryDrivers } = useItineraryDrivers()
const { initEdit } = useAddDriver()
const { initDelete } = useDeleteDriverFromItinerary()
const { initTransfer } = useTransferBooking()

const tableFields = computed(() => {
	if (itinerary.value.pricing_type === 'route_price_table_lookup') {
		return [
			{ value: 'driver', text: 'Driver' },
			{ value: 'vehicle', text: 'Vehicle' },
			{ value: 'cost_of_supply', text: 'Cost of supply' },
			// { value: 'utilization', text: 'Utilization' },
			// { value: 'margin', text: 'Margin' },
			// { value: 'fare', text: 'Fare' },
			{ value: 'action', text: 'Action' }
		]
	} else {
		return [
			{ value: 'driver', text: 'Driver' },
			{ value: 'vehicle', text: 'Vehicle' },
			{ value: 'cost_of_supply', text: 'Cost of supply' },
			{ value: 'utilization', text: 'Utilization' },
			{ value: 'margin', text: 'Margin' },
			{ value: 'fare', text: 'Fare' },
			{ value: 'action', text: 'Action' }
		]
	}
})

const dropdownChildren = computed(() => [
	{ name: 'Update', func: (data:any) => { initEdit(data) } },
	{ name: 'Transer booking', func: (data:any) => { initTransfer(data, itineraryDrivers.value) } },
	{ name: 'Remove', func: (data:any) => initDelete(data.driver?.id), class: '!text-red' }
])

getItineraryDrivers()
</script>
