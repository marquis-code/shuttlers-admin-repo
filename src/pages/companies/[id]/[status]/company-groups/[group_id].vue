<template>
	<main class="space-y-4">
		<div class="flex justify-end items-end">
			<div class="flex items-center gap-x-3">
				<button class="text-xs bg-black text-white rounded-md px-3 py-2.5" @click="handleChangeGroup">
					Change group
				</button>
				<button class="text-xs bg-black text-white rounded-md px-3 py-2.5" @click="handleAddStaff">
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
			class="cursor-pointer"
		>
			<template #header>
				<TableFilter
					:filter-type="{ showSearchBar: true }"
					@filter="onFilterUpdate"
				/>
			</template>
			<template #item="{ item }">
				<div v-if="item.work_days">
					<div v-if="item?.data?.work_days" class="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-3 w-full">
						<p v-for="itm in item?.data?.work_days" :key="itm" class="text-[10px] w-full font-semibold flex justify-center items-center bg-gray-200 text-gray-800 py-1 px-3 rounded-md">
							{{ itm }}
						</p>
					</div>
					<div v-else>
						N/A
					</div>
				</div>
				<div v-if="item.id">
					<button class="" @click="deleteMember(item.data)">
						<img src="@/assets/icons/source/red-trash.svg" alt="red trash">
					</button>
				</div>
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
import { useCompaniesModal } from '@/composables/core/modals'
import { useCorporateGroupByGroupId } from '@/composables/modules/corporates/getCorporateGroupByGroupId'
const {
	handleChangeGroup,
	handleDelete,
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
  { text: 'work days', value: 'work_days' },
  { text: 'Action', value: 'id' }
])

const handleAddStaff = () => {
	useCompaniesModal().openBatchAddCorporateGroupMembers()
}

const deleteMember = (item: any) => {
	handleDelete(item).then(() => {
		getCorporateGroupByGroupId()
	})
}
</script>

<style scoped></style>
