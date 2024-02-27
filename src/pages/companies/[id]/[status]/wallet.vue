<template>
	<section class="lg:flex justify-between gap-x-10 space-y-6 lg:space-y-0">
		<div class="lg:w-8/12 space-y-8">
			<div v-if="!loadingCorporateWallet" class="h-48 rounded-lg bg-indigo-100 p-6">
				<div class="flex justify-between">
					<div class="space-y-4">
						<div class="flex items-center gap-x-3">
							<p class="text-lg font-medium">
								Wallet balance
							</p>
							<img v-if="hideBalance" src="@/assets/icons/source/eye-close.svg" class="h-6 w-6 cursor-pointer" alt="" @click="hideBalance = !hideBalance">
							<img v-else src="@/assets/icons/source/eye.svg" alt="" class="cursor-pointer " @click="hideBalance = !hideBalance">
						</div>
						<h1 v-if="!hideBalance" class="text-3xl font-bold">
							{{ corporateWalletDetails?.wallet?.ledger_account?.available_balance_formatted || 'NGN 0.00' }}
						</h1>
						<p v-else class="text-3xl text-gray-900 font-extrabold">
							****
						</p>
						<div class="w-full">
							<button class="text-white text-sm bg-black px-3 py-2.5 w-11/12 rounded-md flex items-center gap-x-3" @click="useCompaniesModal().openFundWallet()">
								<span class="rounded-full bg-white p-1">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V6M5 12l7-7 7 7" /></svg>
								</span>
								Fund wallet
							</button>
						</div>
					</div>
					<div class="">
						<select class="w-full font-medium outline-none px-6 bg-indigo-300 border rounded-md py-2.5 border-indigo-400">
							<option>{{ corporateWalletDetails?.wallet?.currency }} Wallet</option>
						</select>
					</div>
				</div>
			</div>
			<Skeleton v-else height="100px" />
			<div class="space-y-4">
				<h1 class="font-bold text-lg">
					Wallet History
				</h1>
				<Table :loading="loadingWalletHistory" :headers="tableFields" :table-data="coprorateWalletHistory" :has-options="true" :option="onRowClicked">
					<template #header>
						<div class="bg-white border-x border-gray-100">
							<TableFilter :filter-type="{showDownloadButton: true, showDateRange: true}" @filter="onFilterUpdate" />
							<div class="flex justify-end gap-x-3 items-end pr-3 py-3">
								<div>
									<CorporatesStaffMultiSelect class="w-full" label="" @update:modelValue="handleSelectedCorporates" />
								</div>
								<div>
									<select v-model="filterData['filters[type]'].value" class="border border-gray-200r rounded-lg px-3 py-2.5 bg-gray-50 text-sm outline-none">
										<option value="" disabled>
											Select transaction
										</option>
										<option value="all">
											All
										</option>
										<option value="credit">
											Credit
										</option>
										<option value="debit">
											Debit
										</option>
									</select>
								</div>
							</div>
						</div>
					</template>
					<template #item="{ item }">
						<div v-if="item.description" class="flex items-center gap-x-4 w-[200px]">
							<div class="border rounded-md p-2 bg-white">
								<div><img v-if="item.data.direction === 'credit'" class="max-w-xl max-h-28" src="@/assets/icons/source/inflow.svg" alt=""></div>
								<div><img v-if="item.data.direction === 'debit'" class="max-w-xl max-h-28" src="@/assets/icons/source/outflow.svg" alt=""></div>
							</div>
							<div class="space-y-4">
								<p class="font-medium text-gray-600">
									{{ item.data.description }}
								</p>
								<p class="font-medium text-gray-600">
									{{ item.data.updated_at.split(' ')[1] }}
								</p>
							</div>
						</div>
						<div v-if="item.status">
							<p class="text-shuttlersGreen text-sm">
								{{ item.data.status === 'posted' ? 'Successful' : '' }}
							</p>
						</div>
					</template>

					<template #footer>
						<TablePaginator :current-page="page" :total-pages="total" :loading="loadingWalletHistory" @move-to="moveTo($event)" @next="next" @prev="prev" />
					</template>
				</Table>
			</div>
		</div>
		<div class="lg:w-4/12">
			<div v-if="!loadingCorporateWallet" class="space-y-10">
				<div v-if="corporateWalletDetails?.wallet?.nuban_addresses?.length" class="card space-y-10 p-6">
					<div v-for="(itm, idx) in corporateWalletDetails?.wallet?.nuban_addresses" :key="idx" class="space-y-3">
						<div class="flex items-center justify-between">
							<p class="text-gray-500 text-sm">
								Bank Name
							</p>
							<p class="text-xl font-bold">
								{{ itm?.bank_name ?? 'N/A' }}
							</p>
						</div>
						<div class="flex items-center justify-between">
							<p class="text-gray-500 text-sm">
								Account Number
							</p>
							<p class="text-xl font-bold flex items-center gap-x-3">
								<span id="accountNumber" ref="textToCopy" class="cursor-pointer">{{ itm?.account_number ?? 'N/A' }}</span> <img src="@/assets/icons/source/copy.svg" class="cursor-pointer" alt="" @click="copyToClipboard(itm?.account_number)">
							</p>
						</div>
						<div class="flex items-center justify-between">
							<p class="text-gray-500 text-sm">
								Account Name
							</p>
							<p class="text-lg font-bold">
								{{ itm?.account_name ?? 'N/A' }}
							</p>
						</div>
						<div class="flex items-center justify-between">
							<p class="text-gray-500 text-sm">
								Service Provider
							</p>
							<p class="text-sm font-bold">
								{{ itm.provider ?? 'N/A' }}
							</p>
						</div>
					</div>
					<p class="leading-relaxed tracking-wide text-gray-400">
						Transfer money to the bank account above to fund your wallet, your wallet will be credited automatically once payment is verified.
					</p>
					<div class="w-full flex justify-center items-center">
						<button class="text-white bg-black rounded-md py-2.5 w-1/2" @click="useCompaniesModal().openActivateWallet()">
							Add Nuban
						</button>
					</div>
				</div>
				<div v-else class="h-60 relative z-0">
					<div class="card space-y-4 p-6 backdrop-blur-sm bg-white/30">
						<div class="space-y-6">
							<div class="flex items-center justify-between">
								<p class="text-gray-500">
									Bank Name
								</p>
								<p class="text-xl font-bold">
									N/A
								</p>
							</div>
							<div class="flex items-center justify-between">
								<p class="text-gray-500">
									Account Number
								</p>
								<p class="text-xl font-bold flex items-center gap-x-3">
									<span class="cursor-pointer">N/A</span> <img src="@/assets/icons/source/copy.svg" alt="">
								</p>
							</div>
							<div class="flex items-center justify-between">
								<p class="text-gray-500">
									Account Name
								</p>
								<p class="text-lg font-bold">
									N/A
								</p>
							</div>
							<div class="flex items-center justify-between">
								<p class="text-gray-500">
									Service Provider
								</p>
								<p class="text-sm font-bold">
									N/A
								</p>
							</div>
						</div>
					</div>
					<div class="inset-0 bg-gray/50 absolute backdrop-blur-sm bg-white/30" />
					<div class="w-full flex justify-center items-center blur-none absolute top-20 rounded-md z-50">
						<button class="text-white bg-black rounded-md py-2.5 w-1/2" @click="useCompaniesModal().openActivateWallet()">
							Activate wallet
						</button>
					</div>
				</div>
				<div class="card space-y-6">
					<h1 class="font-bold text-xl">
						Overdraw settings
					</h1>
					<div class="flex items-center gap-x-2">
						<input id="overdraft" v-model="computedOverdraft.supports_over_draw" :disabled="!isUpdatingOverdraft" type="checkbox">
						<label for="overdraft" class="pt-2">Support overdraft</label>
					</div>
					<div class="space-y-3">
						<p class="text-gray-800 font-medium">
							Maximum overdraft
						</p>
						<input v-model="computedOverdraft.max_over_draw_value" type="text" :readonly="!isUpdatingOverdraft" class="py-2.5 text-2xl font-bold w-full border outline-none rounded-md px-6">
					</div>
					<div v-if="!isUpdatingOverdraft">
						<button class="bg-black text-white px-3 py-2 rounded-md" @click="handleUpdate">
							Update
						</button>
					</div>
					<div v-else class="flex items-center space-x-3">
						<button class="w-full bg-white rounded-md py-3 text-gray-900 text-sm border font-semibold border-gray-950" @click="isUpdatingOverdraft = false">
							Cancel
						</button>
						<button class="auth-form-btn font-[700] w-full py-3 text-white bg-shuttlersGreen" @click="handleOverdraftUpdate">
							<span v-if="!updating" class="flex justify-center items-center gap-2.5">Save</span>
							<Spinner v-else />
						</button>
					</div>
				</div>
			</div>
			<Skeleton v-else height="500px" />
		</div>
	</section>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useClipboard } from '@/composables/core/useClipboard'
