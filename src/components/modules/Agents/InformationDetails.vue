<template>
	<section>
		<div class="flex justify-between items-center py-2.5 border-b pb-2 px-3">
			<div class="font-medium">
				Agent Information
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
				NIN
			</p>
			<p class="text-sm">
				{{ selectedUser.nin ?? 'N/A' }}
			</p>
		</div>
		<div class="flex justify-between items-center border-b py-4 px-3">
			<p class="text-gray-500 text-sm">
				DATE CREATED
			</p>
			<p class="text-sm">
				{{ useDateFormat(selectedUser?.created_at, "DD, MMMM YYYY").value }}
			</p>
		</div>
		<h1 class="card-header mt-7 px-3">
			Location information
		</h1>
		<div class="flex justify-between items-center border-b py-4 px-3">
			<p class="text-gray-500 text-sm">
				COUNTRY
			</p>
			<p class="text-sm">
				{{ selectedUser?.country_code ?? 'N/A' }}
			</p>
		</div>
		<div class="flex justify-between items-center border-b py-4 px-3">
			<p class="text-gray-500 text-sm">
				STATE
			</p>
			<p class="text-sm">
				{{ selectedUser?.city_id ?? 'N/A' }}
			</p>
		</div>
		<div class="flex justify-between items-center border-b py-4 px-3">
			<p class="text-gray-500 text-sm">
				ADDRESS
			</p>
			<p class="text-sm">
				{{ 'N/A' }}
			</p>
		</div>

		<div class="flex justify-between items-center py-4 px-3">
			<p class="text-gray-500 text-sm">
				STATUS
			</p>
			<p :class="[selectedUser.sales_agent_account_active === '1' ? 'text-green-500' : 'text-orange-700']" class="text-sm">
				{{
					selectedUser.sales_agent_account_active === '1' ? 'Active' : 'Inactive'
				}}
			</p>
		</div>
	</section>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useSuspendAgent } from '@/composables/modules/agents/suspend'

const { suspendAgent, suspend } = useSuspendAgent()

const props = defineProps({
    selectedUser: {
        type: Object,
        required: true
    }

})

const dropdownChildren = computed(() => [
	{
		name: 'Edit Agent', func: (data) => {
			useRouter().push(`/agents/${data.id}/edit`)
		}
	},
	{ name: `${props.selectedUser.sales_agent_account_active === '1' ? 'Suspend' : 'Un-suspend'}`, func: (data) => { suspend(data) }, class: '!text-red' }

])

</script>
