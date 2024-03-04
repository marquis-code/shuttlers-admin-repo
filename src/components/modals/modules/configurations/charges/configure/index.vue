<template>
	<Modal
		modal="$atts.modal"
		:title="!isEditConfigureCharge ? 'Configure new charge' : 'Edit configuration'"
	>
		<form class="flex flex-col gap-[16px] w-full" @submit.prevent="isEditConfigureCharge ? updateConfigureCharge() : configureCharge()">
			<p class="text-sm text-center text-[#2C8EED]">
				You can only create Percent-type charges. Flat fee charges will be available soon
			</p>
			<div class="flex flex-col gap-2">
				<div class="flex items-center gap-[16px] justify-between">
					<label class="text-xs text-[#6E717C] font-medium">Select charge type</label>
					<button class="shrink-0 border-none outline-none flex items-center gap-2 font-medium justify-center bg-transparent text-[#0DAC5C]"
						type="button" @click="useChargeModal().openCreateChargeTypes()"
					>
						<!-- <img src="@/assets/img/icons/plus_black.svg" alt=""> -->
						Add new charge
					</button>
				</div>
				<select v-model="chargeTypeId" required class="input-field disabled:cursor-not-allowed" :disabled="isEditConfigureCharge">
					<option v-for="n in chargeList" :key="n.id" :value="n.id">
						{{ n.short_name }} - ({{ n.name }})
					</option>
				</select>
			</div>
			<div class="flex flex-col gap-2">
				<label class="text-xs text-[#6E717C] font-medium">Description</label>
				<textarea v-model.trim="desc" required placeholder="Write a short description about this configuration" class="input-field max-h-[100px]" cols="30" rows="10" />
			</div>
			<div class="flex flex-col gap-2">
				<label class="text-xs text-[#6E717C] font-medium">Charge fee</label>
				<div class="flex rounded border items-center overflow-hidden">
					<input v-model.trim="chargeValue" type="number" step="0.01" required placeholder="" class="text-sm w-[60%] p-[16px] border-none outline-none">
					<select v-model="chargeType" class="w-[40%] p-[16px] bg-[#E0E6ED] outline-none text-sm border-none border-left">
						<option class="p-2" value="percentage">
							Percent(%)
						</option>
						<option disabled class="p-2" value="flat">
							Flat amount(₦)
						</option>
					</select>
				</div>
			</div>

			<div class="flex flex-col gap-2">
				<label class="text-xs text-[#6E717C] font-medium">Select country</label>
				<select v-model="chargeEntityId" required class="input-field">
					<option v-for="n in allCountries" :key="n.id" :value="n.id">
						{{ n.name }}
					</option>
				</select>
			</div>

			<div class="flex flex-col gap-2">
				<label class="text-xs text-[#6E717C] font-medium">Select cities</label>
				<VueMultiselect v-model="cityIds" :placeholder="allCity ? '' : 'Search...'" :searchable="allCity ? false : true"
					label="name" track-by="id" :options="allCityNames" :multiple="true" :taggable="true"
				>
					<template #beforeList>
						<button type="button" class="bg-transparent w-full p-3 border-none border-bottom outline-none hover:!bg-[rgb(65,184,131)] hover:text-white text-left font-medium"
							@click="selectAllCities"
						>
							Select all cities
						</button>
					</template>
					<template v-if="allCity" #selection>
						<p class="!bg-[rgb(65,184,131)] w-fit text-white text-sm font-medium px-2 py-1 rounded">
							All city selected
						</p>
					</template>
				</VueMultiselect>
			</div>

			<ToggleButton v-model="isCompulsory" name="is-compulsory" label="Users must pay this fee when making a booking" :disabled="true" />

			<button type="submit" :disabled="loading || !enableButton" class="text-sm bg-black p-[16px] text-white text-center w-full mt-2 rounded disabled:cursor-not-allowed disabled:bg-[#E0E6ED]">
				{{ loading ? 'processing...' : `${isEditConfigureCharge ? 'Update configuration' : 'Configure new charge'}` }}
			</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">
// import Multiselect from 'vue-multiselect'
import VueMultiselect from 'vue-multiselect'

import { useCreateConfigureCharge } from '@/composables/modules/configure/charges/configure/create'
import { useCityAndCountry } from '@/composables/modules/configure/charges/utils'
import { useChargeModal } from '@/composables/core/modals'
import { useFetchChargeTypes } from '@/composables/modules/configure/charges/types/fetch'

const { loading, isEditConfigureCharge, chargeEntityId, chargeType, chargeTypeId, chargeValue, desc, cityIds, allCity, configureCharge, enableButton, closeConfigureChargeModal, isCompulsory, updateConfigureCharge } = useCreateConfigureCharge()
const { allCityNames, allCountries } = useCityAndCountry()
const { allUnconfiguredTypes, fetchAllUnconfiguredChargeTypes, fetchAllChargeTypesWithoutPagination, allChargeTypes } = useFetchChargeTypes()

const selectAllCities = () => {
	cityIds.value = []
	allCity.value = true
}

const chargeList = computed(() => {
	return isEditConfigureCharge.value ? allChargeTypes.value : allUnconfiguredTypes.value
})

isEditConfigureCharge.value ? fetchAllChargeTypesWithoutPagination() : fetchAllUnconfiguredChargeTypes()
onBeforeUnmount(() => closeConfigureChargeModal())
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style scoped>
label{
	margin: 0;
}
</style>
