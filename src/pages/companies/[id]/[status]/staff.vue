<template>
	<main class="flex flex-col gap-4">
		<div class="flex items-stretch gap-4">
			<button class="bg-[#EFF2F7] rounded-lg py-2 px-4 text-center text-sm text-[#444854] font-medium min-w-[100px]">
				Go back
			</button>
			<button class="bg-black text-white rounded-lg py-2 px-4 text-sm">
				Map view
			</button>
		</div>
		<div v-if="selectedStaffs.length" class="bg-white rounded-lg flex flex-col border overflow-hidden">
			<transition-group
				appear
				tag="div"
				class="p-4 flex flex-wrap gap-y-2 gap-x-2 overflow-auto max-h-[120px]"
				name="list"
			>
				<p v-for="n,i in selectedStaffs" :key="i" class="border bg-[#FAFAFA] p-2 rounded-lg flex items-center gap-2 text-black text-sm font-medium">
					<span>
						{{ n.fname || '' }} {{ n.lname || '' }}
					</span>
					<icon name="closed" class="w-5 text-[#6E717C] cursor-pointer" alt="cancel" @click="handleStaffSelection(n)" />
				</p>
			</transition-group>
			<div class="border-t p-4 flex flex-col gap-y-2 gap-x-4 md:flex-row md:items-center md:justify-between">
				<p class="text-sm text-neut9 font-medium">
					({{selectedStaffs.length}}) of {{ totalStaffs }}
					<span class="text-grey4"> Selected</span>
				</p>
				<div class="flex items-stretch gap-4">
					<div class="border rounded-lg overflow-hidden flex items-center">
						<p class="bg-grey8 text-grey4 text-sm font-medium p-3 h-full whitespace-nowrap border-r">
							Assign staff(s) to:
						</p>
						<select class="w-full outline-none pr-8 pl-2 bg-transparent">
							<option value="route_and_itinerary" class="text-dark">
								Route and Itinerary
							</option>
						</select>
					</div>
					<button class="px-3 text-sm text-dark rounded-lg font-medium bg-[#20E682] border-green06">
						Assign
					</button>
				</div>
			</div>
		</div>
		<Table :loading="loading" :headers="tableFields" :table-data="staffs" :checkbox="true" :selected="selectedStaffs" :has-index="true"
			@checked="selectedStaffs = ($event)"
		>
			<template #header>
				<TableFilter :filter-type="{showStatus:false, showSearchBar:true}" @filter="onFilterUpdate">
					<template #filter_others>
						<div ref="target" class="relative">
							<button class="text-[#364152] text-sm font-medium py-2 px-3 bg-white border rounded-lg flex items-center gap-3" @click="showFilters = true">
								<img src="@/assets/icons/source/filter.svg" alt="">
								Filters
							</button>
							<div v-if="showFilters" class="absolute flex flex-col rounded-lg bg-white border right-0 top-12 min-w-[150px] z-30">
								<button v-for="n,i in filters" :key="i" class="p-3 text-dark text-sm font-medium text-left hover:bg-[#F4F5F4]">
									{{ n }}
								</button>
							</div>
						</div>
					</template>
				</TableFilter>
			</template>
			<template #item="{ item }">
				<div v-if="item.name" class="flex flex-col gap-1 text-sm text-[#2F7DE5]">
					<p>{{ item.data.fname }} {{ item.data.lname }}</p>
					<p>{{ item.data.email }}</p>
				</div>
				<p v-if="item.home" class="text-sm text-[#6E717C]">
					{{ item.data?.address?.address || 'N/A' }}
				</p>
				<p v-if="item.busstop" class="text-sm text-[#6E717C]">
					{{ item.data?.address?.closestBusstop?.address || 'N/A' }}
				</p>
				<p v-if="item.branch" class="text-sm text-[#6E717C]">
					{{ item.data?.workShift?.officeBranch?.address || 'N/A' }}
				</p>
				<p v-if="item.shift" class="text-[#101211] text-sm whitespace-nowrap">
					{{ convertTime(item.data?.workShift?.corporate_work_shift?.start_time) }} - {{ convertTime(item.data?.workShift?.corporate_work_shift?.ends_time) }}
				</p>
				<div v-if="item.days" class="flex flex-wrap gap-1">
					<p v-for="n,i in item.data?.workShift?.work_days || []" :key="i" class="text-xs text-dark font-medium p-1 bg-[#F4F5F4] rounded">
						{{ n.slice(0,3) }}
					</p>
				</div>
				<p v-if="item.balance" class="text-[#101211] text-sm">
					₦{{ item.data?.wallet?.credit_amount || '0' }}
				</p>
				<p v-if="item.routes" class="text-[#101211] text-sm">
					{{ 'N/A' }}
				</p>
				<!-- <span v-if="item.action">
					<ButtonIconDropdown :children="dropdownChildren" :data="item.data" class-name="w-40" />
				</span> -->
			</template>
			<template #footer>
				<TablePaginator
					:current-page="page"
					:total-pages="total"
					:loading="loading"
					@move-to="moveTo($event)"
					@next="next"
					@prev="prev"
				/>
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import moment from 'moment'
import { useDateFormat, onClickOutside } from '@vueuse/core'
import { useCorporateStaff, useSelectedStaff } from '@/composables/modules/corporates/staff/index'

const { loading, staffs, getCorporateStaff, prev, next, total, page, moveTo, onFilterUpdate, totalStaffs } = useCorporateStaff()
const { handleStaffSelection, selectedStaffIds, selectedStaffs } = useSelectedStaff()

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
const target = ref(null)
const showFilters = ref(false)
const tableFields = ref([
    { text: 'Name', value: 'name' },
	{ text: 'Home address', value: 'home' },
	{ text: 'Nearest Bus stop', value: 'busstop' },
	{ text: 'Office Branch', value: 'branch' },
	{ text: 'Work shift', value: 'shift' },
	{ text: 'work days', value: 'days' },
	{ text: 'Credit balance', value: 'balance' },
	{ text: 'Preferred routes', value: 'routes' }
	// { text: '', value: 'action' }
])
const filters = ['Route', 'Itinerary', 'Office branches', 'Work days', 'Work shifts']

onClickOutside(target, () => showFilters.value = false)
const convertTime = (time:string) => {
	if (!time || !time.length) return 'N/A'
	return moment(time, 'HH:mm:ss').format('h:mm A')
}

selectedStaffs.value = []
getCorporateStaff()
</script>

<style scoped></style>
