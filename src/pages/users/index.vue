<template>
	<main class="">
		<Table :loading="loading" :headers="tableFields" :table-data="usersList">
			<template #header>
				<TableFilter :filter-type="{showStatus:true, showSearchBar:true, showDownloadButton: true, showDatePicker: true}" />
			</template>
			<template #item="{ item }">
				<div v-if="item.fname">
					<Avatar :name="item.data.fname" bg="#B1C2D9" />
				</div>
				<nuxtLink v-if="item.lname" :to="{ name: 'ShowUser', params: { userId: item.data.id } }" class="flex items-center gap-4">
					<span>{{ item.data.fname }} {{ item.data.lname }}</span>
				</nuxtLink>
				<span v-else-if="item.created_at">
					{{ useDateFormat(item.data.created_at, "MMMM d, YYYY").value }}
				</span>
				<span v-if="item.wallet" class="flex items-center gap-4">
					<span>{{ item.data.wallet.amount }}</span>
				</span>
				<span v-if="item.corporate_id" class="flex items-center gap-4">
					<span>{{ item.data.wallet.credit_amount }}</span>
				</span>
				<span v-else-if="item.active" class="text-xs text-white rounded-lg" :class="[item.data.active == 1 ? 'bg-green-500 px-3 py-1' : 'bg-red-500 px-3 py-1']">
					{{ item.data.active == 1 ? 'Active' : 'Inactive' }}
				</span>
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useGetUsersList } from '@/composables/modules/users/fetch'

const { getUsersList, loading, usersList } = useGetUsersList()
console.log(usersList, 'am here')
getUsersList()

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
const tableFields = ref([
    {
        text: 'AVATAR',
        value: 'fname'
    },
    {
        text: 'USER',
        value: 'lname'
    },
    {
        text: 'DATE JOINED',
        value: 'created_at'
    },
    {
        text: 'WALLET BALANCE',
        value: 'wallet'
    },
    {
        text: 'COMPANY BALANCE',
        value: 'corporate_id'
    },
    {
        text: 'STATUS',
        value: 'active'
    }
])

</script>
