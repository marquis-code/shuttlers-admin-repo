<template>
	<main>
		<ButtonGoBack class="mb-6" />
		<section v-if="!Object.keys(route.query).length">
			<section v-if="!loading" class="">
				<div v-if="needCreditSystem" class="flex justify-center items-center flex-col space-y-3 mt-20">
					<h1 class="font-medium text-sm">
						This company currently doesn't have any employee credit line system. Create one below
					</h1>
					<NuxtLink :to="`/companies/${id}/${status}/credit-line/create`" class="bg-gray-700 text-white px-6 text-sm py-3 rounded-md">
						Create Employee Credit System
					</NuxtLink>
				</div>
				<div v-else class="space-y-6">
					<div class="card">
						<div class="flex justify-between items-center border-b-[0.4px] pb-4">
							<h1 class="font-bold">
								Credit Line
							</h1>
							<div class="flex items-center gap-x-3">
								<button class="py-2.5 text-xs px-4 text-white bg-black rounded-md" @click="handleCreditLineEdit">
									Edit Credit System
								</button>
								<button class="py-2.5 text-xs px-4 text-white bg-black rounded-md" @click="handleCreditSystemApplication">
									Apply Credit System
								</button>
								<ButtonDropdown :children="dropdownChildren" :data="creditSystem" class="text-sm" bg-color="#000" />
							</div>
						</div>
						<div class="flex justify-between items-center border-b-[0.4px] py-6">
							<p class="text-gray-500">
								Status
							</p>
							<p class="text-white rounded-md text-sm" :class="[creditSystem.is_active === 1 ? 'bg-green-500 px-3 py-1' : 'bg-red-500 px-3 py-1 ']">
								{{ creditSystem?.is_active === 1 ? 'Active' : 'In active' }}
							</p>
						</div>
						<div class="flex justify-between items-center border-b-[0.4px] py-6">
							<p class="text-gray-500">
								Amount
							</p>
							<p>{{ creditSystem?.amount ?? 'N/A' }}</p>
						</div>
						<div class="flex justify-between items-center py-6">
							<p class="text-gray-500">
								Applicable Employees
							</p>
							<p>{{ getApplicableEmployeeNarration(creditSystem?.applicable_employee_kind) }}</p>
						</div>
						<div v-if="creditSystem?.applicable_employee_value?.length" class="flex justify-between items-center border-b-[0.4px] py-6">
							<p class="text-gray-500">
								Selected Employees
							</p>
							<div class="flex items-center gap-x-3">
								<p>{{ creditSystem?.applicable_employee_value?.length }}</p>
								<button class=" text-shuttlersGreen font-semibold text-sm" @click="useCompaniesModal().openEmployeeExemption()">
									View/Edit
								</button>
							</div>
						</div>
					</div>
					<div>
						<Table :has-index="true" :page="page" :loading="loadingExecutions" :headers="tableFields" :table-data="creditLineExecutions">
							<template #header>
								<div class="flex justify-end items-end py-3 rounded-tr-md rounded-tl-md border bg-white pr-6">
									<button class="text-sm bg-black text-white py-2.5 rounded-md px-3" @click="refreshTable">
										Refresh Executions
									</button>
								</div>
							</template>
							<template #item="{ item }">
								<span v-if="item.is_completed" class="text-white rounded-lg" :class="[item.data.is_completed === 1 ? 'bg-green-500 px-3 py-1' : 'bg-red-500 bg-yellow-600 px-3 py-1 ']">
									{{ item.data.is_completed === 1 ? 'YES' : 'SCHEDULED' }}
								</span>

								<span v-if="item.credit_amount" class="rounded-lg">
									{{ item.data.credit_amount }}
								</span>

								<span v-if="item.created_at" class="rounded-lg">
									{{ useDateFormat(item.data.created_at, 'DD MMMM YYYY, hh:mm A').value }}
								</span>

								<div v-if="item.execution_status">
									<div v-if="item.data.execution_status === null" class="space-y-3">
										<div>Scheduled for {{ useDateFormat(item.data.scheduled_for, 'DD MMMM YYYY, hh:mm A').value }} </div>
										<button class="bg-black text-white text-xs px-3 py-2 rounded-md" @click="cancelSchedule(item)">
											Cancel
										</button>
									</div>
									<div v-else>
										{{ item.data?.execution_status }}
									</div>
								</div>
							</template>

							<template #footer>
								<TablePaginator :current-page="page" :total-pages="total" :loading="loading" @move-to="moveTo($event)" @next="next" @prev="prev" />
							</template>
						</Table>
					</div>
				</div>
			</section>
			<Skeleton v-else height="300px" />
		</section>
		<section v-if="route.query.tab === 'edit'">
			<ModulesCorporatesEditCreditLine />
		</section>
		<section v-if="route.query.tab === 'fund'">
			<ModulesCorporatesFundCreditLine />
		</section>
	</main>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useCompaniesModal } from '@/composables/core/modals'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { useApplyCreditSystem, useDeleteCreditSystemSchedule } from '@/composables/modules/corporates/creditLineExecutions'
