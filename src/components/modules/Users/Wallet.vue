<template>
	<section>
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
	<section v-if="selectedUser?.company">
		<div class="px-6 border-b py-3">
			<p class="font-medium">
				User's company wallet info ( Corporate pay )
			</p>
		</div>

		<ul class="list-group list-group-flush">
			<li class="flex items-center justify-between">
				<small>Wallet limit</small>
				<small>{{ corporateWalletLimitUsageInfo?.limitInfo?.limit_type == 'trip' ? `${corporateWalletLimitUsageInfo.limitInfo.limit_value} trip(s)` : `N${corporatePayUsage.limitInfo.limit_value}.00` }} {{ corporatePayUsage.limitInfo.limit_value_unit }}</small>
			</li>
			<li class="
			flex items-center justify-between
              ">
				<small>Limit Usage</small>
				<small>{{ corporateWalletLimitUsageInfo?.description }}</small>
			</li>
			<li class="
			flex items-center justify-between
              ">
				<small>Company</small>
				<!-- <router-link :to="{name: 'ShowCompanyInfo', params: {companyId: selectedUser.corporate_id, status: 'active' }}">
					{{ selectedUser?.company?.corporate_name }}
				</router-link> -->
			</li>

			<li class="
			flex items-center justify-between
              ">
				<small>Company wallet balance</small>
				<small>{{
					corporateWalletDetails?.wallet?.available_balance_formatted
				}}</small>
			</li>

			<li class="
			flex items-center justify-between
              ">
				<small>Is overdraft enabled</small>
				<small>{{
					corporateWalletDetails?.wallet?.supports_over_draw == 1 ? 'Yes' : 'No'
				}}</small>
			</li>

			<li v-if="corporateWalletDetails?.wallet?.supports_over_draw == 1" class="
			flex items-center justify-between
              ">
				<small>Overdraft balance</small>
				<small>{{
					corporateWalletDetails?.wallet?.max_over_draw_value
				}}</small>
			</li>
		</ul>
	</section>
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
