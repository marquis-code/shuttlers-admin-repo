<template>
	<main>
		<section class="flex flex-col gap-4">
			<div class="flex items-stretch gap-4">
				<ButtonGoBack url="/companies" />
				<button class="bg-black text-white rounded-lg py-2 px-4 text-xs" @click="isMapView = !isMapView">
					{{ isMapView ? 'List View' :'Map View' }}
				</button>
				<div v-if="isMapView" class="flex items-center ml-4 ">
					<input id="home" v-model="markerType" type="radio" value="home" class="ml-2">
					<label for="home" class="mb-0 ml-2">Home Address</label>

					<input id="bus_stop" v-model="markerType" type="radio" value="bus_stop" class="ml-5">
					<label for="bus_stop" class="mb-0 ml-2">Closest Bus Stop</label>

					<input id="both" v-model="markerType" type="radio" value="both" class="ml-5">
					<label for="both" class="mb-0 ml-2">Both</label>

					<input id="both_with_line" v-model="markerType" type="radio" value="both_with_line" class="ml-5">
					<label for="both_with_line" class="mb-0 ml-2">Both With Lines</label>
				</div>
			</div>
			<div v-if="selectedStaffs.length" class="bg-white rounded-lg flex flex-col border overflow-hidden">
				<transition-group appear tag="div" class="p-4 flex flex-wrap gap-y-2 gap-x-2 overflow-auto max-h-[120px]"
					name="list">
					<p v-for="n, i in selectedStaffs" :key="i"
						class="border bg-[#FAFAFA] p-2 rounded-lg flex items-center gap-2 text-black text-sm font-medium">
						<span>
							{{ n.fname || '' }} {{ n.lname || '' }}
						</span>
						<icon name="closed" class="w-5 text-[#6E717C] cursor-pointer" alt="cancel"
							@click="handleStaffSelection(n)" />
					</p>
				</transition-group>
				<div class="border-t p-4 flex flex-col gap-y-2 gap-x-4 md:flex-row md:items-center md:justify-between">
					<p class="text-sm text-neut9 font-medium">
						({{ selectedStaffs.length }}) of {{ totalStaffs }}
						<span class="text-grey4"> Selected</span>
					</p>
					<div class="flex items-stretch gap-4">
						<button type="button"
							class="px-3 py-2 text-sm text-dark rounded-lg font-medium bg-[#20E682] border-green06"
							@click="useCompaniesModal().openAssignStaff()">
							Assign
						</button>
					</div>
				</div>
			</div>

			<Table v-if="!isMapView" :loading="loading" :headers="tableFields" :table-data="staffs" :checkbox="true" :selected="selectedStaffs"
				:has-index="true" :page="page" @checked="handleCheckedItems">
				<template #header>
					<TableFilter :filter-type="{ showStatus: false, showSearchBar: true, showDownloadButton: true }" @download="downloadCorporateStaffs" @filter="onFilterUpdate">
						<template #filter_others>
							<div ref="target"
								class="relative flex justify-end lg:max-w-[500px] xl:max-w-[800px] 2xl:max-w-full flex-wrap gap-y-3 gap-2 items-center">
								<div v-if="showDays.selectBox.value" class="relative">
									<button class="select_box" @click="showDrop('days')">
										<span v-if="!selectedDays.length">Select Days</span>
										<div v-else class="flex items-center gap-0 text-dark font-medium">
											<span v-for="n in selectedDays.length > 2 ? selectedDays.slice(0, 2) : selectedDays"
												:key="n">
												{{ n.slice(0, 3) }},
											</span>
											<span v-if="selectedDays.length > 2">...</span>
										</div>
										<icon name="close" class="w-5" @click="closeFilter('days')" />
									</button>
									<div v-if="showDays.dropDown.value" class="dropdown_wrapper">
										<div v-for="n in days" :key="n"
											class="px-3 py-2 flex gap-3 items-center justify-between"
											@click="handleDaysSelection(n)">
											<label :for="n" class="m-0 text-black text-sm font-medium">
												{{ n }}
											</label>
											<input :id="n" :checked="selectedDays.includes(n)" type="checkbox">
										</div>
									</div>
								</div>
								<div v-if="showShift.selectBox.value" class="relative">
									<button class="select_box" @click="showDrop('shift')">
										<span v-if="!selectedShifts.length">Select Shifts</span>
										<span v-else class="text-dark font-medium">
											{{ selectedShifts[0].description }}
										</span>
										<icon name="close" class="w-5" @click="closeFilter('shift')" />
									</button>
									<div v-if="showShift.dropDown.value" class="dropdown_wrapper">
										<div v-for="n in shifts" :key="n.id"
											class="px-3 py-2 flex gap-3 items-center justify-between"
											@click="handleShiftSelection(n)">
											<label :for="n" class="m-0 text-black text-sm font-medium whitespace-nowrap">
												{{ n.description.slice(0, -5) }}
											</label>
											<input :id="n" :checked="selectedShifts.includes(n)" type="checkbox">
										</div>
									</div>
								</div>
								<div v-if="showBranch.selectBox.value" class="relative">
									<button class="select_box" @click="showDrop('branch')">
										<!-- Select Branches -->
										<span v-if="!selectedBranches.length">Select Branches</span>
										<div v-else class="flex items-center gap-0 text-dark font-medium">
											<span
												v-for="n in selectedBranches.length > 2 ? selectedBranches.slice(0, 2) : selectedBranches"
												:key="n">
												{{ n.name.slice(0, 3) }},
											</span>
											<span v-if="selectedBranches.length > 2">...</span>
										</div>
										<icon name="close" class="w-5" @click="closeFilter('branch')" />
									</button>
									<div v-if="showBranch.dropDown.value" class="dropdown_wrapper">
										<div v-for="n in branches" :key="n.id"
											class="px-3 py-2 flex gap-3 items-center justify-between"
											@click="handleBranchSelection(n)">
											<label :for="n" class="m-0 text-black text-sm font-medium whitespace-nowrap">
												{{ n.name }}
											</label>
											<input :id="n" :checked="selectedBranches.includes(n)" type="checkbox">
										</div>
									</div>
								</div>
								<div v-if="showSearchRoute" class="w-fit h-fit relative">
									<!-- <input v-model.trim="searchedRoute" type="text" placeholder="Filter by route" class="border p-2 rounded-lg"> -->
									<RouteSelector :show-label="false" class="max-w-[250px]" @selected="routeSelected" />
									<icon name="close" class="w-5 absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer"
										@click="clearAndCloseRouteSearch()" />
								</div>
								<button
									class="text-[#364152] text-sm font-medium py-2 px-3 bg-white border rounded-lg flex items-center gap-3"
									@click="showFilters = true">
									<img src="@/assets/icons/source/filter.svg" alt="">
									Filters
								</button>
								<div v-if="showFilters"
									class="absolute flex flex-col rounded-lg bg-white border right-0 top-12 min-w-[150px] z-30">
									<button v-for="n, i in filters" :key="i"
										class="p-3 text-dark text-sm font-medium text-left hover:bg-[#F4F5F4]"
										@click="filterSelected(n)">
										{{ n }}
									</button>
								</div>
							</div>
						</template>
					</TableFilter>
				</template>
				<template #item="{ item }">
					<div v-if="item.name" class="flex flex-col gap-1 text-sm text-[#2F7DE5]">
						<NuxtLink :to="`/users/${item.data.id}/user-info`">
							<p>{{ item.data.fname }} {{ item.data.lname }}</p>
							<p>{{ item.data.email }}</p>
						</NuxtLink>
					</div>
					<p v-if="item.home" class="text-sm text-[#6E717C] min-w-[100px]">
						{{ item.data?.address?.address || 'N/A' }}
					</p>
					<p v-if="item.busstop" class="text-sm text-[#6E717C] min-w-[100px]">
						{{ item.data?.address?.closestBusstop?.address || 'N/A' }}
					</p>
					<p v-if="item.branch" class="text-sm text-[#6E717C] min-w-[100px]">
						{{ item.data?.workShift?.officeBranch?.address || 'N/A' }}
					</p>
					<p v-if="item.shift" class="text-[#101211] text-sm whitespace-nowrap">
						{{ convertTime(item.data?.workShift?.corporate_work_shift?.start_time) }} - {{
							convertTime(item.data?.workShift?.corporate_work_shift?.end_time) }}
					</p>
					<div v-if="item.days" class="flex flex-wrap gap-1 min-w-[120px]">
						<p v-for="n, i in item.data?.workShift?.work_days || []" :key="i"
							class="text-xs text-dark font-medium p-1 bg-[#F4F5F4] rounded">
							{{ n.slice(0, 3) }}
						</p>
					</div>
					<p v-if="item.balance" class="text-[#101211] text-sm">
						₦{{ item.data?.wallet?.credit_amount || '0' }}
					</p>
					<p v-if="item.routes" class="text-[#101211] text-sm flex items-center gap-x-4">
						<img v-if="item.data?.preferredRoutes?.length" src="@/assets/icons/source/eye-close.svg" class="cursor-pointer h-6 w-6" alt="eye close"
							@click="viewRouteList(item.data)">
						{{ item.data?.preferredRoutes?.length || '0' }}
						<img src="@/assets/icons/source/green-add.svg" class="cursor-pointer" alt="add"
							@click="addRoute(item.data)">
					</p>
				</template>
				<template #footer>
					<TablePaginator :current-page="page" :total-pages="total" :loading="loading" @move-to="moveTo($event)"
						@next="next" @prev="prev" />
				</template>
			</Table>

			<MapDisplay v-else height="540px" map-id="DEMO_ID" />
		</section>
	</main>
