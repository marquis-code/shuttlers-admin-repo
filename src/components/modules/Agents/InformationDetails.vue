<template>
	<section>
		<div class="flex justify-between items-center py-2.5 border-b pb-2 px-3">
			<div class="font-medium">
				Agents Information
			</div>
			<ButtonDropdown :children="dropdownChildren" :data="selectedUser" />
		</div>
		<div class="flex justify-between items-center border-b py-4 px-3">
			<p class="text-gray-500 text-sm">
				FULLNAME
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
				EMAIL ADDRESS
			</p>
			<p class="text-sm">
				{{ selectedUser.email ?? 'N/A' }}
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

const props = defineProps({
    selectedUser: {
        type: Object,
        required: true
    }

})

const dropdownChildren = computed(() => [
	{
		name: 'Edit Agent', func: (data) => {
			props.selectedUser.value = data
			useRouter().push(`/users/${data.id}/edit`)
		}
	},
	{ name: 'Make inactive', func: () => { } }

])

</script>
