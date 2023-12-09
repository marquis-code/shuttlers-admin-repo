<template>
	<div class="space-y-6">
		<BreadCrums v-if="!loading" class="text-sm" title="Admin" :content="breadcrumb" />
		<ButtonGoBack class="mb-6" />
		<div class="lg:flex lg:gap-x-10 justify-center items-start space-y-10 lg:space-y-0">
			<div v-if="!loading" class="md:w-6/12 bg-white rounded-md shadow-sm p-3">
				<div class="flex justify-between items-center py-2.5 border-b pb-2 px-3">
					<div class="font-medium">
						Admin User Information
					</div>
					<ButtonDropdown :children="dropdownChildren" :data="selectedAdmin" />
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						NAME
					</p>
					<p class="text-sm">
						{{ `${selectedAdmin.fname} ${selectedAdmin.lname}` ?? 'N/A' }}
					</p>
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						Phone Number
					</p>
					<p>
						{{ `${selectedAdmin.phone}` ?? 'N/A' }}
					</p>
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						Email Address
					</p>
					<p>
						{{ `${selectedAdmin.email}` ?? 'N/A' }}
					</p>
				</div>
				<div class="flex justify-between items-center py-4 px-3">
					<p class="text-gray-500 text-sm">
						Status
					</p>
					<StatusBadge :name="selectedAdmin.active === '1' ? 'active' : 'inactive'" />
				</div>
			</div>
			<Skeleton v-else height="300px" width="700px" />
			<div class="md:w-6/12 bg-white rounded-md shadow-sm">
				<ModulesAdminsUpdateAdmin />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useConfirmationModal } from '@/composables/core/confirmation'
import { useAdminModal } from '@/composables/core/modals'
import { useGetStaffs } from '@/composables/modules/staffs/fetch'
import { useCreateAdmin } from '@/composables/modules/staffs/create'
import { useAdminIdDetails } from '@/composables/modules/staffs/id'

const { getAdminById, loading, selectedAdmin } = useAdminIdDetails()
const { suspendAdmin } = useCreateAdmin()
const id = useRoute().params.id as string

getAdminById(id)

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})

const dropdownChildren = computed(() => [
	{ name: 'Change Password', func: () => useAdminModal().openChangePassword() },
	{ name: `${selectedAdmin?.value?.active === '0' ? 'Un-suspend Admin' : 'Suspend Admin'}`, func: () => handleAdminSuspension(), class: '!text-red' }
])

const breadcrumb = computed(() => {
		return [
            {
                name: 'Admin',
                link: '#'
            },
            {
                name: `${selectedAdmin?.value?.fname} ${selectedAdmin?.value?.lname}`,
                link: '#'
            }
        ]
	})

const openDropdown = ref(false)

const handleAdminSuspension = () => {
	const loading = ref(false)
	if (selectedAdmin?.value?.active === '0') {
		useConfirmationModal().openAlert({
        title: 'Are you sure?',
		type: 'NORMAL',
        desc: 'Are you sure you want to un-suspend this admin?',
		loading,
		call_function: () => suspendAdmin(selectedAdmin.value.id, 'unsuspend')
    })
	}

	if (selectedAdmin?.value?.active === '1') {
		useConfirmationModal().openAlert({
        title: 'Are you sure?',
		type: 'NORMAL',
        desc: 'Are you sure you want to suspend this admin?',
		loading,
		call_function: () => suspendAdmin(selectedAdmin.value.id, 'suspend')
    })
	}
}
</script>

<style scoped>

</style>