</template>

<script setup lang="ts">
import moment from 'moment'
import { onClickOutside } from '@vueuse/core'
import { useAssignStaffToRoute } from '@/composables/modules/staffs/assignStaffToRoute'
import { useCorporateStaff, useSelectedStaff } from '@/composables/modules/corporates/staff/index'
import { useCorporateBranches } from '@/composables/modules/corporates/branch'
import { useCorporateWorkShifts } from '@/composables/modules/corporates/shift'
import { useCompaniesModal } from '@/composables/core/modals'

const { selectedStaffToAssign, selectedStaffPreferredRoutes } = useAssignStaffToRoute()

const { loading, staffs, getCorporateStaff, prev, next, total, page, moveTo, onFilterUpdate, totalStaffs, downloadCorporateStaffs, isMapView, markerType } = useCorporateStaff()
const { handleStaffSelection, selectedStaffs, selectedDays, selectedBranches, selectedShifts, handleBranchSelection, handleDaysSelection, handleShiftSelection, selectedRoute, routeSelected } = useSelectedStaff()
const { loading: loading_branches, getBranches, branches } = useCorporateBranches()
const { loading: loading_shifts, getShifts, shifts } = useCorporateWorkShifts()
definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})

const target = ref(null)
const showFilters = ref(false)
const showSearchRoute = ref(false)
const showShift = {
	selectBox: ref(false),
	dropDown: ref(false)
}
const showBranch = {
	selectBox: ref(false),
	dropDown: ref(false)
}
const showDays = {
	selectBox: ref(false),
	dropDown: ref(false)
}
const tableFields = ref([
	{ text: 'First name', value: 'fname' },
	{ text: 'Last name', value: 'lname' },
	{ text: 'email', value: 'email' },
	{ text: 'Phone', value: 'phone' },
	{ text: 'Home address', value: 'home' },
	{ text: 'Nearest Bus stop', value: 'busstop' },
	{ text: 'Office Branch', value: 'branch' },
	{ text: 'Work shift', value: 'shift' },
	{ text: 'work days', value: 'days' },
	{ text: 'Credit balance', value: 'balance' },
	{ text: 'Preferred routes', value: 'routes' }
])
// const filters = ['Route', 'Itinerary', 'Office branches', 'Work days', 'Work shifts']
const filters = ['Route', 'Office branches', 'Work days', 'Work shifts']
const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

