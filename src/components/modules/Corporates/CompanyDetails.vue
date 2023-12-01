<template>
	<div class="lg:w-6/12 bg-white rounded-md shadow-sm p-3">
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
			<p :class="[selectedCorporate?.active === 1 ? 'text-shuttlersGreen' : 'text-orange-700']" class="text-sm">
				{{
					selectedCorporate?.active === 1 ? 'Active' : 'Inactive'
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
</template>

<script lang="ts" setup>
const props = defineProps({
    selectedCorporate: {
        type: Object,
        required: true
    },
	dropdownChildren: {
		type: Array,
        required: true
	}
})
</script>

<style>

</style>
