<template>
	<main class="">
		<ButtonGoBack url="/users" class="mb-6" />
		<Table :loading="loading" :headers="tableFields" :table-data="creditLineUsageList">
			<template #header>
				<TableFilter :filter-type="{showSearchBar:true, showDateRange:true}" @filter="onFilterUpdate" />
			</template>
			<template #item="{ item }">
				<div v-if="item.title">
					<span class="text-blue-600">{{ item.data.title }}</span>
				</div>
				<div v-if="item.firstName" class="">
					<p class="text-blue-600">
						{{ item.data.firstName }} {{ item.data.lastName }}
					</p>
					<p>{{ item.data.email }}</p>
				</div>
				<div v-if="item.location" class="flex items-center gap-x-2">
					<img src="@/assets/icons/source/location.svg" alt="">
					<p class="font-medium">
						{{ item.data.location }}
					</p>
				</div>
				<div v-if="item.returnTrip">
					<span>{{ item.data.returnTrip ? 'Return' : 'One-way' }}</span>
				</div>
				<div v-if="item.status">
					<span class="text-white text-xs px-2.5 py-2 rounded-lg font-medium" :class="[item.data.status === 'accepted' ? 'bg-green-500' : item.data.status === 'pending' ? 'bg-yellow-600' : item.data.status === 'cancelled' ? 'bg-gray-400' : '']">{{ item.data.status }}</span>
				</div>
			</template>
			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loading" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>
<script setup lang="ts">

import { useUserCreditLineUsage } from '@/composables/modules/users/inner/credit-line-usage'
import { useMonthBoundaries } from '@/composables/core/useMonthBoundaries'
const { creditLineUsageList, loading, getUserCreditLineUsage, filterData, moveTo, next, prev, total, page, onFilterUpdate } = useUserCreditLineUsage()
const year = new Date().getFullYear()
const month = new Date().getMonth()
const { firstDay, lastDay } = useMonthBoundaries(year, month)
const id = useRoute().params.id as string
filterData.startDate.value = firstDay.value
filterData.endDate.value = lastDay.value
filterData.staffId.value = id
getUserCreditLineUsage()
definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const tableFields = ref([
    {
        text: 'ID',
        value: 'id'
    },
    {
        text: 'STAFF',
        value: 'staff'
    },
    {
        text: 'WALLET HISTORY',
        value: 'wallet_history'
    },
    {
        text: 'AMOUNT',
        value: 'amount'
    },
    {
        text: 'BALANCE BEFORE',
        value: 'balance_before'
    },
	{
        text: 'BALANCE AFTER',
        value: 'balance_after'
    },
    {
        text: 'CREATED AT',
        value: 'created_at'
    }
])

</script>

<style scoped></style>
