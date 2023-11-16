<template>
	<Modal modal="$atts.modal" :title="`${Object.keys(selectedVehicleCategory).length ? 'Edit' : 'Configure'} Vehicle Category`" :no-close-btn="false" class="text-center">
		<form class="flex flex-col gap-6 mt-4" @submit.prevent="handleCreateVehicleCategory">
			<div>
				<div v-if="configureVehicleCategoryForm.image.value">
					<label for="image" class="w-full tracking-wide  cursor-pointer">
						<p class="flex justify-center items-center gap-x-2 text-shuttlersGreen"><img :src="configureVehicleCategoryForm.image.value" alt="previewAmenity" class="h-16 w-16 rounded-full border border-gray-600 object-cover"> Edit Image</p>
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
			<div class="field relative">
				<label for="categoryName">Category Name</label>
				<input id="categoryName" v-model="configureVehicleCategoryForm.name.value" type="text" class="input-field"
					required>
			</div>
			<div class="field relative">
				<label for="address">Description</label>
				<input id="address" v-model="configureVehicleCategoryForm.description.value" type="text" class="input-field"
					required>
			</div>
			<div class="flex justify-between items-center flex-col gap-y-3">
				<div class="w-full">
					<label>Seat Utilization </label>
					<input v-model="configureVehicleCategoryForm.break_even_utilization.value" type="number"
						class="py-2.5 border outline-none rounded-md px-3 w-full">
				</div>
				<div class="w-full">
					<label>Pricing margin</label>
					<input v-model="configureVehicleCategoryForm.pricing_margin.value" type="number"
						class="py-2.5 border outline-none rounded-md px-3 w-full">
				</div>
				<div class="w-full">
					<label>Pricing margin unit</label>
					<select v-model="configureVehicleCategoryForm.pricing_margin_unit.value"
						class="py-2.5 border outline-none rounded-md px-3 w-full">
						<option value="percent">
							Percent
						</option>
						<option value="flat_amount">
							Flat Amount
						</option>
					</select>
				</div>
			</div>
			<div v-if="rows">
				<div v-for="(itm, idx) in rows" :key="idx" class="flex justify-between gap-x-3 items-center">
					<div class="py-3 rounded-md px-3 w-6/12">
						<label class="text-xs">City</label>
						<select v-model="itm.city"
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
				<button type="button" class="rounded-lg px-3 py-2.5 text-sm border border-gray-600 text-gray-500"
					@click="addRow">
					+ Add City
				</button>
			</div>
			<div class="flex justify-between items-center gap-x-10">
				<button type="submit" class="btn btn-primary py-3 text-xs w-full disabled:cursor-not-allowed disabled:opacity-25" :disabled="!isButtonEnabled">
					<span v-if="!createLoading" class="text-sm">Save</span>
					<Spinner v-else />
				</button>
				<button type="submit" class="bg-gray-600 py-3 rounded-md text-xs text-white w-full" @click="useVehicleConfigurationModal().closeConfigureVehicleCategory()">
					Cancel
				</button>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useVehicleConfigurationModal } from '@/composables/core/modals'
import { useCityAndCountry } from '@/composables/modules/configure/charges/utils'
import { useCreateVehicle } from '@/composables/modules/configure/vehicles/create'
const { configureVehicleCategoryForm, selectedVehicleCategory, editVehicleCategory, createVehicleCategory } = useCreateVehicle()
const { fetchAllCityNames, allCityNames } = useCityAndCountry()
fetchAllCityNames()
const form = reactive({
   image: '' as any
})
const createLoading = ref(false)
const route = useRoute()

const isButtonEnabled = computed(() => {
	return !!(configureVehicleCategoryForm.name.value && configureVehicleCategoryForm.description.value && configureVehicleCategoryForm.break_even_utilization.value && configureVehicleCategoryForm.break_even_utilization.value && configureVehicleCategoryForm.pricing_margin.value && configureVehicleCategoryForm.pricing_margin_unit.value)
})

const rows = ref([{
	city: '',
	cost_of_supply: ''
}])
const handleCreateVehicleCategory = () => {
	if (Object.keys(selectedVehicleCategory).length) {
	editVehicleCategory(selectedVehicleCategory.value.id)
	} else {
	createVehicleCategory()
	}
}

const addRow = () => {
	rows.value.push({ city: '', cost_of_supply: '' })
}

const deleteRow = (index) => {
	rows.value.splice(index, 1)
}

const previewUrl = ref('')

const onFileSelected = (e) => {
	const file = e.target.files[0]
	if (file) {
		const fileReader = new FileReader()

		fileReader.onload = (e) => {
			form.image = e?.target?.result
      }
      previewUrl.value = URL.createObjectURL(e.target.files[0])
      fileReader.readAsDataURL(file)
	 }
    }
</script>

<style></style>
