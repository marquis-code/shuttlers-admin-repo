<template>
	<section class="space-y-6 lg:flex justify-start items-start lg:space-x-10 lg:space-y-0">
		<section :class="[loadingTransactions ? 'h-[400px]' : '']" class="rounded-lg lg:w-6/12 stat-card">
			<div class="">
				<h3 class="px-6 py-4 font-medium">
					Last 5 Transactions
				</h3>
			</div>
			<div v-if="!loadingTransactions" class="block w-full overflow-x-auto ">
				<Table :headers="transactionHeaders" :table-data="computedTransactionsList" :loading="loadingTransactions">
					<template #item="{ item }">
						<span v-if="item.created_at" class="flex items-center gap-4 py-4">
							<span class="text-xs">{{ useDateFormat(item.data.created_at, "hh:mm, MMMM d, YYYY").value }}</span>
						</span>
						<div v-if="item.title" class="flex items-center gap-4 py-4 w-[200px]">
							<span class="text-xs text-relaxed">{{ item.data.title }}</span>
						</div>
						<span v-if="item.user" class="flex items-center gap-4 py-4">
							<span class="text-sm">{{ item.data.user.fname }} {{ item.data.user.lname }}</span>
						</span>
						<span v-if="item.amount" class="flex items-center gap-4 py-4">
							<span :class="[item.data.type === 'debit' ? 'text-red' : 'text-shuttlersGreen']" class="text-sm">{{ convertToCurrency(item.data.amount) }}</span>
						</span>
					</template>
				</Table>
			</div>
			<Skeleton v-else height="300px" />
		</section>
		<section class="lg:w-6/12 stat-card">
			<h3 class="px-6 py-4 font-medium">
				Last 5 User Signups
			</h3>
			<div v-if="!loadingSignups" class="">
				<!-- <div class="block w-full overflow-x-auto ">  -->
				<Table :headers="signupHeaders" :table-data="signupList" :loading="loadingSignups">
					<template #item="{ item }">
						<span v-if="item.fname" class="flex items-center gap-4 py-6">
							<Avatar :name="item.data.fname" bg="#B1C2D9" />
							<span class="text-sm">{{ item.data.fname }} {{ item.data.lname }}</span>
						</span>
						<span v-if="item.email" class="flex items-center gap-4 py-6">
							<span class="text-sm">{{ item.data.email }}</span>
						</span>
						<span v-if="item.active" class="flex items-center gap-4 py-6">
							<span class="text-sm">{{ item.data.active == '1' ? 'Active' : 'Inactive' }}</span>
						</span>
					</template>
				</Table>
				<!-- </div> -->
				<div class="flex items-end justify-end py-4 pr-3">
					<NuxtLink to="/users" class="flex items-center justify-center text-xs text-blue-500 gap-x-2">
						All Users<img class="inline" src="@/assets/icons/source/next.svg" alt="">
					</NuxtLink>
				</div>
			</div>
			<Skeleton v-else height="300px" />
		</section>
	</section>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useGetRecentTransactionsList } from '@/composables/modules/transactions/fetch'
import { useGetRecentSignupsList } from '@/composables/modules/users/fetch'
import { convertToCurrency } from '@/composables/utils/formatter'

const { getSignupList, loadingSignups, signupList } = useGetRecentSignupsList()
const { getTransactionList, loadingTransactions, transactionsList } = useGetRecentTransactionsList()
getSignupList()
getTransactionList()

const computedTransactionsList = computed(() => {
	return transactionsList.value.slice(0, 5)
})
const transactionHeaders = [
	{
		text: 'Date',
		value: 'created_at'
	},
	{
		text: 'Description',
		value: 'title'
	},
	{
		text: 'User',
		value: 'user'
	},
	{
		text: 'Amount',
		value: 'amount'
	}
]

const signupHeaders = [
	{
		text: 'User',
		value: 'fname'
	},
	{
		text: 'Email',
		value: 'email'
	},
	{
		text: 'Status',
		value: 'active'
	}
]

</script>

<style scoped>

</style>
