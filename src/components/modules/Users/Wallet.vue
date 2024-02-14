<template>
	<main class="space-y-10">
		<section class="bg-white rounded-md shadow-sm">
			<div class="px-6 border-b py-3">
				<p class="font-medium">
					User Wallet
				</p>
			</div>

			<div class="flex justify-center gap-y-2 items-center flex-col py-10">
				<p class="text-4xl font-semibold">
					{{ convertToCurrency(selectedUser?.wallet?.amount) }}
				</p>
				<p class="text-gray-400">
					ACCOUNT BALANCE
				</p>
			</div>

			<div class="flex justify-between items-center border-b py-4 px-6">
				<p class="text-gray-500">
					Main Balance
				</p>
				<p class="">
					{{ convertToCurrency(selectedUser?.wallet?.main_balance) }}
				</p>
			</div>
			<div class="flex justify-between items-center border-b py-4 px-6">
				<p class="text-gray-500">
					Company Balance ( Credit line )
				</p>
				<p class="">
					{{ convertToCurrency(selectedUser?.wallet?.credit_amount) }}
				</p>
			</div>
		</section>
		<section v-if="selectedUser?.company" class="bg-white rounded-md shadow-sm">
			<div class="px-6 border-b py-3">
				<p class="font-medium">
					User's company wallet info ( Corporate pay )
				</p>
			</div>

			<ul v-if="corporateWalletLimitUsageInfo" class="space-y-6 p-6">
				<li class="flex items-center justify-between">
					<p class="text-gray-500">
						Wallet limit
					</p>
					<p v-if="Object.keys(corporateWalletLimitUsageInfo).length">
						{{ corporateWalletLimitUsageInfo?.limitInfo?.limit_type == 'trip' ? `${corporateWalletLimitUsageInfo?.limitInfo?.limit_value} trip(s)` : `N${corporateWalletLimitUsageInfo?.limitInfo?.limit_value}.00` }} {{ corporateWalletLimitUsageInfo?.limitInfo?.limit_value_unit }}
					</p>
					<p v-else>
						N/A
					</p>
				</li>
				<li class="
				flex items-center justify-between
				  ">
					<p class="text-gray-500">
						Limit Usage
					</p>
					<p>{{ corporateWalletLimitUsageInfo?.description ?? 'N/A' }}</p>
				</li>
				<li class="
				flex items-center justify-between
				  ">
					<p class="text-gray-500">
						Company
					</p>
					<NuxtLink :to="`/companies/${selectedUser?.company?.id}/${selectedUser?.company?.active === 1 ? 'active' : 'inactive'}/company-info`" class="text-blue-600 font-semibold underline">
						{{ selectedUser?.company?.corporate_name ?? 'N/A' }}
					</NuxtLink>
				</li>

				<li class="
				flex items-center justify-between
				  ">
					<p class="text-gray-500">
						Company wallet balance
					</p>
					<p>
						{{
							corporateWalletDetails?.wallet?.available_balance_formatted ?? 'NGN 0.00'
						}}
					</p>
				</li>

				<li class="
				flex items-center justify-between
				  ">
					<p class="text-gray-500">
						Is overdraft enabled
					</p>
					<p>
						{{
							corporateWalletDetails?.wallet?.supports_over_draw == 1 ? 'Yes' : 'No'
						}}
					</p>
				</li>

				<li v-if="corporateWalletDetails?.wallet?.supports_over_draw == 1" class="
				flex items-center justify-between
				  ">
					<p class="text-gray-500">
						Overdraft balance
					</p>
					<p>
						{{
							convertToCurrency(corporateWalletDetails?.wallet?.max_over_draw_value) ?? 'N/A'
						}}
					</p>
				</li>
			</ul>
			<p v-else class="text-sm text-center font-medium py-3">
				No corporate pay
			</p>
		</section>
	</main>
</template>

<script setup lang="ts">
import { convertToCurrency } from '@/composables/utils/formatter'
const props = defineProps({
    selectedUser: {
        type: Object,
        required: true
    },
    corporateWalletLimitUsageInfo: {
        type: Object,
        required: true
    },
    corporateWalletDetails: {
        type: Object,
        required: true
    }
})
</script>
