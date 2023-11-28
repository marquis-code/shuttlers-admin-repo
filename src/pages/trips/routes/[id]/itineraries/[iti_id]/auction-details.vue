<template>
	<main class="flex flex-col gap-6">
		<div class="flex flex-col lg:flex-row items-start lg:justify-between gap-y-5 gap-x-7">
			<div class="flex flex-col gap-4 lg:flex-grow">
				<button class="btn bg-transparent text-dark border border-dark shrink-0 w-fit py-2 px-4" @click="$router.go(-1)">
					Go back
				</button>
				<div class="flex flex-col gap-2 pb-2 border-b">
					<p class="head">
						Route Itinerary auction
					</p>
					<p class="sub">
						This shows information about the ongoing auction as vehicle partners bid for the route itinerary.
					</p>
				</div>
				<div class="flex flex-col gap-4">
					<p class="text-xs font-medium text-[#09090F]">
						Current winning bid
					</p>
					<div class="flex flex-col md:flex-row md:items-center gap-5 justify-between">
						<p class="text-sm text-[#6E717C]">
							The winning bid will be automatically allocated to the route once the auction duration has elapsed.
						</p>
						<button class="bg-dark whitespace-nowrap rounded px-3 py-2 text-sm text-white border-none w-fit disabled:bg-[#ACAFAE]"
							@click="useDriverModal().openAssignDriver()"
						>
							Assign to route
						</button>
					</div>
					<div v-if="false" class="rounded bg-white border p-4 md:p-6 flex gap-4 flex-wrap items-center justify-between">
						<p class="text-sm text-[#101211] font-medium">
							Samuel Olubi
						</p>
						<div class="flex flex-col gap-[4px]">
							<p class="text-sm font-medium text-[#6E717C]">
								Daniel Yusuf
							</p>
							<p class="text-sm font-medium text-[#6E717C]">
								Daniel Yusuf
							</p>
						</div>
						<p class="text-sm font-medium text-[#101211]">
							₦20,500
						</p>
						<div class="flex flex-col gap-[4px] text-right">
							<p class="text-xs font-medium text-[#6E717C]">
								11:00 am
							</p>
							<p class="text-xs font-medium text-[#6E717C]">
								11-11-2023
							</p>
						</div>
					</div>
					<div v-else class="rounded bg-white px-4 flex flex-col">
						<div v-for="n in 2" :key="n" class="w-full flex items-center gap-3 py-4 border-b">
							<input type="checkbox" class="shrink-0">
							<div class="flex flex-grow flex-wrap items-center justify-between gap-4">
								<p class="text-sm text-[#101211] font-medium">
									Samuel Olubi
								</p>
								<div class="flex flex-col gap-[4px]">
									<p class="text-sm font-medium text-[#6E717C]">
										Daniel Yusuf
									</p>
									<p class="text-sm font-medium text-[#6E717C]">
										Daniel Yusuf
									</p>
								</div>
								<p class="text-sm font-medium text-[#101211]">
									₦20,500
								</p>
								<div class="flex flex-col gap-[4px] text-right">
									<p class="text-xs font-medium text-[#6E717C]">
										11:00 am
									</p>
									<p class="text-xs font-medium text-[#6E717C]">
										11-11-2023
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="bg-white border rounded-lg p-4 flex flex-col gap-6 w-full max-w-[400px] lg:w-[400px] lg:shrink-0">
				<h3 class="text-lg font-bold text-[#444854]">
					Auction Information
				</h3>
				<div class="border" />
				<div class="flex items-center gap-4 justify-between">
					<p class="text-sm font-semibold text-[#101211]">
						Preferred Vehicle
					</p>
					<p class="text-[13px] font-medium text-[#313533]">
						Toyota Coaster 2022 (24 Seaters)
					</p>
				</div>
				<div class="flex items-center gap-4 justify-between">
					<p class="text-sm font-semibold text-[#101211]">
						Trip Start Date
					</p>
					<p class="text-[13px] font-medium text-[#313533]">
						Wed Oct 29 2023 - 11: 00AM
					</p>
				</div>
				<div class="flex items-center gap-4 justify-between">
					<p class="text-sm font-semibold text-[#101211]">
						Started at
					</p>
					<p class="text-[13px] font-medium text-[#313533]">
						Wed Oct 29 2023 - 11: 00AM
					</p>
				</div>
				<div class="flex items-center gap-4 justify-between">
					<p class="text-sm font-semibold text-[#101211]">
						Auction Duration
					</p>
					<div class="flex items-center justify-end gap-2">
						<p class="bg-[#EFF2F7] text-[#313533] font-medium rounded text-xs px-2 py-1">
							4 hours
						</p>
						<p class="text-base font-bold text-[#4848ED]">
							03h:23m left
						</p>
					</div>
				</div>
			</div>
		</div>

		<div>
			<Table
				:loading="false"
				:has-index="true"
				:headers="tableFields"
				:table-data="data"
				:page="page"
			>
				<template #header>
					<TableFilter
						:filter-type="{
							showStatus: false,
							showSearchBar: true,
							showDownloadButton: false,
							showDatePicker: false,
						}"
						@filter="onFilterUpdate"
					>
						<template #filter_others>
							<div class="flex items-center gap-3">
								<div class="flex items-center gap-2">
									<label class="whitespace-nowrap">Sort by:</label>
									<select class="border rounded p-3">
										<option value="bidding_time">
											Bidding time
										</option>
										<option value="low_to_high">
											Lowest to highest
										</option>
										<option value="low_to_high">
											Highest to lowest
										</option>
									</select>
								</div>
								<button class="bg-dark whitespace-nowrap rounded px-3 py-2 text-sm text-white border-none w-fit flex items-center gap-2">
									<img src="@/assets/icons/source/refresh.svg" alt="">
									Refresh
								</button>
							</div>
						</template>
					</TableFilter>
				</template>
				<template #item="{ item }">
					<!-- <p v-if="item.type" class="text-sm text-[#737876] whitespace-nowrap">
					</p> -->
					<span v-if="item.action">
						<ButtonIconDropdown :children="dropdownChildren" :data="item.data" class-name="w-40" />
					</span>
				</template>

				<!-- <template #footer>
					<TablePaginator
						:current-page="page"
						:total-pages="total"
						:loading="loading"
						@move-to="moveTo($event)"
						@next="next"
						@prev="prev"
					/>
				</template> -->
			</Table>
		</div>
	</main>
