<template>
	<!-- <main class="">
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
				<span class="text-gray-700">{{ paymentOptionsList }}</span>
				<span class="text-rose-500">{{ generalPaymentOptionsList }}</span>
				<div>
					<button v-if="!isEditingPaymentOptionsLoading" class="text-white bg-black py-2 px-6 rounded-md text-xs" @click="isEditingPaymentOptions ? savePaymentOptions() : isEditingPaymentOptions = true">
						{{ isEditingPaymentOptions ? 'Save' : 'Edit' }}
					</button>
					<div v-else class="spinner-border mr-[20px] !w-3 !h-3" />
				</div>
			</div>
			<div v-if="!loadingPaymentOptions" class="flex justify-between items-center flex-wrap w-10/12 mt-10">
				<div v-for="(itm, index) in paymentOptionsList" :key="index" class="flex items-center gap-x-2">
					<input v-model="selectedPaymentOptions" type="checkbox" :disabled="!isEditingPaymentOptions || isEditingPaymentOptionsLoading" :value="itm.id" @change="handleUpdatedSelectedCheckBox(option)">
					<label class="pt-2 font-light text-gray-900">{{ itm.title }}</label>
				</div>
			</div>
			<div v-else>
				Loading...
			</div>
		</section>
	</main> -->
	<main>
		<!-- <ButtonGoBack class="mb-6" /> -->
		<div class="rounded-md bg-white shadow-md">
			<section class="card p-4">
				<header class="flex justify-between w-full">
					<p>Payment Options</p>
					<button v-if="!isEditingPaymentOptionsLoading" :disabled="updatingPaymentOption" type="button" class="bg-black text-xs text-white px-4 py-1 rounded-md" @click="isEditingPaymentOptions ? savePaymentOptions() : isEditingPaymentOptions = true">
						{{ isEditingPaymentOptions ? 'Save' : updatingPaymentOption ? 'saving..' : 'Edit' }}
					</button>
					<div v-else class="spinner-border mr-[20px] !w-3 !h-3" />
				</header>
				<div v-if="!loadingPaymentOptions" class="flex justify-between items-center flex-wrap w-10/12 mt-10">
					<!-- <label v-for="option in mappedPaymentOptions" :key="option.id" :for="option.id" class="flex items-center text-sm font-light mt-1.5">
					<input :id="option.id" v-model="option.checked" :checked="option.checked" type="checkbox" :disabled="!isEditingPaymentOptions || isEditingPaymentOptionsLoading" @change="handleUpdatedSelectedCheckBox(option)">
					{{ option.title }}
				</label> -->
					<label v-for="option in mappedPaymentOptions" :key="option.id" :for="option.id" class="flex items-center text-sm font-light mt-1.5">
						<input :id="option.id" v-model="option.checked" :checked="newlySelectedPaymentOptions.includes(option.id)" type="checkbox" :disabled="!isEditingPaymentOptions || isEditingPaymentOptionsLoading" @change="handleUpdatedSelectedCheckBox(option)">
						{{ option.title }}
					</label>
				</div>
				<Skeleton v-else height="100px" class="mt-4" />
			</section>
		</div>
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
paymentOptionsPayload.payment_options_ids.value = newlySelectedPaymentOptions.value
updatePaymentOption().then(() => {
         isEditingPaymentOptionsLoading.value = false
         isEditingPaymentOptions.value = false
     })
}

const handleUpdatedSelectedCheckBox = (option) => {
	if (option.checked) {
        newlySelectedPaymentOptions.value.push(option.id)
		if (!newlySelectedPaymentOptions.value.includes(option.id)) {
			newlySelectedPaymentOptions.value.push(option.id)
        }
	} else {
        const index = newlySelectedPaymentOptions.value.indexOf(option.id)
        if (index > -1) {
			newlySelectedPaymentOptions.value.splice(index, 1)
        }
      }
}

const mappedPaymentOptions = computed(() => {
  const selectedIds = new Set(generalPaymentOptionsList.value.map((option) => option?.payment_options_id))
  return paymentOptionsList.value.map((itm) => {
    const isChecked = selectedIds.has(itm.id)
    return {
      ...itm,
      checked: isChecked
    }
  })
})
const newlySelectedPaymentOptions = ref([]) as any

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const initializeCheckedItems = () => {
	newlySelectedPaymentOptions.value = mappedPaymentOptions.value
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.id)
    }

	onMounted(() => {
	initializeCheckedItems()
})
</script>
