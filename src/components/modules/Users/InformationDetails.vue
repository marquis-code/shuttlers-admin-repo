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
	</section>
</template>

<script setup lang="ts">
const props = defineProps({
    selectedUser: {
        type: Object,
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
	{ name: 'Topup User Wallet', func: () => { } },
	{ name: 'Change Password', func: () => { } },
	{ name: 'Add Profile Picture', func: () => { } },
	{ name: 'Make bus captain', func: () => { } },
	{ name: 'Debit User Wallet', func: () => { }, class: '!text-red' },
	{ name: 'Suspend User', func: () => { }, class: '!text-red' }
])
</script>