</template>
<script setup lang="ts">
import { useDriverModal } from '@/composables/core/modals'

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const page = ref(1)
const tableFields = ref([
	{ value: 'partner', text: 'Vehicle Partners' },
	{ value: 'vehicle', text: 'Vehicle Type' },
	{ value: 'seats', text: 'No of seats' },
	{ value: 'driver', text: 'Assigned driver' },
	{ value: 'cost_of_supply', text: 'Cost of supply' },
	{ value: 'time', text: 'Time' },
	{ value: 'action', text: 'Action' }
])

const dropdownChildren = computed(() => [
	{ name: 'Assign to route', func: (data:any) => { alert(data.id) } },
	{ name: 'Set as winning bid', func: (data:any) => { alert(data) } }
])

const data = ref([
	{
		id: 1,
		name: 'Abubakri Sherif',
		type: 'Ferrari',
		seat: 4,
		driver: 'Driver name',
		cost: 500,
		time: '11:00 AM'
	},
	{
		id: 1,
		name: 'Abubakri Sherif',
		type: 'Ferrari',
		seat: 4,
		driver: 'Driver name',
		cost: 500,
		time: '11:00 AM'
	}
])
const search = ref('')

const onFilterUpdate = () => {
	search.value = ''
}
</script>

<style scoped>
span,p,h1,h2,h3,h4,h5,h6,label {
	margin: 0 !important;
}
.head{
	font-size: 14px;
	color: #444854;
	font-weight: 500;
}

.sub{
	font-size: 12px;
	color: #6E717C;
	font-weight: 500;
}

.head_box{
	display: flex;
	flex-direction: column;
	gap: 4px;
}
</style>
