<template>
	<main>
		<ButtonGoBack class="mb-6" />
		<Table :loading="loadingAccounts" :headers="tableFields" :table-data="formattedPartnersAccountsList" class="cursor-pointer">
			<template #header>
				<TableFilter :filter-type="{ showStatus: true, showSearchBar: true }" />
			</template>
			<template #item="{ item }">
				<span v-if="item.action">
					<ButtonIconDropdown :children="dropdownChildren" :data="item.data" class-name="w-56" />
				</span>
			</template>
		</Table>
	</main>
</template>
<script setup lang="ts">
import { useGetPartnerAccount } from '@/composables/modules/partners/id'
const { getPartnerAccount, loadingAccounts, partnersAccountInformation } = useGetPartnerAccount()
const sid = useRoute().params.accountSid as string
getPartnerAccount(sid)

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const dropdownChildren = computed(() => [
	{ name: 'Deduct partner earnings', func: (data) => { useRouter().push(`/fleets/${data.user_id}/past-bookings/${data.trip_id}`) } },
	{ name: 'View financials', class: '!text-red' }
])

const formattedPartnersAccountsList = computed(() => {
	if (!partnersAccountInformation.value.length) return []
	return partnersAccountInformation.value.map((item, index) => {
		return {
			...item
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
		value: 'id'
	}
])
</script>

<style scoped></style>
