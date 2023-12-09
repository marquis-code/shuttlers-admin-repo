<template>
	<Modal
		modal="$atts.modal"
		:title="`Employees to exempt (${creditSystem?.applicable_employee_value?.length})`"
	>
		<form class="space-y-3 mb-2" @submit.prevent="saveChanges">
			<div class="flex justify-between items-center">
				<div>
					<label class="flex items-center gap-x-3 text-sm font-bold">
						<!-- <input type="checkbox" @change="handleSelectAll"> -->
						<input v-model="selectAll" type="checkbox" @change="handleSelectAll">
						Select All
					</label>
				</div>
				<p v-if="selectedUsers.length" class="text-rose-500 font-medium text-sm">
					Remove selected ({{ selectedUsers.length }})
				</p>
			</div>
			<!-- {{ computedUsersList }} -->
			<div v-if="!loading" class="card space-y-4">
				<div class="w-full">
					<input type="search" placeholder="search staff.." class="py-2 w-full rounded-md border px-3 outline-none">
				</div>
				<label v-for="user in computedUsersList" :key="user.id" class="flex items-center gap-x-3">
					<input :id="user.id" v-model="user.selected" :value="user.id" @change="toggleSelected(user)" type="checkbox" :name="user.id">
					{{ user?.fname }} {{ user?.lname }}
				</label>
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
	// if (!loading.value) {
	// 	usersList.value = creditSystem?.value.applicable_employee?.map((itm) => {
    //   return { ...itm, selected: false }
	// })
	// }
})
const computedUsersList = computed(() => {
	return creditSystem?.value.applicable_employee?.map((itm) => {
      return { ...itm, selected: false }
	})
})

const form = reactive({
 selected_employee: '' as any
})
const selectAll = ref(false)
const selectedUsers = ref([])
const saveChanges = () => {

}

const toggleSelected = (itm) => {
	itm.selected = !itm.selected
}

const handleSelectAll = () => {
	selectAll.value = !selectAll.value
	console.log(computedUsersList.value, 'vbnm,')
	console.log(selectAll.value, 'valuye gfhjkljhgjk.lkjh')
	// computedUsersList.value.forEach((item) => {
    //   item.selected = selectAll.value
    // })
	// if (selectAll.value) {
	// 	const concatenated = [].concat(...creditSystem.value.applicable_employee)
    //     selectedUsers.value = concatenated
    //   } else {
    //     selectedUsers.value = []
    //   }
}
</script>

<style>

</style>
