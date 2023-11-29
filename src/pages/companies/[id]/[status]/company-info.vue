<template>
	<main class="space-y-10">
		<div v-if="!loading" class="lg:flex lg:gap-x-10 justify-center items-start space-y-10 lg:space-y-0">
			<div class="w-6/12 bg-white rounded-md shadow-sm p-3">
				<div class="flex justify-between items-center py-2.5 border-b pb-2 px-3">
					<div class="font-medium">
						Company Information
					</div>
					<ButtonDropdown :children="dropdownChildren" :data="selectedCorporate" />
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						COMPANY NAME
					</p>
					<p class="text-sm">
						{{ selectedCorporate?.corporate_name ?? 'N/A' }}
					</p>
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						PHONE NUMBER
					</p>
					<p class="text-sm">
						{{ selectedCorporate?.corporate_phone ?? 'N/A' }}
					</p>
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						EMAIL ADDRESS
					</p>
					<p class="text-sm">
						{{ selectedCorporate?.email ?? 'N/A' }}
					</p>
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						OFFICE ADDRESS
					</p>
					<p class="text-sm">
						{{ selectedCorporate?.corporate_address ?? 'N/A' }}
					</p>
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						INDUSTRY
					</p>
					<p class="text-sm">
						{{ selectedCorporate?.industry ?? 'N/A' }}
					</p>
				</div>
				<div class="flex justify-between items-center py-4 px-3 border-b">
					<p class="text-gray-500 text-sm">
						STATUS
					</p>
					<p :class="[selectedCorporate.active === 1 ? 'text-shuttlersGreen' : 'text-orange-700']" class="text-sm">
						{{
							selectedCorporate.active === 1 ? 'Active' : 'Inactive'
						}}
					</p>
				</div>
				<div class="font-medium pl-3 py-4">
					Administrator Information
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						NAME
					</p>
					<p class="text-sm">
						{{
							`${selectedCorporate?.fname} ${selectedCorporate?.lname}` ?? 'N/A'
						}}
					</p>
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						PHONE NUMBER
					</p>
					<p class="text-sm">
						{{
							selectedCorporate?.person_phone ?? 'N/A'
						}}
					</p>
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						EMAIL ADDRESS
					</p>
					<p class="text-sm">
						{{
							selectedCorporate?.email ?? 'N/A'
						}}
					</p>
				</div>
				<div class="flex justify-between items-center py-4 px-3">
					<p class="text-gray-500 text-sm">
						ROLE
					</p>
					<p class="text-sm">
						{{
							selectedCorporate?.staff_role ?? 'N/A'
						}}
					</p>
				</div>
			</div>
			<div class="w-6/12 space-y-6">
				<div class="px-6 border-b py-3 rounded-md shadow-sm bg-white h-60 grid place-content-center">
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

				<div class="px-6 border-b py-3 rounded-md shadow-sm bg-white h-60 grid place-content-center">
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
const { getCorporateById, loading, selectedCorporate } = useCorporateIdDetails()
const { updateCorporateStatus, loading: processingStatusUpdate } = useUpdateCorporateStatus()
const id = useRoute().params.id as string
getCorporateById(id)
definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})
const router = useRouter()

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
