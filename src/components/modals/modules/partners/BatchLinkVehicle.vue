<template>
	<Modal
		modal="$atts.modal"
		title="Batch Link Vehicle"
	>
		<form class="flex flex-col gap-[16px] w-full" @submit.prevent="initlinkVehicle">
			<div class="flex flex-col gap-1">
				<p class="text-base text-dark font-medium">
					Batch link a vehicle
				</p>
				<p class="text-sm text-grey5">
					Upload vehicles plate number (CSV only)
				</p>
				<a href="/docs/Vehicles_batch_linking_template.csv" download="Vehicles_batch_linking_template" class="text-sm text-green7 font-medium">
					Download CSV Template
				</a>
			</div>

			<div class="field relative">
				<label class="label">Upload document</label>
				<input type="file" class="w-full" @change="onChange">
			</div>

			<div class="bg-dark p-4 flex items-center gap-4 justify-between">
				<p>{{ file?.name }}</p>
				<Icon name="close" class="text-light w-4" />
			</div>

			<button type="submit" :disabled="loading || !enableButton" class="text-sm bg-black p-[16px] text-white text-center w-full mt-2 rounded disabled:cursor-not-allowed disabled:bg-[#E0E6ED]">
				{{ loading ? 'processing...' : 'Proceed' }}
			</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import Papa from 'papaparse/papaparse.js'
import { useLinkVehicle } from '@/composables/modules/partners'

const { loading, vehicles, initlinkVehicle } = useLinkVehicle()
const enableButton = computed(() => {
	return !!(vehicles.value.length)
})

const plate_numbers = ref([]) as Ref<string[]>
const file = ref(null) as Ref<any>

const onChange = (event:any) => {
	file.value = event.target.files[0]
	console.log(file.value)

	if (file.value) {
		Papa.parse(file.value, {
			header: true,
			dynamicTyping: true,
			complete: function(results) {
				const csvDataArray = results.data
				plate_numbers.value = csvDataArray.map((el) => el['Plate Numbers']).filter((val) => { return val !== null })
			}
		})
	}
}

onBeforeUnmount(() => vehicles.value = [])
</script>

<style scoped>
label{
	margin: 0;
}
</style>
