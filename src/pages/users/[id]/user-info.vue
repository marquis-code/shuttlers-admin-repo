<template>
	<div class="flex gap-x-10 justify-center items-start">
		<div class="w-8/12 bg-white rounded-md shadow-sm p-3">
			<div class="flex justify-between items-center py-2.5 border-b pb-2 px-3">
				<div class="font-medium">
					User Information
				</div>
				<div>
					<div class="relative">
						<div
							class="inline-flex items-center overflow-hidden rounded-md border py-1" style="background-color: #CA3433"
						>
							<a
								href="#"
								class="border-e px-4 py-2 text-sm/none   text-white"
							>
								Actions
							</a>

							<button
								class="h-full p-2 text-gray-600  hover:text-gray-700"
								@click="openDropdown = !openDropdown"
							>
								<span class="sr-only">Menu</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-4 w-4"
									viewBox="0 0 20 20"
									fill="white"
								>
									<path
										fill-rule="evenodd"
										d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
										clip-rule="evenodd"
									/>
								</svg>
							</button>
						</div>

						<div v-if="openDropdown"
							class="absolute end-0 z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg"
							role="menu"
						>
							<div class="p-2">
								<a
									href="#"
									class="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
									role="menuitem"
								>
									Edit User
								</a>

								<a
									href="#"
									class="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
									role="menuitem"
								>
									Topup User Wallet
								</a>

								<a
									href="#"
									class="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
									role="menuitem"
								>
									Change Password
								</a>

								<a
									href="#"
									class="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
									role="menuitem"
								>
									Add Profile Picture
								</a>
								<a
									href="#"
									class="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
									role="menuitem"
								>
									Make bus captain
								</a>
								<a
									style="color: red"
									href="#"
									class="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
									role="menuitem"
								>
									Debit User Wallet
								</a>
								<a
									style="color: red"
									href="#"
									class="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
									role="menuitem"
								>
									Suspend User
								</a>
							</div>
						</div>
					</div>
				</div>
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
					{{
						Number(selectedUser.wallet.amount).toLocaleString('en-NG', {style: 'currency', currency : 'NGN'})
					}}
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
					{{
						Number(selectedUser.wallet.main_balance).toLocaleString('en-NG', {style: 'currency', currency : 'NGN'})
					}}
				</p>
			</div>
			<div class="flex justify-between items-center border-b py-4 px-6">
				<p class="text-gray-500 text-xs">
					Company Balance
				</p>
				<p class="text-xs">
					{{
						Number(selectedUser.wallet.credit_amount).toLocaleString('en-NG', {style: 'currency', currency : 'NGN'})
					}}
				</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useUserIdDetails } from '@/composables/modules/users/id'
const { getUserById, loading, selectedUser } = useUserIdDetails()
const id = useRoute().params.id as string
getUserById(id)
console.log(selectedUser)

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})

const openDropdown = ref(false)
</script>

<style scoped>

</style>
