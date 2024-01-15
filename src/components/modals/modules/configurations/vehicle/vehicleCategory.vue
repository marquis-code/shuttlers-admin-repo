<template>
	<Modal modal="$atts.modal" :title="`${Object.keys(selectedVehicleCategory).length ? 'Edit' : 'Configure'} Vehicle Category`" :no-close-btn="false" class="text-center">
		<form class="flex flex-col gap-y-2  mt-4" @submit.prevent="handleCreateVehicleCategory">
			<div>
				<div v-if="form.image">
					<label for="image" class="w-full tracking-wide  cursor-pointer">
						<p class="flex justify-center items-center gap-x-2 text-shuttlersGreen"><img :src="previewUrl" alt="previewAmenity" class="h-16 w-16 rounded-full border border-gray-600 object-cover"> Edit Image</p>
						<input id="image" class="hidden" type="file" accept="image/*" @click="onFileSelected">
					</label>
				</div>
				<div v-else>
					<div v-if="!previewUrl" class="space-y-3">
						<label for="image" class="w-full tracking-wide  cursor-pointer">
							<p class="flex justify-center items-center gap-x-2 text-shuttlersGreen"><img src="@/assets/images/default-bus.png" class="h-10 w-10 rounded-full shadow-sm" alt="default bus">Attach Image</p>
							<input id="image" class="hidden" type="file" accept="image/*" @click="onFileSelected">
						</label>
					</div>
					<div v-else>
						<img :src="previewUrl" alt="previewAmenity" class="h-16 w-16 rounded-full object-cover">
					</div>
				</div>
			</div>
			<div class="flex justify-between items-center flex-col gap-y-3">
				<div class="w-full">
					<label for="categoryName">Category Name</label>
					<input id="categoryName" v-model="form.name" type="text" class="input-field w-full"
						required>
				</div>
				<div class="w-full">
					<label for="address">Description</label>
					<input id="address" v-model="form.description" type="text" class="input-field w-full"
						required>
				</div>
				<div class="w-full space-y-2">
					<label for="seat_utilization">Seat Utilization </label>
					<input id="seat_utilization" v-model="form.break_even_utilization" type="number"
						class="py-2.5 border outline-none rounded-md px-3 w-full input-field">
					<div class="flex justify-start items-start">
						<span v-if="isBreakEvenUtilizationExceeded" class="tex text-rose-600 text-sm">Value should be between 0.0 to 1.0</span>
					</div>
				</div>
				<div class="w-full">
					<label for="pricing_margin">Pricing margin</label>
					<input id="pricing_margin" v-model="form.pricing_margin" type="number"
						class="py-2.5 border outline-none rounded-md px-3 w-full input-field">
				</div>
				<div class="w-full">
					<label for="pricing_margin_unit">Pricing margin unit</label>
					<select id="pricing_margin_unit" v-model="form.pricing_margin_unit"
						class="py-2.5 border outline-none rounded-md px-3 w-full input-field">
						<option value="percent">
							Percent
						</option>
						<option value="flat">
							Flat Amount
						</option>
					</select>
				</div>
			</div>
			<div v-if="rows">
				<div v-for="(itm, idx) in rows" :key="idx" class="flex justify-between gap-x-3 items-center">
					<div class="py-3 rounded-md px-3 w-6/12">
						<label class="text-xs">City</label>
						<select v-model="itm.city_id"
							class="py-2 border outline-none rounded-md px-3 w-full">
							<option v-for="itm in allCityNames" :key="itm" :value="itm.id">
								{{ itm?.name }}
							</option>
						</select>
					</div>
					<div class="w-6/12">
						<label class="text-xs">Cost of supply</label>
						<input v-model="itm.cost_of_supply" type="number" placeholder="N"
							class="py-2 border outline-none rounded-md px-3 w-full">
					</div>
					<div class="flex justify-center items-center mt-6">
						<img src="@/assets/icons/source/close.svg" alt="close" class="cursor-pointer" @click="deleteRow(idx)">
					</div>
				</div>
			</div>
			<div class="flex justify-start items-start">
				<button type="button" class="rounded-lg px-3 py-2 text-xs border border-gray-600 text-gray-500"
					@click="addRow">
					+ Add City
				</button>
			</div>
			<div class="flex justify-between items-center gap-x-10 mt-3">
				<button type="submit" class="bg-gray-600 py-3 rounded-md text-xs text-white w-full" @click="useVehicleConfigurationModal().closeConfigureVehicleCategory()">
					Cancel
				</button>
				<button type="submit" class="btn btn-primary py-3 text-xs w-full disabled:cursor-not-allowed disabled:opacity-25" :disabled="!isButtonEnabled">
					<span v-if="!createLoading" class="text-sm">Save</span>
					<Spinner v-else />
				</button>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useVehicleConfigurationModal } from '@/composables/core/modals'