import { useCorporateWalletHistory, useCorporateOverdreftUpdate } from '@/composables/modules/corporates/wallet'
import { useCorporateWalletDetails } from '@/composables/modules/corporates/id'
import { useCompaniesModal } from '@/composables/core/modals'
import { convertToCurrency } from '@/composables/utils/formatter'
const { getCorporateWalletHistory, coprorateWalletHistory, onFilterUpdate, next, prev, moveTo, page, total, loadingWalletHistory, filterData } = useCorporateWalletHistory()
const { corporateWalletDetails, loading: loadingCorporateWallet, getCorporateWalletObject } = useCorporateWalletDetails()
const { updateCorporateWalletOverdraft, updating, populateOverdraftForm } = useCorporateOverdreftUpdate()
const { copyToClipboard } = useClipboard()
definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const handleSelectedCorporates = (val:any) => {
	filterData['filters[user_ids]'].value = val.id
}
const hideBalance = ref(true)
const eyeToggle = computed(() => {
	return hideBalance.value ? '@/assets/icons/source/eye.svg' : '@/assets/icons/source/eye-close.svg'
})
const isOverDrawSupported = computed(() => {
	return corporateWalletDetails?.value?.wallet?.supports_over_draw === 1
})
const maximumOverDraftAmount = computed(() => {
	return convertToCurrency(corporateWalletDetails?.value?.wallet?.max_over_draw_value)
})
const isUpdatingOverdraft = ref(false)
getCorporateWalletHistory()
getCorporateWalletObject()
const handleUpdate = () => {
	isUpdatingOverdraft.value = !isUpdatingOverdraft.value
}

const computedOverdraft = computed(() => {
	return {
	max_over_draw_value: convertToCurrency(corporateWalletDetails?.value?.wallet?.max_over_draw_value) as string,
	supports_over_draw: isOverDrawSupported.value || false
}
})
const handleOverdraftUpdate = async () => {
  const numericValue = parseFloat(computedOverdraft?.value?.max_over_draw_value.replace(/₦|,/g, ''))
  const payload = {
	max_over_draw_value: numericValue,
	supports_over_draw: computedOverdraft.value.supports_over_draw
  }
  populateOverdraftForm(payload)
  await updateCorporateWalletOverdraft()
  isUpdatingOverdraft.value = false
}

const tableFields = ref([
    {
        text: 'TRANSACTION',
        value: 'description'
    },
    {
        text: 'TYPE',
        value: 'direction'
    },
    {
        text: 'AMOUNT',
        value: 'amount_formatted'
    },
    {
        text: 'BALANCE BEFORE',
        value: 'ledger_balance_before_formatted'
    },
    {
        text: 'STATUS',
        value: 'status'
    }
])
</script>
