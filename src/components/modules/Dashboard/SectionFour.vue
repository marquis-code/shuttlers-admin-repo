<template>
	<section class="items-start space-y-6 lg:flex lg:space-x-10 lg:space-y-0">
		<section :class="[loadingTransactions ? 'h-[400px]' : '']" class="rounded-lg lg:w-6/12 stat-card">
			<div class="">
				<h3 class="px-6 py-4 font-medium">
					Last 5 Transactions
				</h3>
			</div>
			<div class="relative flex flex-col w-full min-w-0 break-words">
				<div class="block w-full overflow-x-auto ">
					<Table :headers="transactionHeaders" :table-data="transactionsList" :loading="loadingTransactions">
						<template #item="{ item }">
							<span v-if="item.created_at" class="flex items-center gap-4 py-3">
								<span class="text-sm">{{ item.data.created_at }}</span>
							</span>
							<span v-if="item.title" class="flex items-center gap-4 py-3">
								<span class="text-sm">{{ item.data.title }}</span>
							</span>
							<span v-if="item.user" class="flex items-center gap-4 py-3">
								<span class="text-sm">{{ item.data.user.fname }} {{ item.data.user.lname }}</span>
							</span>
							<span v-if="item.amount" class="flex items-center gap-4 py-3">
								<span :style="{color: item.data.type === 'debit' ? &quot;#e63757&quot; : &quot;#00d97e&quot;}" class="text-sm">₦ {{ item.data.amount }}</span>
							</span>
						</template>
					</Table>
				</div>
			</div>
		</section>
		<section class="lg:w-6/12 stat-card">
			<h3 class="px-6 py-4 font-medium">
				Last 5 User Signups
			</h3>
			<div class="relative flex flex-col w-full min-w-0 break-words">
				<div class="block w-full overflow-x-auto ">
					<Table :headers="signupHeaders" :table-data="signupList" :loading="loadingSignups">
						<template #item="{ item }">
							<span v-if="item.fname" class="flex items-center gap-4">
								<span class="text-sm">{{ item.data.fname }} {{ item.data.lname }}</span>
							</span>
							<span v-if="item.email" class="flex items-center gap-4">
								<span class="text-sm">{{ item.data.email }}</span>
							</span>
							<span v-if="item.active" class="flex items-center gap-4">
								<span :style="{color: item.data.active !== '1' ? &quot;#e63757&quot; : &quot;#00d97e&quot;}" class="text-sm">{{ item.data.active == '1' ? 'Active' : 'Inactive' }}</span>
							</span>
						</template>
					</Table>
				</div>
				<div v-if="!loadingSignups" class="flex items-end justify-end py-4 pr-3">
					<NuxtLink to="/users" class="flex items-center justify-center text-xs text-blue-500 gap-x-2">
						All Users<img class="inline" src="@/assets/icons/source/next.svg" alt="">
					</NuxtLink>
				</div>
			</div>
		</section>
	</section>
</template>

<script setup lang="ts">
import { useGetRecentTransactionsList } from '@/composables/modules/transactions'
import { useGetRecentSignupsList } from '@/composables/modules/users/fetch'

const { getSignupList, loadingSignups, signupList } = useGetRecentSignupsList()
const { getTransactionList, loadingTransactions, transactionsList } = useGetRecentTransactionsList()
getSignupList()
getTransactionList()

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
