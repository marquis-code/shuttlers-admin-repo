<template>
	<section>
		<div class="flex justify-between items-center py-2.5 border-b pb-2 px-3">
			<div class="font-medium">
				User Information
			</div>
			<ButtonDropdown :children="dropdownChildren" :data="selectedUser" />
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
				<Avatar :src="selectedUser?.avatar" :name="selectedUser.fname" bg="#B1C2D9" />
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
		<div v-if="typeof selectedUser?.busCaptain === 'object'" class="flex justify-between items-center border-b py-4 px-3">
			<p class="text-gray-500 text-sm w-6/12">
				BUS CAPTAIN
			</p>
			<div v-if="!busCaptainsLoader" class="text-sm w-6/12 space-y-3 flex justify-end items-end flex-col">
				<div v-for="(item, idx) in busCaptainsRoutes" :key="idx" class="flex items-center gap-x-3">
					<NuxtLink class="font-medium">
						<span class="text-shuttlersGreen font-medium">{{ item?.route_code }}</span> {{ `${item?.source.slice(0, 10)}... ${item?.destination.slice(0, 10)}...` }}
					</NuxtLink>
					<span class="cursor-pointer" @click="removeBusCaptain(item)"><img src="@/assets/icons/source/red-exit.svg" alt=""></span>
				</div>
			</div>
			<Skeleton v-else height="100px" />
		</div>
		<div class="flex justify-between items-center border-b py-4 px-3">
			<p class="text-gray-500 text-sm">
				COMPANY
			</p>
			<div>
				<span v-if="selectedUser?.company">
					<NuxtLink :to="`/companies/${selectedUser?.company?.id}/${selectedUser?.company?.active === 1 ? 'active' : 'inactive'}/company-info`" class="text-blue-600 font-semibold underline">
						{{ selectedUser?.company?.corporate_name }}
					</NuxtLink>
				</span>
				<span v-else class="text-sm text-gray-600">
					No company available
				</span>
			</div>
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
	</section>
</template>

<script setup lang="ts">
import { useUserModal } from '@/composables/core/modals'
import { useCreateUsers } from '@/composables/modules/users/create'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { useDeleteBusCaptains } from '@/composables/modules/users/id'
import { useBlockUser } from '@/composables/modules/users/block'
import { isProdEnv } from '@/composables/utils/system'

const { suspendUsers, updateUserWallet, loading, setUpdateWalletActionType } = useCreateUsers()
const { initBlockUser } = useBlockUser()
const { deleteBusCaptain, loading: loadingBusCaptains } = useDeleteBusCaptains()
const props = defineProps({
    selectedUser: {
        type: Object,
        required: true
    },
	busCaptainsRoutes: {
		type: Array as PropType<any[]>,
        required: true
	},
	busCaptainsLoader: {
		type: Boolean,
        required: true
	}
})

const dropdownChildren = computed(() => [
	{
		name: 'Edit User', func: (data) => {
			props.selectedUser.value = data
			useRouter().push(`/users/add/${data.id}`)
		}
	},
	{ name: 'Top-up User Wallet', func: () => { handleWalletUpdate('credit') } },
	{ name: 'Change Password', func: () => { handleUserPasswordUpdate() } },
	{ name: 'Book For User', func: () => { bookTrip() } },
	{ name: 'Add Profile Picture', func: () => { useUserModal().openChangeProfile() } },
	{ name: 'Make bus captain', func: () => { makeBusCaptain() } },
	{ name: 'Debit User Wallet', func: () => { handleWalletUpdate('debit') }, class: '!text-red' },
	{ name: `${props.selectedUser.active === '1' ? 'Suspend' : 'Un-suspend'}`, func: (data) => { suspendUser(data) }, class: '!text-red' },
	{ name: `${props.selectedUser.is_blocked === 1 ? 'Unblock' : 'Block'} user`, func: (data) => { initBlockUser(!(props.selectedUser.is_blocked)) }, class: '!text-red', hide: isProdEnv.value }
])

const suspendUser = (data: any) => {
	const actionType = props.selectedUser.active === '1' ? 'suspend' : 'un-suspend'
    useConfirmationModal().openAlert({
        title: 'Please Confirm',
		type: 'NORMAL',
        desc: `Are you sure you want to ${actionType} this user`,
		loading,
		call_function: () => suspendUsers(data.id, actionType)
    })
}

const handleWalletUpdate = (actionType) => {
	setUpdateWalletActionType(actionType)
	useUserModal().openWalletUpdate()
}
const handleUserPasswordUpdate = () => {
	useUserModal().openChangeUserPassword()
}

const bookTrip = () => {
    useUserModal().openBookTrip()
}

const makeBusCaptain = () => {
   useUserModal().openMakeBusCaptain()
}

const removeBusCaptain = (itm) => {
	useConfirmationModal().openAlert({
        title: 'Please Confirm',
		type: 'NORMAL',
        desc: `Are you sure you want to remove user from being a bus captain from this route ? ${itm?.route_code} - ${itm?.departure_time}`,
		loading: loadingBusCaptains,
		call_function: () => deleteBusCaptain(itm.id)
    })
}
</script>
