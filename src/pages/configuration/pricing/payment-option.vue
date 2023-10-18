<template>
	<main class="">
		<section class="card">
			<div class="flex justify-between items-center">
				<div>
					<h1 class="font-medium">
						Payment Options
					</h1>
					<p class="text-xs ">
						Select the payment option you want to be visible to all Shuttler users (Optional)
					</p>
				</div>
				<div>
					<button v-if="!isEditingPaymentOptionsLoading" class="text-white bg-black py-2 px-6 rounded-md text-xs" @click="isEditingPaymentOptions ? savePaymentOptions() : isEditingPaymentOptions = true">
						{{ isEditingPaymentOptions ? 'Save' : 'Edit' }}
					</button>
					<div v-else class="spinner-border mr-[20px] !w-3 !h-3" />
				</div>
			</div>
			<div v-if="!loadingPaymentOptions" class="flex justify-between items-center flex-wrap w-10/12 mt-10">
				<div v-for="(itm, index) in paymentOptionsList" :key="index" class="flex items-center gap-x-2">
					<input v-model="selectedPaymentOptions" type="checkbox" :disabled="!isEditingPaymentOptions || isEditingPaymentOptionsLoading" :value="itm.id">
					<label class="pt-2 font-light text-gray-900">{{ itm.title }}</label>
				</div>
			</div>
			<div v-else>
				Loading...
			</div>
		</section>
	</main>
</template>

<script setup lang="ts">
import { usePaymentOptionsList, useGeneralPaymentOptionsList, useUpdatePaymentOptions } from '@/composables/modules/configure/fetch'
const { getPaymentOptionsList, loadingPaymentOptions, paymentOptionsList } = usePaymentOptionsList()
const { getGeneralPaymentOptionsList, loadingGeneralPaymentOptions, generalPaymentOptionsList } = useGeneralPaymentOptionsList()
const { paymentOptionsPayload, updatePaymentOption, updatingPaymentOption } = useUpdatePaymentOptions()
getPaymentOptionsList()
getGeneralPaymentOptionsList()

const isEditingPaymentOptionsLoading = ref(false)
const isEditingPaymentOptions = ref(false)
const selectedPaymentOptions = ref([])
selectedPaymentOptions.value = generalPaymentOptionsList.value.map((option) => option.payment_options_id) as any

const savePaymentOptions = () => {
 isEditingPaymentOptionsLoading.value = true
//  paymentOptionsPayload.payment_options_ids.value = generalPaymentOptionsList.value.map((itm) => itm.payment_options_id)
paymentOptionsPayload.payment_options_ids.value = selectedPaymentOptions.value
updatePaymentOption().then(() => {
         isEditingPaymentOptionsLoading.value = false
         isEditingPaymentOptions.value = false
     })
}

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
</script>
