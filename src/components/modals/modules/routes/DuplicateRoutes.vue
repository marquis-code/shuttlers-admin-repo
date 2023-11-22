<template>
	<Modal
		modal="$atts.modal"
		title="Duplicate Routes"
		:no-close-btn="true"
		class="text-center"
	>
		<div class="flex flex-col items-center justify-center space-y-6">
			<div class="field relative">
				<label for="routeCode" class="text-[12px] text-[#6E717C] font-[500] leading-[20px]">New route code</label>
				<input id="routeCode" v-model="routeCreationForm.route_code" placeholder="₦" autocomplete="true" type="text" class="input-field" required>
			</div>
			<div class="field relative flex items-center">
				<label for="copy_itiberaries" class="text-[12px] text-[#6E717C] font-[500] leading-[20px]">Copy Itineraries</label>
				<input v-model="routeCreationForm.copy_itinerary" type="checkbox" class="" name="copy_itiberaries" id="copy_itiberaries" />
			</div>
		</div>
		<div class="flex justify-between items-center gap-x-6 mt-6">
			<div class="w-full"><button @click="useTripsModal().closeDeductEarning()" class="text-white bg-gray-500 w-full rounded-md py-2.5">Close</button></div>
			<div class="w-full">
				<button :disabled="!isFormEmpty" :class="[!isFormEmpty ? 'opacity-25 cursor-not-allowed' : null]" class="font-[700] w-full py-2.5 text-white flex justify-center items-center rounded-md bg-[#000005]" @click="handleDeduction">
					<span v-if="!loading" class="flex justify-center items-center gap-2.5">Duplicate Route</span>
					<Spinner v-else />
				</button>
			</div>
		</div>
	</Modal>
</template>

<script setup lang="ts">
const isFormEmpty = computed(() => {
	return !!(routeCreationForm.route_code)
})

const routeCreationForm = reactive({
    route_code: '',
    copy_itinerary: ''
})
</script>

<style>

</style>
