<template>
	<main>
		<Table :loading="loadingAccounts" :headers="tableFields" :table-data="formattedPartnersAccountsList" class="cursor-pointer">
			<template #header>
				<TableFilter :filter-type="{ showSearchBar: true }" />
				<div class="flex justify-end items-end bg-white border-x border-gray-300 p-3 border-t border-gray-300">
					<button class="bg-black text-white px-3 py-2 text-sm rounded-md" @click="usePartnerModal().openAddBankAccount()">
						Add Account
					</button>
				</div>
			</template>
			<template #item="{ item }">
				<span v-if="item.table_index">
					{{ item.data.table_index }}
				</span>
				<span v-if="item.isDefault">
					{{ item.data.isDefault ? 'Assigned' : 'Not Assigned' }}
				</span>
				<span v-if="item.partnerId">
					<button :disabled="processingDeleteAccount" class="bg-white text-rose-500 border-2 border-rose-600 px-3 py-2 rounded-lg font-semibold" @click="handleRemoveAccount(item.data.id)">{{ processingDeleteAccount ? 'processing..' : 'Remove' }}</button>
				</span>
			</template>
		</Table>
	</main>
</template>
<script setup lang="ts">
import { useGetPartnerAccount } from '@/composables/modules/partners/id'
import { usePartnerModal } from '@/composables/core/modals'
const { getPartnerAccount, loadingAccounts, partnersAccountInformation, handleRemoveAccount, processingDeleteAccount } = useGetPartnerAccount()
const sid = useRoute().params.accountSid as string
getPartnerAccount(sid)

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const formattedPartnersAccountsList = computed(() => {
	if (!partnersAccountInformation?.value?.length) return []
	return partnersAccountInformation.value.map((item, index) => {
		return {
			...item,
			table_index: index + 1
		}
	})
})

const tableFields = ref([
	{
		text: 'S/N',
		value: 'table_index',
		width: '10%'
	},
	{
		text: 'ACCOUNT NUMBER',
		value: 'accountNumber'
	},
	{
		text: 'BANK NAME',
		value: 'bankName'
	},
	{
		text: 'ACCOUNT NAME',
		value: 'accountName'
	},
	{
		text: 'ASSIGNED ACCOUNT',
		value: 'isDefault'
	},
	{
		text: 'ACTIONS',
		value: 'partnerId'
	}
])
</script>

<style scoped></style>
