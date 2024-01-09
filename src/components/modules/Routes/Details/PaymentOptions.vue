<template>
	<div class="rounded-md bg-white shadow-md">
		<section class="card p-4">
			<header class="flex justify-between w-full">
				<p>Payment Options</p>
				<button v-if="!isEditingPaymentOptionsLoading" :disabled="processingPaymentOptionsUpdate" type="button" class="bg-black text-xs text-white px-4 py-1 rounded-md" @click="isEditingPaymentOptions ? savePaymentOptions() : isEditingPaymentOptions = true">
					{{ isEditingPaymentOptions ? 'Save' : processingPaymentOptionsUpdate ? 'saving..' : 'Edit' }}
				</button>
				<div v-else class="spinner-border mr-[20px] !w-3 !h-3" />
			</header>
			<div v-if="!loadingPaymentOptions" class="flex mt-3 gap-5 flex-wrap">
				<label v-for="option in mappedPaymentOptions" :key="option.id" :for="option.id" class="flex items-center text-sm font-light mt-1.5">
					<input :id="option.id" v-model="option.checked" :checked="option.checked" type="checkbox" :disabled="!isEditingPaymentOptions || isEditingPaymentOptionsLoading" @change="handleUpdatedSelectedCheckBox(option)">
					{{ option.title }}
				</label>
			</div>
			<Skeleton v-else height="100px" class="mt-4" />
		</section>
	</div>
</template>

<script setup lang=ts>
import { useRoutePaymentOptions } from '@/composables/modules/routes/fetch'
import { useRouteIdDetails, useRoutePaymentOptionsById, useTripStartTimeById, useRoutePassengersById, useRouteDriversById } from '@/composables/modules/routes/id'
import { useUpdateRoutePaymentOptions } from '@/composables/modules/routes/updatePaymentOptions'
const { populatePayload, updatePaymentOptions, loading: processingPaymentOptionsUpdate } = useUpdateRoutePaymentOptions()
const { getPaymentOptions, loadingPaymentOptions, paymentOptionsList } = useRoutePaymentOptions()
const { routePaymentOptionsList, loadingSelectedRoutePaymentOptions, getRoutePaymentOptionsById } = useRoutePaymentOptionsById()
const isEditingPaymentOptions = ref(false)
const isEditingPaymentOptionsLoading = ref(false)
const mappedPaymentOptions = computed(() => {
  const selectedIds = new Set(routePaymentOptionsList.value.map((option) => option?.payment_options_id))
  return paymentOptionsList.value.map((itm) => {
    const isChecked = selectedIds.has(itm.id)
    return {
      ...itm,
      checked: isChecked
    }
  })
})
const newlySelectedPaymentOptions = ref([])
const handleUpdatedSelectedCheckBox = (option) => {
	if (option.checked) {
        newlySelectedPaymentOptions.value.push(option.id)
	} else {
        const index = newlySelectedPaymentOptions.value.indexOf(option.id)
        if (index > -1) {
			newlySelectedPaymentOptions.value.splice(index, 1)
        }
      }
}
const savePaymentOptions = () => {
	isEditingPaymentOptions.value = false
	const payload = {
    payment_options_ids: newlySelectedPaymentOptions.value,
    route_id: useRoute().params.id
}
	populatePayload(payload)
	updatePaymentOptions()
}
getPaymentOptions()
getRoutePaymentOptionsById()
onMounted(() => {
	initializeCheckedItems()
})

const initializeCheckedItems = () => {
	newlySelectedPaymentOptions.value = mappedPaymentOptions.value
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.id)
    }
</script>
