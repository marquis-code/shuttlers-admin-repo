<template>
	<Modal
		modal="$atts.modal"
		:title="`Employees to exempt (${creditSystem?.applicable_employee_value?.length})`"
	>
		<form class="space-y-3 mb-2">
			<div class="flex justify-between items-center">
				<div>
					<label class="flex items-center gap-x-3 text-sm font-bold">
						<input v-model="selectAll" type="checkbox" @change="handleSelectAll">
						Select All
					</label>
				</div>
				<p v-if="selectedUsers.length" class="text-rose-500 font-medium text-sm">
					Remove selected ({{ selectedUsers.length }})
				</p>
			</div>
			<div v-if="!loading" class="card space-y-4">
				<div class="w-full">
					<input v-model="search" type="search" placeholder="search staff.." class="py-2 w-full rounded-md border px-3 outline-none">
				</div>
				<div class="h-[300px] overflow-y-auto">
					<label v-for="user in mapArray" :key="user.id" class="flex items-center gap-x-3">
						<input v-model="user.selected" :value="user.id" type="checkbox" @change="toggleSelected(user)">
						{{ user?.fname }} {{ user?.lname }}
					</label>
				</div>
			</div>
			<div v-else>
				<Skeleton height="300px" />
			</div>
			<div class="space-y-3">
				<h1 class="text-sm font-bold">
					Add List
				</h1>
				<div class="flex items-center gap-x-3">
					<InputMultiSelectUsers v-model="form.selected_employee" />
					<button class="bg-black text-white text-sm rounded-md px-3 py-2.5">
						Add
					</button>
				</div>
			</div>
			<div class="flex gap-x-6">
				<button class="text-white bg-gray-700 rounded-md text-sm w-full" @click="useCompaniesModal().closeEmployeeExemption()">
					Cancel
				</button>
				<button class="btn-primary w-full">
					<span v-if="!loading" class="flex text-sm justify-center items-center gap-2.5">
						Save changes
					</span>
					<Spinner v-else />
				</button>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useGetCreditSystem } from '@/composables/modules/corporates/creditLine'
import { useCompaniesModal } from '@/composables/core/modals'
const { getCorporatesCreditSystem, loading, creditSystem } = useGetCreditSystem()
const usersList = ref([]) as any
onMounted(() => {
	getCorporatesCreditSystem()
})
const computedUsersList = computed(() => {
	return creditSystem?.value.applicable_employee?.map((itm) => {
      return { ...itm, selected: !!selectAll.value }
	})
})

const search = ref('')

const filteredData = computed(() => {
	const searchTerm = search.value.toLowerCase()
	return creditSystem?.value.applicable_employee?.filter((itm) => {
		return (itm.fname.toLowerCase().includes(searchTerm) ||
        itm.lname.toLowerCase().includes(searchTerm))
	})
})

const mapArray = computed(() => {
	return search.value.length ? filteredData.value : computedUsersList.value
})

const form = reactive({
 selected_employee: '' as any
})
const selectAll = ref(false)
const selectedUsers = ref([])

const toggleSelected = (itm) => {
	itm.selected = !itm.selected
}

const handleSelectAll = () => {
	computedUsersList?.value?.map((itm) => {
      return { ...itm, selected: true }
	})
}

</script>
