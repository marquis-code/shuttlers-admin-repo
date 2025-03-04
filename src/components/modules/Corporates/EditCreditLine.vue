<template>
	<ButtonGoBack class="mb-6" />
	<main>
		<div v-if="!loading" class="card p-0 max-w-3xl">
			<div class=" border-b px-6 py-3 space-y-3">
				<h1 class="font-bold">
					Update employee credit line
				</h1>
				<p class="text-sm text-gray-700">
					Credit line allows employers make available a maximum amount of money that there employee can spend on transport within a month
				</p>
			</div>

			<div class="flex flex-col gap-4 px-6 py-6">
				<div class=" space-y-6">
					<div class="field relative">
						<label for="First">How much credit line do you want to give each employee?</label>
						<input id="First" v-model="creditSystem.amount" type="number" class="input-field" required>
					</div>

					<div class="field relative">
						<label for="exployeesToInclude">Which employees do you want to apply the credit to?</label>
						<select id="exployeesToInclude" v-model="creditSystem.applicable_employee_kind" class="input-field py-3">
							<option v-for="(itm, idx) in reasonForCreditLine" :key="idx" :value="itm.value">
								{{ itm.name }}
							</option>
						</select>
					</div>
					<div v-if="creditSystem?.applicable_employee_value?.length" class="field relative">
						<label for="Last">Select the Employees to exempt</label>
						<div class="flex items-center gap-x-3">
							<p>{{ creditSystem?.applicable_employee_value?.length }}</p>
							<button class=" text-shuttlersGreen font-semibold text-sm" @click="useCompaniesModal().openEmployeeExemption()">
								View/Edit
							</button>
						</div>
					</div>
					<div>
						<label for="applyCreditLineOption" class="text-sm">
							<input id="applyCreditLineOption" v-model="is_automatic" type="checkbox">
							Apply credit line to staff immediately
						</label>
					</div>
				</div>
				<div class="flex items-end gap-x-4 justify-end">
					<div>
						<button type="submit" class="btn-primary ml-auto mt-12" @click="handleUpdateUsersList">
							<span v-if="!updatingApplicableEmployee">Update User List</span>
							<Spinner v-else />
						</button>
					</div>
					<div>
						<button type="submit" class="bg-white py-3 px-6 rounded-md ml-auto mt-12 text-rose-600 border-2 border-rose-600" :disabled="createLoading" @click="handleCreditLineUpdate">
							<span v-if="!createLoading" class="">Update Credit Line</span>
							<Spinner v-else />
						</button>
					</div>
				</div>
			</div>
		</div>
		<div v-else>
			<Skeleton height="600px" width="800px" />
		</div>
	</main>
</template>

<script lang="ts" setup>
import { useEditCreditSystem } from '@/composables/modules/corporates/editCreditLine'
import { useUpdateApplicableEmployee } from '@/composables/modules/corporates/updateApplicableEmployee'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { useCompaniesModal } from '@/composables/core/modals'
import { useGetCreditSystem } from '@/composables/modules/corporates/creditLine'
const { getCorporatesCreditSystem, creditSystem, loading } = useGetCreditSystem()
const { populateEmployeeList, loading: updatingApplicableEmployee, updateApplicableEmployee } = useUpdateApplicableEmployee()
const { editCorporatesCreditSystem, creditSystemForm, loading: updating, populateCreditSystemForm } = useEditCreditSystem()
definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})
onMounted(() => {
	getCorporatesCreditSystem()
})
const form = reactive({
    amount: '',
    applyCreditLineImmediatly: true,
    option: '',
    employee: ''
})

const is_automatic = computed(() => {
	return creditSystem.value.is_automatic !== 0
})

const employeeList = ref([])
const createLoading = ref(false)
const reasonForCreditLine = ref([
    {
        name: 'All Employees',
        value: 'all_employees'
    },
    {
        name: 'All Employees except some',
        value: 'all_except'
    },
    {
        name: 'Only some select employees',
        value: 'some'
    }
])

const createCreditLine = () => {}

const handleCreditLineUpdate = () => {
	useConfirmationModal().openAlert({
        title: 'Please Confirm',
		type: 'NORMAL',
        desc: 'Are you sure you want to update this credit line to the applicable staff of this company?',
		loading: updating,
		call_function: () => handleCreditSystemUpdate()
    })
}

const showEmployeeList = computed(() => {
    return !!(form.option === 'all_employees_except_some' || form.option === 'only_some_select_employees')
})

const handleCreditSystemUpdate = () => {
	const payload = {
		applicable_employee_kind: creditSystem.value.applicable_employee_kind,
    is_automatic: creditSystem.value.is_automatic,
    amount: creditSystem.value.amount,
    applicable_employee_value: creditSystem?.value.applicable_employee_value
	}
	populateCreditSystemForm(payload)
	editCorporatesCreditSystem(creditSystem.value.id)
}
const handleUpdateUsersList = () => {
	const payload = {
		applicable_employee_value: creditSystem?.value.applicable_employee_value
	}
	populateEmployeeList(payload)
	updateApplicableEmployee(creditSystem.value.id)
}
</script>
