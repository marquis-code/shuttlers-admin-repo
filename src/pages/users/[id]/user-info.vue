<template>
	<div v-if="!loading" class="lg:flex lg:gap-x-10 justify-center items-start space-y-10 lg:space-y-0">
		<div class="w-8/12 bg-white rounded-md shadow-sm p-3">
			<div class="flex justify-between items-center py-2.5 border-b pb-2 px-3">
				<div class="font-medium">
					User Information
				</div>
				<Dropdown :children="dropdownChildren" />
			</div>
			<div class="flex justify-between items-center border-b py-4 px-3">
				<p class="text-gray-500 text-sm">
					NAME
				</p>
				<p class="text-sm">
					{{ `${selectedUser.fname} ${selectedUser.lname}` ?? 'N/A' }}
				</p>
			</div>
			<div class="flex justify-between items-center border-b py-4 px-3">
				<p class="text-gray-500 text-sm">
					AVATAR
				</p>
				<p>
					<Avatar :name="selectedUser.fname" bg="#B1C2D9" />
				</p>
			</div>
			<div class="flex justify-between items-center border-b py-4 px-3">
				<p class="text-gray-500 text-sm">
					PHONE NUMBER
				</p>
				<p class="text-sm">
					{{ selectedUser.phone ?? 'N/A' }}
				</p>
			</div>
			<div class="flex justify-between items-center border-b py-4 px-3">
				<p class="text-gray-500 text-sm">
					EMAIL ADDRESS
				</p>
				<p class="text-sm">
					{{ selectedUser.email ?? 'N/A' }}
				</p>
			</div>
			<div class="flex justify-between items-center border-b py-4 px-3">
				<p class="text-gray-500 text-sm">
					COMPANY
				</p>
				<p class="text-sm">
					{{ selectedUser.company ? selectedUser.company.corporate_name : 'N/A' }}
				</p>
			</div>
			<div class="flex justify-between items-center border-b py-4 px-3">
				<p class="text-gray-500 text-sm">
					CAR OWNER
				</p>
				<p class="text-sm">
					{{
						selectedUser.car_owner == 1 ? 'Yes' : 'No'
					}}
				</p>
			</div>
			<div class="flex justify-between items-center border-b py-4 px-3">
				<p class="text-gray-500 text-sm">
					GENDER
				</p>
				<p class="text-sm">
					{{
						selectedUser.gender ?? 'N/A'
					}}
				</p>
			</div>
			<div class="flex justify-between items-center py-4 px-3">
				<p class="text-gray-500 text-sm">
					STATUS
				</p>
				<p :class="[selectedUser.active === '1' ? 'text-green-500' : 'text-orange-700']" class="text-sm">
					{{
						selectedUser.active === '1' ? 'Active' : 'Inactive'
					}}
				</p>
			</div>
		</div>
		<div class="w-4/12 bg-white rounded-md shadow-sm">
			<div class="px-6 border-b py-3">
				<p class="font-medium">
					User Wallet
				</p>
			</div>

			<div class="flex justify-center gap-y-2 items-center flex-col py-10">
				<p class="text-4xl font-semibold">
					{{ convertToCurrency(selectedUser.wallet.amount) }}
				</p>
				<p class="text-gray-400 text-xs">
					ACCOUNT BALANCE
				</p>
			</div>

			<div class="flex justify-between items-center border-b py-4 px-6">
				<p class="text-gray-500 text-xs">
					Main Balance
				</p>
				<p class="text-xs">
					{{ convertToCurrency(selectedUser.wallet.main_balance) }}
				</p>
			</div>
			<div class="flex justify-between items-center border-b py-4 px-6">
				<p class="text-gray-500 text-xs">
					Company Balance
				</p>
				<p class="text-xs">
					{{ convertToCurrency(selectedUser.wallet.company_balance) }}
				</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useUserIdDetails } from '@/composables/modules/users/id'
import { convertToCurrency } from '@/composables/utils/formatter'
const { getUserById, loading, selectedUser } = useUserIdDetails()
const id = useRoute().params.id as string
getUserById(id)

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})

const dropdownChildren = computed(() => [
	{ name: 'Edit User', func: () => { } },
	{ name: 'Topup User Wallet', func: () => { } },
	{ name: 'Change Password', func: () => { } },
	{ name: 'Add Profile Picture', func: () => { } },
	{ name: 'Make bus captain', func: () => { } },
	{ name: 'Debit User Wallet', func: () => { }, class: '!cotext-red' },
	{ name: 'Suspend User', func: () => { }, class: '!text-red' }
])

const openDropdown = ref(false)
</script>

<style scoped>

</style>