import { useGetCreditSystem } from '@/composables/modules/corporates/creditLine'
const { getCorporatesCreditSystem, loading, creditSystem, loadingExecutions, needCreditSystem, creditLineExecutions, total, page, next, prev, moveTo } = useGetCreditSystem()
const { applyCreditSystem, loading: applyingCreditSystem } = useApplyCreditSystem()
const { deleteCreditSystemSchedule, loading: deletingCreditLine } = useDeleteCreditSystemSchedule()
definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
const route = useRoute()
getCorporatesCreditSystem()
const refreshTable = () => {
	getCorporatesCreditSystem()
}
const router = useRouter()
const tableFields = ref([
	{
		text: 'IS COMPLETED',
		value: 'is_completed'
	},
	{
		text: 'CREDIT AMOUNT',
		value: 'credit_amount'
	},
	{
		text: 'EMPLOYEES PROCESSED',
		value: 'employees_processed'
	},
	{
		text: 'EMPLOYEES AFFECTED',
		value: 'employees_affected'
	},
	{
		text: 'EMPLOYEES COUNT',
		value: 'employees_count'
	},
	{
		text: 'APPLIED AT',
		value: 'created_at'
	},
	{
		text: 'ACTIONS',
		value: 'execution_status'
	}
])
const id = useRoute().params.id
const status = useRoute().params.status

const getApplicableEmployeeNarration = (kind) => {
      switch (kind) {
        case 'some':
          return 'Some Employees'

        case 'all_except':
          return 'All Employees Except'
      }
      return 'All Employees'
    }
	const handleCreditSystemApplication = () => {
		useConfirmationModal().openAlert({
        title: 'Please Confirm',
		type: 'NORMAL',
        desc: 'Are you sure you want to apply this credit to the applicable staff of this company?',
		loading: applyingCreditSystem,
		call_function: () => applyCreditSystem(creditSystem.value.id)
    })
	}
	const dropdownChildren = computed(() => [
	{ name: 'Apply to select staff', func: () => handleApplyingCreditLineToSelectedStaff() },
	{ name: 'Apply credit system later', func: () => useCompaniesModal().openScheduledCreditLine() }
])

const cancelSchedule = (item) => {
	useConfirmationModal().openAlert({
        title: 'Cancel execution',
		type: 'NORMAL',
        desc: 'Are you sure you want to cancel this credit system execution?',
		loading: deletingCreditLine,
		call_function: () => deleteCreditSystemSchedule(item.data.id)
    })
}

const handleCreditLineEdit = () => {
	navigateTo({
        path: useRoute().path,
        query: {
            tab: 'edit'
        }
    })
}

const handleApplyingCreditLineToSelectedStaff = () => {
	navigateTo({
        path: useRoute().path,
        query: {
            tab: 'fund'
        }
    })
}
</script>