const convertTime = (time: string) => {
	if (!time || !time.length) return 'N/A'
	return moment(time, 'HH:mm:ss').format('h:mm A')
}

const closeAllDropDown = () => {
	showShift.dropDown.value = false
	showBranch.dropDown.value = false
	showDays.dropDown.value = false
	showFilters.value = false
}

const filterSelected = (n: string) => {
	closeAllDropDown()
	if (n === 'Route') showSearchRoute.value = true
	if (n === 'Office branches') showBranch.selectBox.value = true
	if (n === 'Work days') showDays.selectBox.value = true
	if (n === 'Work shifts') showShift.selectBox.value = true
}

const showDrop = (n: 'days' | 'shift' | 'branch') => {
	closeAllDropDown()
	if (n === 'days') showDays.dropDown.value = true
	if (n === 'shift') showShift.dropDown.value = true
	if (n === 'branch') showBranch.dropDown.value = true
}

const closeFilter = (n: 'days' | 'shift' | 'branch') => {
	if (n === 'days') showDays.selectBox.value = false; selectedDays.value = []
	if (n === 'shift') showShift.selectBox.value = false; selectedShifts.value = []
	if (n === 'branch') showBranch.selectBox.value = false; selectedBranches.value = []
}

const clearAndCloseRouteSearch = () => {
	selectedRoute.value = {}
	showSearchRoute.value = false
}

const handleCheckedItems = (val:Record<string, any>) => {
	if (!selectedStaffs.value.map((el) => el?.id).includes(val?.id)) {
		selectedStaffs.value.push(val)
	} else {
		const index = selectedStaffs.value.map((el) => el?.id).indexOf(val?.id)
		selectedStaffs.value.splice(index, 1)
	}
}

onClickOutside(target, () => closeAllDropDown())
selectedStaffs.value = []
getCorporateStaff()
getBranches(Number(useRoute().params.id))
getShifts(Number(useRoute().params.id))

const viewRouteList = (item:any) => {
	selectedStaffPreferredRoutes.value = item.preferredRoutes
	useCompaniesModal().openViewStaffRoutesList()
}
const addRoute = (item:any) => {
	selectedStaffToAssign.value = item
	useCompaniesModal().openAssignStaffToRoute()
}
</script>

<style scoped>.select_box {
	@apply text-grey6 text-sm py-2 px-3 h-full bg-white border rounded-lg flex items-center gap-3 min-w-[100px] justify-between
}

.dropdown_wrapper {
	@apply absolute flex flex-col rounded-lg bg-white border right-0 top-12 min-w-[150px] z-30
}</style>
