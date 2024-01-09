<template>
	<Modal
		modal="$atts.modal"
		title="Duplicate Routes"
		:no-close-btn="true"
	>
		<div class="space-y-6">
			<div class="field relative">
				<label for="routeCode" class="text-[#6E717C] font-[500] leading-[20px]">New route code</label>
				<input id="routeCode" v-model="routeCreationForm.new_route_code" type="text" class="input-field" required>
			</div>
			<div class="flex items-center gap-x-2">
				<p><label for="copy_itiberaries" class="text-[#6E717C] font-[500] leading-[20px]">Copy Itineraries</label></p>
				<p><input id="copy_itiberaries" v-model="routeCreationForm.copy_itineraries" type="checkbox" class="" name="copy_itiberaries"></p>
			</div>
		</div>
		<div class="flex justify-between items-center gap-x-6 mt-6">
			<div class="w-full">
				<button class="text-white bg-gray-500 w-full text-sm rounded-md py-2.5" @click="useRouteModal().closeRouteDuplicationModal()">
					Close
				</button>
			</div>
			<div class="w-full">
				<button :disabled="!isFormEmpty" :class="[!isFormEmpty ? 'opacity-25 cursor-not-allowed' : null]" class="font-[700] w-full py-2.5 text-white flex justify-center items-center rounded-md bg-[#000005]" @click="handleRouteDuplication">
					<span v-if="!loading" class="flex justify-center text-sm items-center gap-2.5">Duplicate Route</span>
					<Spinner v-else />
				</button>
			</div>
		</div>
	</Modal>
</template>

<script setup lang="ts">
import { useRouteIdDetails } from '@/composables/modules/routes/id'
import { useDuplicateRoute } from '@/composables/modules/routes/updateRoute/duplicate'
import { useRouteModal } from '@/composables/core/modals'
const { selectedRoute } = useRouteIdDetails()
const { prePopulateRouteDuplicationForm, duplicateRoute, loading } = useDuplicateRoute()
const isFormEmpty = computed(() => {
	return !!(routeCreationForm.new_route_code)
})
const routeCreationForm = reactive({
    new_route_code: '',
	route_id: selectedRoute.value.id,
    copy_itineraries: ''
})
const handleRouteDuplication = () => {
	prePopulateRouteDuplicationForm(routeCreationForm)
	duplicateRoute()
}
</script>

<style>
</style>
