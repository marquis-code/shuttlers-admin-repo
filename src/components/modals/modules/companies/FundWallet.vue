<template>
	<Modal
		modal="$atts.modal"
		title="Fund wallet"
	>
		<form class="flex flex-col gap-6 gap-y-10" @submit.prevent="proceedToFundWallet">
			<div v-if="selected === 'default'" class="space-y-4">
				<p class="text-sm text-gray-700">
					Fund your wallet by making use of any of these payment options.
				</p>
				<div class="space-y-6">
					<div v-for="(itm, idx) in fundingOptions" :key="idx" class="cursor-pointer gap-x-4 flex pl-4 items-center border-[0.5px] py-3 rounded-md bg-gray-50" @click="handleSelectedMethod(itm)">
						<img v-if="itm.val === 'transfer' || itm.val === 'bank'" class="h-10 w-10 p-1 rounded-full border border-gray-600" src="@/assets/icons/source/bank.svg" alt="bank">
						<img v-if="itm.val === 'card'" class="h-10 w-10 p-1 rounded-full border border-gray-600" src="@/assets/icons/source/card.svg" alt="card">
						<img v-if="itm.val === 'ussd'" class="h-10 w-10 p-1 rounded-full border border-gray-600" src="@/assets/icons/source/phone.svg" alt="phone">
						<p class="font-bold text-gray-900">
							{{ itm.title }}
						</p>
					</div>
				</div>
			</div>
			<div v-if="selected === 'transfer'" class="space-y-6">
				<div v-if="corporateWalletDetails.wallet.length" class="p-6 bg-gray-50 rounded-md space-y-6">
					<h1 class="text-sm font-medium">
						ACCOUNT DETAILS
					</h1>
					<div class="">
						<p class="text-sm text-gray-500">
							Bank Name
						</p>
						<h1 class="font-bold text-gray-900 text-lg">
							WEMA BANK
						</h1>
					</div>
					<div class="">
						<p class="text-sm text-gray-500">
							Account Number
						</p>
						<h1 class="font-bold text-gray-900 text-lg flex items-center gap-x-2">
							8540972345 <img src="@/assets/icons/source/copy.svg" class="cursor-pointer" alt="copy">
						</h1>
					</div>
					<div class="">
						<p class="text-sm text-gray-500">
							Account Name
						</p>
						<h1 class="font-bold text-gray-900 text-lg flex items-center gap-x-2">
							Shuttlers <img src="@/assets/icons/source/copy.svg" class="cursor-pointer" alt="copy">
						</h1>
					</div>
					<div class="flex items-center gap-x-10">
						<img src="@/assets/icons/source/info.svg" class="h-7 w-7" alt="info">
						<p class="text-sm text-gray-500">
							Your wallet will be automatically funded once payment is received. Funding via bank transfer takes 5 - 10 minutes.
						</p>
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
						<div class="text-white text-center cursor-pointer bg-black rounded-md py-2.5 w-1/2" @click="useCompaniesModal().openActivateWallet()">
							Activate wallet
						</div>
					</div>
				</div>
				<div class="flex justify-between items-center px-3 py-2.5 rounded-md bg-gray-50 border cursor-pointer" @click="selected = 'default'">
					<div class="flex items-center gap-x-2">
						<span class="bg-white p-2 rounded-full flex justify-center items-center"> <img src="@/assets/icons/source/card.svg" class="h-10 w-10 p-1 rounded-full border border-gray-600" alt="card"></span>
						<p class="font-medium">
							Other funding options
						</p>
					</div>
					<div>
						<img src="@/assets/icons/source/greater.svg" alt="more">
					</div>
				</div>
			</div>
			<div v-if="selected === 'bank' || selected === 'card' || selected === 'ussd'" class="space-y-6">
				<div>
					<label>Amount</label>
					<input v-model="form.amount" type="number" class="w-ful input-field pu">
				</div>
				<div>
					<label>Description</label>
					<textarea v-model="form.description" cols="4" rows="4" class="w-ful input-field resize-none" />
				</div>

				<div class="w-full space-y-2">
					<button :class="[!isFormEmpty ? 'cursor-not-allowed opacity-25' : '']" :disabled="!isFormEmpty" class="bg-black text-white w-full flex justify-center items-center rounded-md py-3">
						<span v-if="!loading" class="flex justify-center items-center gap-2.5">
							Make Payment
						</span>
						<Spinner v-else />
					</button>
					<div class="flex justify-center items-center">
						<button class="font-medium text-sm text-gray-900" @click="selected = 'default'">
							Go Back
						</button>
					</div>
				</div>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useCorporateWalletDetails } from '@/composables/modules/corporates/id'
import { useCompaniesModal } from '@/composables/core/modals'
import { useFlutterWave } from '@/composables/modules/corporates/wallet'
const { corporateWalletDetails, loading: loadingCorporateWallet, getCorporateWalletObject } = useCorporateWalletDetails()
const { makePayment, amount, desc, loading } = useFlutterWave()
getCorporateWalletObject()
 const fundingOptions = reactive([
    {
        title: 'Fund With Transfer',
        val: 'transfer'
    },
    {
        title: 'Fund With Bank',
        val: 'bank'
    },
    {
        title: 'Fund With Card',
        val: 'card'
    },
    {
        title: 'Fund With USSD',
        val: 'ussd'
    }
 ])

 const form = reactive({
	amount: '',
	description: ''
 })

 const isFormEmpty = computed(() => {
	return !!(form.amount && form.description)
 })

 const selected = ref('default')

 const proceedToFundWallet = () => {
	makePayment()
	amount.value = form.amount
	desc.value = form.description
 }

 const handleSelectedMethod = (itm) => {
  selected.value = itm.val
 }
</script>
