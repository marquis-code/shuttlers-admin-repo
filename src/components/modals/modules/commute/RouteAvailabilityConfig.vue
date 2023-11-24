<template>
	<Modal
		modal="$atts.modal"
		title="Route Availability Configuration"
		:no-close-btn="false"
		class="text-center"
	>
		<form class="flex flex-col gap-6" @submit.prevent="configureRouteAvailability">
			<div>
				<label>Route Visibility</label>
				<div class="flex items-center gap-x-4">
					<div class="flex items-center gap-x-2">
						<input id="public" v-model="selectedRouteVisibility" value="public" name="public" type="radio">
						<label for="public" class="mt-2">Public</label>
					</div>
					<div class="flex items-center gap-x-2">
						<input id="private" v-model="selectedRouteVisibility" value="private" name="private" type="radio">
						<label for="private" class="mt-2">Private</label>
					</div>
				</div>
			</div>
			<div v-if="selectedRouteVisibility === 'private'">
				<label>select company</label>
				<select id="countries" v-model="corporateId" class="outline-none bg-gray-50 w-full border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  placeholder-gray-400 text-gray-900">
					<option v-for="(item, index) in corporatesList" :key="index" :value="item.id">
						{{ item.corporate_name }}
					</option>
				</select>
			</div>
			<div>
				<label>Route Type</label>
				<div class="flex items-center gap-x-4">
					<div class="flex items-center gap-x-2">
						<input id="shared" v-model="selectedRouteType.shared" value="shared" name="shared" type="checkbox">
						<label for="shared" class="mt-2">Shared</label>
					</div>
					<div class="flex items-center gap-x-2">
						<input id="exclusive" v-model="selectedRouteType.exclusive" value="exclusive" name="exclusive" type="checkbox">
						<label for="exclusive" class="mt-2">Exclusive</label>
					</div>
				</div>
			</div>
			<div>
				<label>Route selection</label>
				<div class="flex items-center gap-x-4">
					<div class="flex items-center gap-x-2">
						<input id="all" v-model="selectedRouteVisibility" value="all" name="all" type="radio">
						<label for="all" class="mt-2">All</label>
					</div>
					<div class="flex items-center gap-x-2">
						<input id="selected" v-model="selectedRouteVisibility" value="selectd" name="selected" type="radio">
						<label for="selected" class="mt-2">Selected</label>
					</div>
				</div>
			</div>
			<div v-if="selectedRoute === 'selected'" class="field relative">
				<label for="email">Select Route</label>
				<RuoteSelector />
			</div>
			<div class="w-full">
				<label>Unavailability period</label>
				<InputDateInput id="startDate" v-model="form.unavailablePeriod" class="font-light" placeholder="Filter by date" />
			</div>
			<div class="w-full">
				<label>Reason</label>
				<textarea class="w-full resize-none border outline-none rounded-md" rows="3" cols="3" />
			</div>
			<div class="flex w-full">
				<button class="flex justify-center items-center rounded-md gap-2.5 w-full py-3 bg-black text-white">
					Proceed
				</button>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useGetCorporateList } from '@/composables/modules/corporates/fetch'
const { getCorporatesList, loading: loadingCorporateList, corporatesList, page_size: corporate_page_size } = useGetCorporateList()
const selectedRouteVisibility = ref('public')
const selectedRoute = ref('all')
const corporateId = ref('')
const selectedRouteType = {
	exclusive: '',
	shared: ''
}
const form = reactive({
	unavailablePeriod: []
})

const configureRouteAvailability = () => {

}

// const routeSelected = (val: Record<string, any>) => {
// 	route_id.value = val.id
// }

</script>

<style>

</style>
