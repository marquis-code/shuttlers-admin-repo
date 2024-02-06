<template>
	<main class="space-y-4">
		<div class="flex justify-end items-end">
			<div class="flex items-center gap-x-3">
				<button class="text-xs bg-black text-white rounded-md px-3 py-2.5">
					Change group
				</button>
				<button class="text-xs bg-black text-white rounded-md px-3 py-2.5">
					Add staff
				</button>
			</div>
		</div>
		<Table
			:loading="loading"
			:headers="tableFields"
			:page="page"
			:has-index="true"
			:table-data="computedMembers"
		>
			<template #header>
				<TableFilter
					:filter-type="{ showSearchBar: true }"
					@filter="onFilterUpdate"
				/>
			</template>
			<template #item="{ item }">
				<span v-if="item.work_days">
					{{ item?.data?.work_days?.map((itm) => itm) ?? 'N/A' }}
				</span>
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
import { useCorporateGroupByGroupId } from '@/composables/modules/corporates/getCorporateGroupByGroupId'
const {
  groupMembers,
  loading,
  getCorporateGroupByGroupId,
  filterData,
  onFilterUpdate,
  next,
  prev,
  moveTo,
  page,
  total
} = useCorporateGroupByGroupId()
getCorporateGroupByGroupId()
definePageMeta({
  layout: 'dashboard',
  middleware: ['is-authenticated']
})
const computedMembers = computed(() => {
  return groupMembers?.value.map((member:any) => {
    return {
      ...member,
      name: `${member?.staff?.fname} ${member?.staff?.lname}`,
      email: member?.staff?.email ?? 'N/A',
	  home_address: member?.staff?.address?.address ?? 'N/A',
	  nearest_busstop: member?.address?.closestBusstop?.address ?? 'N/A',
	  office_branch: member?.workShift?.officeBranch?.address ?? 'N/A',
	  work_shift: member?.workShift?.corporate_work_shift?.description ?? 'N/A',
	  work_days: member?.workShift?.work_days
    }
  })
})
const tableFields = ref([
  { text: 'Name', value: 'name' },
  { text: 'Email', value: 'email' },
  { text: 'Home Address', value: 'home_address' },
  { text: 'Nearest Bus stop', value: 'nearest_busstop' },
  { text: 'Office Branch', value: 'office_branch' },
  { text: 'Work shift', value: 'work_shift' },
  { text: 'work days', value: 'work_days' }
])
</script>

<style scoped></style>