import { useCityAndCountry } from '@/composables/modules/configure/charges/utils'
import { useCreateVehicle } from '@/composables/modules/configure/vehicles/create'
const { selectedVehicleCategory, preConfigureVehicleCostOfSuplyForm, editVehicleCategory, createVehicleCategory, preConfigureVehicleCategoryForm, loading: createLoading } = useCreateVehicle()
const { fetchAllCityNames, allCityNames } = useCityAndCountry()
fetchAllCityNames()
const route = useRoute()

const isButtonEnabled = computed(() => {
	return !!(form.name && form.description && form.break_even_utilization && form.break_even_utilization && form.pricing_margin && form.pricing_margin_unit)
})

const handleCreateVehicleCategory = () => {
	if (Object.keys(selectedVehicleCategory.value).length) {
		const vehicleCategoryId = selectedVehicleCategory.value.id
		preConfigureVehicleCategoryForm(form)
	    editVehicleCategory(vehicleCategoryId)
	} else {
	// preConfigureVehicleCostOfSuplyForm(cost_of_supply_form)
	preConfigureVehicleCostOfSuplyForm(rows.value)
	preConfigureVehicleCategoryForm(form)
	createVehicleCategory()
	}
}

const form = reactive({
    name: selectedVehicleCategory.value?.name || '',
    description: selectedVehicleCategory.value?.description || '',
    break_even_utilization: selectedVehicleCategory.value?.break_even_utilization || '0.0' as any,
    pricing_margin_unit: selectedVehicleCategory.value?.pricing_margin_unit || 'percent',
    pricing_margin: selectedVehicleCategory.value?.pricing_margin || 10,
    image: selectedVehicleCategory.value?.image || '' as any
})

const cost_of_supply_form = reactive({
    id: '',
    vehicle_type_id: '',
    cost_of_supply: selectedVehicleCategory.value?.cost_of_supply || '',
    currency: 'NGN'
})

// const addRow = () => {
// 	rows.value.push({ city: '', cost_of_supply: '' })
// 	form.city_id = ''
// }
const rows = ref([] as any)
const addRow = (cityPricingData) => {
if (Object.keys(cityPricingData).length) {
	rows.value.push({
        id: cityPricingData?.id || null,
        vehicle_type_id: cityPricingData?.vehicle_type_id || null,
        city_id: cityPricingData?.city_id || null,
        cost_of_supply: cityPricingData?.cost_of_supply || null,
        currency: cityPricingData?.currency || 'NGN'
      })
}
    }

const deleteRow = (index) => {
	rows.value.splice(index, 1)
}

const previewUrl = ref() as any

const onFileSelected = (e) => {
	const file = e.target.files[0]
	if (file) {
		const fileReader = new FileReader()

		fileReader.onload = (e) => {
			form.image = e?.target?.result
      }
      previewUrl.value = URL.createObjectURL(file)
      fileReader.readAsDataURL(file)
	 }
    }

	const isBreakEvenUtilizationExceeded = computed(() => {
		return form.break_even_utilization >= 0.0 && form.break_even_utilization <= 1.0
	})
</script>

<style></style>
