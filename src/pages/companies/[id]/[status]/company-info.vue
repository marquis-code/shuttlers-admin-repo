<template>
	<main class="space-y-10">
		<div v-if="!loading" class="lg:flex lg:gap-x-10 justify-center items-start space-y-10 lg:space-y-0">
			<ModulesCorporatesCompanyDetails :selected-corporate="selectedCorporate" :dropdown-children="dropdownChildren" />
			<div class="lg:w-6/12 space-y-6">
				<div v-if="workBranches" class="card px-0 space-y-6">
					<div class="flex justify-between items-center px-6 border-b pb-3">
						<h1 class="font-medium">
							Work branches
						</h1>
						<button class="px-3 py-2 bg-black text-white rounded-md text-xs border border-gray-700" @click="useCompaniesModal().openAddWorkBranch()">
							Add work branches
						</button>
					</div>
					<div class="px-6">
						<ModulesCorporatesWorkBranchList :work-branches="workBranches" :loading="loadingWorkBranches" />
					</div>
				</div>
				<div v-else class="px-6 border-b py-3 rounded-md shadow-sm bg-white h-60 grid place-content-center">
					<div class="flex justify-between items-center flex-col gap-y-2">
						<p class="font-medium text-lg">
							No Work branches
						</p>
						<p class="text-xs font-medium text-gray-500">
							Add a new branch
						</p>
						<button class="px-3 py-2 bg-black text-white rounded-md text-xs border border-gray-700" @click="useCompaniesModal().openAddWorkBranch()">
							Add work branches
						</button>
					</div>
				</div>
				<div v-if="workShifts" class="card px-0 space-y-6">
					<div class="flex justify-between items-center border-b pb-3 px-6">
						<h1 class="font-medium">
							Work shifts
						</h1>
						<button class="px-3 py-2 bg-black text-white rounded-md text-xs border border-gray-700" @click="useCompaniesModal().openAddWorkShift()">
							Add work shifts
						</button>
					</div>
					<div class="px-6">
						<ModulesCorporatesWorkShiftList :loading="loadingWorkShifts" :work-shifts="workShifts" />
					</div>
				</div>
				<div v-else class="px-6 border-b py-3 rounded-md shadow-sm bg-white h-60 grid place-content-center">
					<div class="flex justify-between items-center flex-col gap-y-2">
						<p class="font-medium text-lg">
							No Work shifts
						</p>
						<p class="text-xs font-medium text-gray-500">
							Add a new work shift
						</p>
						<button class="px-3 py-2 bg-black text-white rounded-md text-xs border border-gray-700" @click="useCompaniesModal().openAddWorkShift()">
							Add work shifts
						</button>
					</div>
				</div>
			</div>
		</div>
		<Skeleton v-else height="300px" />
		<div class="space-y-3">
			<h2 class="font-bold text-gray-800">
				Business account managers
			</h2>
			<ModulesCorporatesBusinessAccountManagers />
		</div>
	</main>
</template>

<script setup lang="ts">
import { useUpdateCorporateStatus } from '@/composables/modules/corporates/updateStatus'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { useCompaniesModal } from '@/composables/core/modals'
import { useCorporateIdDetails } from '@/composables/modules/corporates/id'
import { useWorkBranches } from '@/composables/modules/corporates/workBranches'
import { useWorkShifts } from '@/composables/modules/corporates/workShifts'
const router = useRouter()
const { updateCorporateStatus, loading: processingStatusUpdate } = useUpdateCorporateStatus()
const { getCorporateById, loading, selectedCorporate } = useCorporateIdDetails()
const { fetchWorkBranches, loading: loadingWorkBranches, workBranches } = useWorkBranches()
const { fetchWorkShifts, loading: loadingWorkShifts, workShifts } = useWorkShifts()
const id = useRoute().params.id as string
getCorporateById(id)
fetchWorkBranches(id)
fetchWorkShifts(id)
definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})

const dropdownChildren = computed(() => [
	{ name: 'Update Information', func: (data) => { editCompany(data) } },
	{ name: 'Create Group', func: () => { useCompaniesModal().openCreateCorporateGroup() } },
	{ name: 'Wallet payment options', func: () => { useCompaniesModal().openCorporateWalletOptions() } },
	{ name: 'Booking Cancellation Config', func: () => { useCompaniesModal().openCorporateBookingCancellation() } },
	{ name: 'Export Manifest', func: () => { useCompaniesModal().openCorporateManifestExport() } },
	{ name: `${selectedCorporate.value.active ? 'Suspend' : 'Un-suspend'} Company`, func: (data) => updateCorporateActivityStatus(data) }
])

const updateCorporateActivityStatus = (data: any) => {
	const actionType = data.active === 1 ? 'suspend' : 'un-suspend'
    useConfirmationModal().openAlert({
        title: 'Please Confirm',
		type: 'NORMAL',
        desc: `Are you sure you want to ${actionType} this company?`,
		loading: processingStatusUpdate,
		call_function: () => updateCorporateStatus(data.id, actionType)
    })
}

const editCompany = (data) => {
	navigateTo({
        path: `/companies/${data.id}/edit`,
        query: {
            tab: 'company-information'
        }
    })
}
</script>
